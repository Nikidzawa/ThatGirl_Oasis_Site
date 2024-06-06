import DateFormatter from "../../../../commonComponents/DateFormatter";
import FIRE_IMAGE from "../../../../img/fire.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React from 'react';

const SlideContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-width: 50rem;
    opacity: ${({ active }) => (active ? "1" : "0")};
    z-index: ${({ active }) => (active ? "1" : "0")};
    transition: opacity 0.6s ease-in-out;
`;

const EventName = styled.div`
    font-size: 1.7rem;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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

const ImageContainer = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
`;

const IMAGE = styled.img`
    width: 100%;
    height: 25rem;
    border-radius: 0 0 1rem 1rem;
    @media screen and (max-width: 500px) {
        height: 21.875rem;
    }
    @media screen and (max-width: 390px) {
        height: 17.5rem;
    }
`;

const ModalWindow = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    border-radius: 0 0 1rem 1rem;
    background-color: rgba(0, 0, 0, 0.55);
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    padding: 10px;
`;

const FireAndCostContainer = styled.div`
    display: flex;
    gap: 0.625rem;
    align-items: center;
`;

const Fire = styled.div`
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 50%;
    text-align: center;
    padding: 0.3125rem 0.625rem 0.3125rem 0.625rem;
`;

const Cost = styled.div`
    font-size: 1.5625rem;
    color: white;
    text-align: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 0.625rem;
    padding: 0.3125rem 0.625rem 0.3125rem 0.625rem;

    @media screen and (max-width: 300px) {
        font-size: 1.375rem;
    }
`;

export default function Slide({ event, index, currentPosition }) {
    const navigate = useNavigate();
    return (
        <SlideContainer onClick={() => navigate(`/events/${event.id}`)} key={index} active={index === currentPosition}>
            <ImageContainer>
                <IMAGE src={event.mainImage && event.mainImage.href} />
                <ModalWindow>
                    <EventName>{event.name}</EventName>
                    <div style={{ display: "flex", gap: "15px" }}>
                        <Types>
                            <Circle />
                            <div>{event.eventType.name}</div>
                        </Types>
                        <Types style={{ display: "flex", alignItems: "center" }}>
                            <Circle />
                            <span>{DateFormatter.format(event.date)}</span>
                        </Types>
                    </div>
                    <FireAndCostContainer>
                        <Cost>{event.cost}₽</Cost>
                        <Fire><img width={"22px"} src={FIRE_IMAGE} alt={"Популярно"} /></Fire>
                    </FireAndCostContainer>
                </ModalWindow>
            </ImageContainer>
        </SlideContainer>
    );
}