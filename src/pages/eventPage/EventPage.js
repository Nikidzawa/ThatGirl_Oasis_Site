import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import styled from "styled-components";
import Loading from "../../commonComponents/Loading";
import HEART_IMG from "../../img/heart.png"
import RED_HEART_IMG from "../../img/red_heart.png"
import DateFormatter from "../../commonComponents/DateFormatter";
import BUCKET from "../../img/bucket.png"
import FireBase from "../../API/FireBase";
import AcceptDeleteEventModal from "./components/AcceptDeleteEventModal";
import EventsAPI from "../../API/internal/categoryes/events/EventsAPI";

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
`

const MainContainer = styled.div`
    padding: 10px 10px 0 10px;
    color: azure;

`

const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
`

const Description = styled.div`
    padding: 10px 0;
    font-size: 17px;
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const BLock = styled.div`
    margin-top: 25px;
    background: rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 20px;
`

const ButtonsContainer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 20px;
    height: 70px;
    max-width: 1000px;
`

const Button = styled.button`
    background-color: green;
    border-top: 1px black solid;
    color: azure;
    height: 100%;
    font-size: 28px;
    padding: 10px 15px;
    flex: 1;
`

const ModalWindow = styled.div`
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333333;
    color: #fff;
    font-size: 20px;
    padding: 10px 20px;
    border-radius: 10px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
    opacity: ${props => props.visible ? "1" : "0"};
    pointer-events: ${props => props.visible ? "auto" : "none"};;
    transition: opacity 0.5s ease-in-out;
`;

const ImageContainer = styled.div`
    height: 100%;
    width: 80px;
    background-color: #333;
    border-top: 1px black solid;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Image = styled.img`
    width: 45px;
`

const NameContainer = styled.div`
    padding: 20px;
    margin-bottom: 10px;
    background-color: #333333;
`

const Types = styled.div`
    padding-top: 10px;
    font-size: 18px;
    display: flex;
    align-items: center;
`

const Circle = styled.div`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: white;
    margin-right: 5px;
`
const Images = styled.div`
    display: flex;
    padding-bottom: 5px;
    grid-gap: 10px;
    align-items: center;
    overflow-x: auto;
    white-space: nowrap;
`

const Img = styled.img`
    width: 70px;
    height: 75px;
`

export default function EventPage ({role}) {
    const { id } = useParams();
    const [event, setEvent] = useState();

    const [loading, setLoading] = useState(true);

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteText, setDeleteText] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const [checkContainsInCart, setCheckContainsInCart] = useState(true);

    const [selectedImage, setSelectedImage] = useState(null);
    const [eventImages, setEventImages] = useState(null);

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
                    getEventImages(eventData.id);
                    checkEventInCart(eventData.id);
                    checkFavourite(eventData.id);
                } else {
                    navigate("/404")
                    console.error("Мероприятие не найдено")
                }
            setLoading(false)
        }

        async function getEventImages (eventId) {
            const response = await EventsAPI.getEventImagesByEventId(eventId);
            if (response.ok) {
                const json = await response.json();
                setEventImages(json);
            } else console.error(response.status)
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


    return (
        loading && checkContainsInCart ? <LoadingWrapper><Loading circleColor={"#333"}/></LoadingWrapper> :
            <div className={"main"} style={{paddingBottom: "80px", fontFamily: "Trebuchet MS"}}>
                <NameContainer>
                    <Title>{event.name}</Title>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <Types><Circle/>{event.eventType.name}</Types>
                        {
                            role && (role === "administrator" || role === "creator") &&
                            <img onClick={() => setModalVisible(true)} style={{cursor: "pointer", padding: "5px 0 0 5px"}} height={"30px"} width={"35px"} src={BUCKET}/>
                        }
                    </div>
                </NameContainer>
                <MainContainer>
                    <div style={{minHeight: "200px", maxWidth: "600px"}}>
                        {
                            selectedImage && <img height={"auto"} width={"100%"} src={selectedImage.href} alt={"Фотография"}/>
                        }
                        <Images>
                            {eventImages && eventImages.length > 0 &&
                                <>
                                    {
                                        <Img onClick={() => setSelectedImage(event.mainImage)} src={event.mainImage.href}/>
                                    }
                                    {
                                        eventImages.map(image => <Img onClick={() => setSelectedImage(image)} src={image.href}/>)
                                    }
                                </>
                            }
                        </Images>
                    </div>
                    <BLock>
                        <Title>Описание</Title>
                        <Description>{event.fullDescription}</Description>
                    </BLock>
                    <BLock>
                        <Title>Место и время</Title>
                        <Description>
                            <div>{event.city.name}, {event.address}</div>
                            <div>{DateFormatter.format(event.date)} в {event.time} по МСК</div>
                            <div>+{event.contactPhone}</div>
                        </Description>
                    </BLock>
                </MainContainer>
                <ButtonsContainer>
                    <ModalWindow visible={isOpen}> Добавлено ✨</ModalWindow>
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
