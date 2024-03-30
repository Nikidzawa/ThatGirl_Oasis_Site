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
export default function EventPage () {
    const { id } = useParams();
    const [event, setEvent] = useState();
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState(null);
    const [images, setImages] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getEvent();
        async function getEvent () {
            try {
                const response = await InternalAPI.getEvent(id);
                if (response.ok) {
                    const eventData = await response.json();
                    setEvent(eventData);
                    const mainImage = eventData.mainImage;
                    setMainImage(mainImage);
                    const eventImages = eventData.eventImages;
                    if (eventImages && eventImages.length > 0) {
                        setImages([mainImage, ...eventData.eventImages]);
                    } else {
                        setImages(null)
                    }
                } else {
                    throw new Exception("Мероприятие не найдено");
                }
                setLoading(false)
            } catch (ex) {
                navigate("./404")
            }
        }
    }, []);

    return (
        loading ? <LoadingWrapper><Loading/></LoadingWrapper> :
            <div style={{paddingBottom: "80px", fontFamily: "Trebuchet MS"}}>
                <NameContainer>
                    <Title>{event.name}</Title>
                    <Types><Circle/>Кулинарный мастер-класс</Types>
                </NameContainer>
                <MainContainer>
                    <div>
                        {mainImage ? <img height={"280px"} width={"100%"} src={mainImage.href}/> :
                            <LoadImageWrapper><Loading circleColor={"#333"}/></LoadImageWrapper>}
                        <Images>
                            {images && images.map(image => <Img onClick={() => setMainImage(image)} src={image.href}/>)}
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
                            <div>{DateFormatter.format(event.date)} в {event.time}</div>
                            <div>+79821873500</div>
                        </Description>
                    </BLock>
                </MainContainer>
                <ButtonsContainer>
                    <Button>Купить билет {event.cost}₽</Button>
                    <ImageContainer>
                        <Image src={HEART_IMG}/>
                    </ImageContainer>
                </ButtonsContainer>
            </div>
    )
}
