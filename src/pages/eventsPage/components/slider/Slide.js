import DateFormatter from "../../../../commonComponents/DateFormatter";
import FIRE_IMAGE from "../../../../img/fire.png";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import React from 'react';


const SlideContainer = styled.div`
    position: absolute;
    width: 100%;
    max-width: 50rem;
    opacity: ${({active}) => active ? "1" : "0"};
    z-index: ${({active}) => active ? "1" : "0"};
    transition: opacity 0.6s ease-in-out;
`;

const EventName = styled.div`
    font-size: 1.5625rem;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const ModalContent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0.625rem;
    gap: 0.3125rem;
`;

const Circle = styled.div`
    width: 0.4375rem;
    height: 0.4375rem;
    border-radius: 50%;
    background-color: white;
    margin-right: 0.3125rem;
`;

const Types = styled.div`
    display: flex;
    align-items: center;
    @media screen and (max-width: 390px) {
        font-size: 0.875rem;
    }
`;

const IMAGE = styled.img`
    width: 100%;
    height: 25rem;
    border-radius: 0.9375rem;
    @media screen and (max-width: 500px) {
        height: 21.875rem;
    }
    @media screen and (max-width: 390px) {
        height: 17.5rem;
    }
`;

const ModalWindow = styled.div`
    position: absolute;
    top: 70%;
    bottom: 3px;
    right: 0;
    left: 0;
    border-radius: 0 0 0.9375rem 0.9375rem;
    background-color: rgba(0, 0, 0, 0.5);
    @media screen and (max-width: 500px) {
        top: 65%;
    }
    @media screen and (max-width: 390px) {
        top: 60%;
    }
`;

const FireAndCostContainer = styled.div`
    display: flex;
    gap: 0.625rem;
    align-items: center;
`;

const Fire = styled.div`
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 50%;
    padding: 0.3125rem 0.625rem;
`;

const Cost = styled.div`
    font-size: 1.5625rem;
    color: white;
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 0.625rem;
    padding: 0.3125rem 0.625rem;

    @media screen and (max-width: 300px) {
        font-size: 1.375rem;
    }
`;

export default function Slide ({event, index, currentPosition}) {
    const navigate = useNavigate();
    return (
        <SlideContainer onClick={() => navigate(`/events/${event.id}`)} key={index} active={index === currentPosition}>
            <IMAGE src={event.mainImage && event.mainImage.href}/>
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