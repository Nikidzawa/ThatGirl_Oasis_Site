import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Loading from "../../commonComponents/Loading";
import HEART_IMG from "../../img/heart.png"
import RED_HEART_IMG from "../../img/red_heart.png"
import DateFormatter from "../../commonComponents/DateFormatter";
import BUCKET from "../../img/bucket.png"
import EDIT from "../../img/addEvent.png"
import FireBase from "../../API/FireBase";
import AcceptDeleteEventModal from "./components/AcceptDeleteEventModal";
import EventsAPI from "../../API/internal/categoryes/events/EventsAPI";
import LOCATION_IMG from "../../img/location.png"
import ARTICLE_IMG from "../../img/article.png"

const LoadingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    background: rgba(0, 0, 0, 0.6);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`;

const MainContainer = styled.div`
    padding: 0.625rem 0.625rem 0 0.625rem;
    color: azure;
    font-family: Ubuntu, arial, sans-serif;
`

const Title = styled.div`
    font-size: 1.875rem;
    font-weight: bold;
`;

const Description = styled.div`
    padding: 0.625rem 0;
    font-size: 1.0625rem;
    display: flex;
    flex-direction: column;
    gap: 0.3125rem;
`;

const BLock = styled.div`
    margin-top: 1.5625rem;
    background: rgba(0, 0, 0, 0.5);
    padding: 1.25rem;
    border-radius: 1.25rem;
`;

const ButtonsContainer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 1.25rem;
    height: 4.375rem;
    max-width: 62.5rem;
`;

const Button = styled.button`
    background-color: green;
    border-top: 1px black solid;
    color: azure;
    height: 100%;
    font-size: 1.75rem;
    padding: 0.625rem 0.9375rem;
    flex: 1;
    font-family: Ubuntu, arial, sans-serif;
`;

const ModalWindow = styled.div`
    position: fixed;
    bottom: 6.25rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333333;
    color: #fff;
    font-size: 1.25rem;
    padding: 0.625rem 1.25rem;
    border-radius: 0.625rem;
    box-shadow: 0 0.1875rem 0.375rem rgba(0, 0, 0, 0.3);
    opacity: ${props => props.visible ? "1" : "0"};
    pointer-events: ${props => props.visible ? "auto" : "none"};
    transition: opacity 0.5s ease-in-out;
`;

const ImageContainer = styled.div`
    height: 100%;
    width: 5rem;
    background-color: #333;
    border-top: 1px black solid;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Image = styled.img`
    width: 2.8125rem;
`;

const NameContainer = styled.div`
    padding: 1.25rem;
    margin-bottom: 0.625rem;
    background-color: #333333;
    font-family: Ubuntu, arial, sans-serif;
`;

const Types = styled.div`
    padding-top: 0.625rem;
    font-size: 1.125rem;
    display: flex;
    align-items: center;
`;

const Circle = styled.div`
    width: 0.4375rem;
    height: 0.4375rem;
    border-radius: 50%;
    background-color: white;
    margin-right: 0.3125rem;
`;

const Images = styled.div`
    display: flex;
    padding-bottom: 0.3125rem;
    grid-gap: 0.625rem;
    align-items: center;
    overflow-x: auto;
    white-space: nowrap;
`;

const Img = styled.img`
    width: 4.375rem;
    height: 4.6875rem;
    cursor: pointer;
    border-bottom: ${props => props.isSelected ? '2px solid green' : 'none'};
    padding-bottom: 0.3125rem;
`;

const SelectedImage = styled.img`
    max-width: 37.5rem;
    width: 100%;
    min-height: 15.625rem;
    max-height: 37.5rem;
    height: auto;
`;

export default function EventPage ({role}) {
    const { id } = useParams();
    const [event, setEvent] = useState();

    const [loading, setLoading] = useState(true);

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteText, setDeleteText] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const [checkContainsInCart, setCheckContainsInCart] = useState(true);

    const [selectedImage, setSelectedImage] = useState(null);

    const [isOpen,setOpen] = useState(false);
    const [eventContainsInCart, setEventContainsInCart] = useState(false);

    const [favourite, setFavourite] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        getEventData();
        async function getEventData () {
                const response = await EventsAPI.getEventById(id);
                if (response.ok) {
                    const eventData = await response.json();
                    setEvent(eventData);
                    setSelectedImage(eventData.mainImage);
                    checkEventInCart(eventData.id);
                    checkFavourite(eventData.id);
                } else {
                    navigate("/404")
                    console.error("Мероприятие не найдено")
                }
            setLoading(false)
        }

        async function checkEventInCart(eventId) {
            const cartEvents = JSON.parse(localStorage.getItem("cartEvents")) || [];
            setEventContainsInCart(cartEvents.some(event => event.id === eventId));
            setCheckContainsInCart(false);
        }

        async function checkFavourite(eventId) {
            const favoriteEvents = localStorage.getItem("favouriteEvents");
            if (favoriteEvents) {
                setFavourite(favoriteEvents.includes(eventId.toString()));
            } else {
                setFavourite(false);
            }
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 2000)
        return () => clearTimeout(timer);
    }, [isOpen])

    async function addEventToCart () {
        setEventContainsInCart(true);
        setOpen(true);
        const cartData = JSON.parse(localStorage.getItem("cartEvents")) || [];
        let countedEvent = event;
        countedEvent.count = 1;
        cartData.push(countedEvent);
        localStorage.setItem("cartEvents", JSON.stringify(cartData));
    }

    function goToShopCartPage () {
        navigate("/shopping_cart")
    }

    async function handleFavourite () {
        let favouriteEventsData = localStorage.getItem("favouriteEvents");
        const eventId = event.id.toString();
        if (favouriteEventsData) {
            if (favouriteEventsData.includes(eventId)) {
                favouriteEventsData = favouriteEventsData
                    .split(',')
                    .filter(id => id !== eventId)
                    .join(',');
                localStorage.setItem("favouriteEvents", favouriteEventsData);
                setFavourite(false);
            } else {
                favouriteEventsData += ',' + eventId;
                localStorage.setItem("favouriteEvents", favouriteEventsData);
                setFavourite(true);
            }
        } else {
            localStorage.setItem("favouriteEvents", eventId);
            setFavourite(true);
        }
    }

    async function deleteEvent() {
        try {
            setDeleteLoading(true);
            setDeleteText("Удаление мероприятия из базы данных...")
            const response = await EventsAPI.deleteEvent(id);
            if (response.ok) {
                setDeleteText("Мероприятие успешно удалено, удаляем изображения...")
                try {
                    await FireBase.deleteFolder(id);
                    navigate("/events");
                } catch (ex) {
                    console.error(ex);
                    throw new Error(`Ошибка при удалении файлов из облачного хранилища. Попробуйте удалить папку images/${id} вручную`);
                }
            } else {
                throw new Error(`Ошибка при удалении мероприятия. Код ошибки - ${response.status}`);
            }
        } catch (ex) {
            console.error(ex);
        } finally {
            setDeleteLoading(false);
        }
    }

    function handleSelect (image) {
        setSelectedImage(image);

    }


    return (
        loading && checkContainsInCart ? <LoadingWrapper><Loading circleColor={"#333"}/></LoadingWrapper> :
            <div className={"main"} style={{paddingBottom: "80px", fontFamily: "Trebuchet MS"}}>
                <NameContainer>
                    <Title>{event.name}</Title>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <Types><Circle/>{event.eventType.name}</Types>
                        {
                            role && (role === "administrator" || role === "creator") &&
                            <div style={{gap: "10px", display: "flex", alignItems: "center"}}>
                                <img onClick={() => setModalVisible(true)}
                                     style={{cursor: "pointer"}} height={"30px"} width={"35px"}
                                     src={BUCKET} alt={"Удалить"}/>
                                <img style={{cursor: "pointer"}} height={"30px"} width={"35px"}
                                     src={EDIT} onClick={() => navigate(`/events/edit/${id}`)} alt={"Редактировать"}/>
                            </div>
                        }
                    </div>
                </NameContainer>
                <MainContainer>
                    <div>
                        {
                            selectedImage && <SelectedImage src={selectedImage.href} alt={"Фотография"}/>
                        }
                        <Images>
                            {event.eventImages && event.eventImages.length > 0 &&
                                <>
                                    <Img
                                        onClick={() => handleSelect(event.mainImage)}
                                        src={event.mainImage.href}
                                        isSelected={selectedImage === event.mainImage}
                                    />
                                    {event.eventImages.map((image, index) => (
                                        <Img
                                            key={index}
                                            onClick={() => handleSelect(image)}
                                            src={image.href}
                                            isSelected={selectedImage === image}
                                        />
                                    ))}
                                </>
                            }
                        </Images>
                    </div>
                    <BLock>
                        <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                            <img width={"30px"} src={ARTICLE_IMG}/>
                            <Title>Описание</Title>
                        </div>
                        <Description>{event.fullDescription}</Description>
                    </BLock>
                    <BLock style={{marginBottom: "20px"}}>
                        <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                            <img width={"30px"} src={LOCATION_IMG}/>
                            <Title>Место и время</Title>
                        </div>
                        <Description>
                            <div>{event.city.name}, {event.address}</div>
                            <div>{DateFormatter.format(event.date)} в {event.time} по МСК</div>
                            <div>+{event.contactPhone}</div>
                        </Description>
                    </BLock>
                </MainContainer>
                <ButtonsContainer>
                    <ModalWindow visible={isOpen}>Добавлено ✨</ModalWindow>
                    {
                        eventContainsInCart ? <Button onClick={goToShopCartPage}>В корзине</Button> :
                            <Button onClick={addEventToCart}>В корзину {event.cost}₽</Button>
                    }
                    <ImageContainer onClick={handleFavourite}>
                        {
                            favourite ?
                                <Image src={RED_HEART_IMG}/>
                                :
                                <Image src={HEART_IMG}/>
                        }
                    </ImageContainer>
                </ButtonsContainer>
                <AcceptDeleteEventModal visible={modalVisible} setVisible={setModalVisible} deleteEvent={deleteEvent}/>
                {
                    deleteLoading &&
                    <LoadingWrapper>
                        <Loading/>
                        <div>{deleteText}</div>
                    </LoadingWrapper>
                }
            </div>
    )
}
