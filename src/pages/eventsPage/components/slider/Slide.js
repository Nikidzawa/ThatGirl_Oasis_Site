import DateFormatter from "../../../../commonComponents/DateFormatter";
import FIRE_IMAGE from "../../../../img/fire.png";
import styled from "styled-components";

const SlideContainer = styled.div`
    position: absolute;
    opacity: ${({active}) => active ? "1" : "0"};
    z-index: ${({active}) => active ? "1" : "0"};
    transition: opacity 0.6s ease-in-out;
`

const EventName = styled.div`
    font-size: 25px;
    font-weight: bold;
    font-family: Candara;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`
const ModalContent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 5px;
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
    @media screen and (max-width: 370px) {
        font-size: 14px;
    }
`

const IMAGE = styled.img`
    width: 100%;
    height: 350px;
    border-radius: 15px;
    @media screen and (max-width: 370px){
        height: 280px;
    }
`

const ModalWindow = styled.div`
    position: absolute;
    top: 65%;
    bottom: 0;
    right: 0;
    left: 0;
    border-radius: 0 0 20px 20px;
    background-color: rgba(0, 0, 0, 0.4);
    
`

const FireAndCostContainer = styled.div`
    display: flex;
    gap: 10px;
`

const Fire = styled.div`
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 50%;
    padding: 5px 10px;
`

const Cost = styled.div`
    font-size: 25px;
    color: white;
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 10px;
    padding: 5px 10px;

    @media screen and (max-width: 300px) {
        font-size: 22px;
    }
`

export default function Slide ({event, index, currentPosition}) {
    return (
        <SlideContainer key={index} active={index === currentPosition}>
            <IMAGE src={event.mainImage.href}/>
            <ModalWindow>
                <ModalContent>
                    <EventName>{event.name}</EventName>
                    <div style={{display: "flex", gap: "15px"}}>
                        <Types>
                            <Circle/>
                            <div>{event.eventType.name}</div>
                        </Types>
                        <Types style={{display: "flex", alignItems: "center"}}>
                            <Circle/>
                            <span>{DateFormatter.format(event.date)}</span>
                        </Types>
                    </div>
                    <FireAndCostContainer>
                        <Cost>{event.cost}₽</Cost>
                        <Fire><img width={"22px"} src={FIRE_IMAGE} alt={"Популярно"}/></Fire>
                    </FireAndCostContainer>
                </ModalContent>
            </ModalWindow>
        </SlideContainer>
    )
}