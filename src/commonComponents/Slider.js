import styled from "styled-components";
import {useState} from "react";
import FIRE_IMAGE from "../img/fire.png"
import RIGHT_ARROW from "../img/right-arrow.png"
import LEFT_ARROW from "../img/left-arrow.png"
import "../index.css"


const SliderContainer = styled.div`
    min-height: 350px;
    max-width: 430px;
    position: relative;
    padding-bottom: 10px;
    background-color: #333;
`

const IMAGE = styled.img`
    height: 350px;
    width: 100%;
    border-radius: 15px;
`
const ModalWindow = styled.div`
    position: absolute;
    top: 60%;
    bottom: 0;
    right: 0;
    left: 0;
    border-radius: 0 0 20px 20px;
    background-color: rgba(0, 0, 0, 0.4);
`

const Fire = styled.div`
    position: absolute;
    bottom: 10px;
    left: 93px;
    background-color: rgba(0, 0, 0, 0.75);

    border-radius: 50%;
    padding: 5px 10px;
`

const Cost = styled.div`
    font-size: 25px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: white;
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 10px;
    padding: 5px 10px;

    @media screen and (max-width: 300px) {
        font-size: 22px;
    }
`

const LeftArrow = styled.div`
    position: absolute;
    bottom: 50%;
    left: 15px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 50%;
    padding: 10px 15px;
    opacity: 60%;
    z-index: 2;
    ${props => props.value === 0 && `display: none`}}
`

const RightArrow = styled.div`
    position: absolute;
    bottom: 50%;
    right: 15px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 50%;
    padding: 10px 15px;
    opacity: 60%;
    z-index: 2;
    ${props => props.value === props.maxValue && `display: none`}}
`

const Slide = styled.div`
    position: absolute;
    opacity: ${({active}) => active ? "1" : "0"};
    z-index: ${({active}) => active ? "1" : "0"};
    transition: opacity 0.6s ease-in-out;
`


const EventName = styled.div`
    font-size: 25px;
    font-weight: bold;
    font-family: Candara;
    padding-bottom: 8px;
    overflow: auto;
`
const ModalContent = styled.div`
    position: absolute;
    padding: 10px;
    bottom: 45px;
`
const Circle = styled.div`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: white;
    margin-right: 5px;
`
const Types = styled.div`
    display: flex;
    align-items: center;
    @media screen and (max-width: 375px) {
        font-size: 14px;
    }
`
export default function Slider () {
    const [events, setEvents] = useState([
        {
            name: "Создание лучшей помады",
            type: "Контентный мастер-класс",
            date: "20 Апреля",
            img: "https://static.tildacdn.com/tild6162-6163-4566-b937-653431626437/186A0399_1.jpg",
            price: 650
        },
        {
            name: "Создание украшений из цветов",
            type: "Контентный мастер-класс",
            date: "10 Марта",
            img: "https://images.squarespace-cdn.com/content/v1/589d9b40d2b85721b386eea6/1590402274713-2T29XSDRC9VRG2CXRIM8/taniamuser-Italian-wedding-destination-floral-designer-event-tablescape-floral-design-italy-tuscany-italianlakes-verona-lakegarda",
            price: 350
        },
        {
            name: "Сбор гербария",
            type: "Туристический поход",
            date: "10 Марта",
            img: "https://img.7dach.ru/image/600/17/79/12/2019/10/08/ebbd5a.jpg",
            price: 150
        },
        ]
    );
    const [currentPosition, setCurrentPosition] = useState(0);

    function handleRightClick() {
        if (currentPosition < events.length - 1) {
            setCurrentPosition(currentPosition + 1)
        }
    }

    function handleLeftClick() {
        if (currentPosition > 0) {
            setCurrentPosition(currentPosition - 1)
        }
    }

    return (
        <SliderContainer>
            {events.map((event, index) => (
                <Slide key={index} active={index === currentPosition}>
                    <IMAGE src={event.img}/>
                    <ModalWindow>
                        <ModalContent>
                            <EventName>{event.name}</EventName>
                            <div style={{display: "flex", gap: "15px"}}>
                                <Types>
                                    <Circle/>
                                    <div>{event.type}</div>
                                </Types>
                                <Types style={{display: "flex", alignItems: "center"}}>
                                    <Circle/>
                                    <span>{event.date}</span>
                                </Types>
                            </div>
                        </ModalContent>
                        <Fire><img width={"22px"} src={FIRE_IMAGE} alt={"Популярно"}/></Fire>
                        <Cost>{event.price}₽</Cost>
                    </ModalWindow>
                    <RightArrow onClick={e => handleRightClick()} value={currentPosition} maxValue={events.length - 1}>
                        <img width={"15px"} src={RIGHT_ARROW} alt={"Вправо"}/>
                    </RightArrow>
                    <LeftArrow onClick={e => handleLeftClick()} value={currentPosition}>
                        <img width={"15px"} src={LEFT_ARROW} alt={"Влево"}/>
                    </LeftArrow>
                </Slide>
            ))}
        </SliderContainer>
    )
}