import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import styled from "styled-components";
import Loading from "../../commonComponents/Loading";
import InternalAPI from "../../API/InternalAPI";
import Exception from "../../commonComponents/Exception";
import ExternalAPI from "../../API/ExternalAPI";
import HEART_IMG from "../../img/heart.png"
import DateFormatter from "../../commonComponents/DateFormatter";

const LoadingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 60px;
    left: 0;
`
const LoadImageWrapper = styled.div`
    display: flex;
    height: 280px;
    align-items: center;
    justify-content: center;
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
export default function EventPage ({user}) {
    const { id } = useParams();
    const [event, setEvent] = useState();
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState(null);
    const [images, setImages] = useState([])
    const navigate = useNavigate();
    const [isOpen,setOpen] = useState(false);
    const [loadingBeforeAddToCart, setLoadingBeforeAddToCart] = useState(false);

    useEffect(() => {
        getEvent();
        async function getEvent () {
            try {
                const response = await InternalAPI.getEvent(id);
                if (response.ok) {
                    const eventData = await response.json();
                    setEvent(eventData);
                    loadImages(eventData);
                } else {
                    throw new Exception("Мероприятие не найдено");
                }
                setLoading(false)
            } catch (ex) {
                navigate("./404")
            }
        }

        async function loadImages (eventData) {
            const mainImage = await ExternalAPI.loadImage(eventData.mainImage.href);
            setMainImage(mainImage);
            if (eventData.eventImages) {
                const responses = await eventData.eventImages.map(e => ExternalAPI.loadImage(e.href));
                const eventImages = await Promise.all(responses);
                setImages([mainImage, ...eventImages]);
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
        setLoadingBeforeAddToCart(true);
        const response = await InternalAPI.addEventToCart(user.id, event.id);
        if (response.ok) {
            setOpen(true);
        }
        setLoadingBeforeAddToCart(false);
    }


    return (
        loading ? <LoadingWrapper><Loading/></LoadingWrapper> :
            <div style={{paddingBottom: "80px", fontFamily: "Trebuchet MS"}}>
                <NameContainer>
                    <Title>{event.name}</Title>
                    <Types><Circle/>{event.eventType.name}</Types>
                </NameContainer>
                <MainContainer>
                    <div>
                        {mainImage ? <img height={"280px"} width={"100%"} src={mainImage.href} alt={"Фотография"}/> :
                            <LoadImageWrapper><Loading circleColor={"#333"}/></LoadImageWrapper>}
                        <Images>
                            {images && images.length > 1 &&
                                images.map(image => <Img onClick={() => setMainImage(image)} src={image.href}/>)
                            }
                        </Images>
                    </div>
                    <BLock>
                        <Title>Описание</Title>
                        <Description>{event.smallDescription}</Description>
                    </BLock>
                    <BLock>
                        <Title>Место и время</Title>
                        <Description>
                            <div>{event.city}, {event.address}</div>
                            <div>{DateFormatter.format(event.date)} в {event.time} по МСК</div>
                            <div>+79821873500</div>
                        </Description>
                    </BLock>
                </MainContainer>
                <ButtonsContainer>
                    <ModalWindow visible={isOpen}>Добавлено ✨</ModalWindow>
                    <Button onClick={addEventToCart}>В корзину {event.cost}₽</Button>
                    <ImageContainer><Image src={HEART_IMG}/></ImageContainer>
                </ButtonsContainer>
            </div>
    )
}
