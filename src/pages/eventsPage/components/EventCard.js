import styled from "styled-components";
import React, {useEffect, useState} from "react";
import IMAGE from "../../../img/calendar.png"
import STAR from "../../../img/star.png"
import HEART from "../../../img/heart.png"
import HEART_RED from "../../../img/heart-red.png"
import ExternalAPI from "../../../API/ExternalAPI";
import Loading from "../../../commonComponents/Loading";
import {useNavigate} from "react-router-dom";
import DateFormatter from "../../../commonComponents/DateFormatter";

const Card = styled.div`
    height: 460px;
    width: 350px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    background-color: #333;
    margin-top: 20px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    border-radius: 20px;

    @media screen and (max-width: 600px) {
        height: 450px;
        width: 330px;
    }

    @media screen and (max-width: 300px) {
        height: 400px;
        width: 250px;
    }
`

const Image = styled.img`
    width: auto;
    height: 50%;
    border-radius: 20px 20px 0 0;
`

const Content = styled.div`
    padding: 10px;
    flex-grow: 1;
    height: 0;
`
const Name = styled.div`
    font-size: 22px;
    padding: 10px 0 2px 0;
    @media screen and (max-width: 300px) {
        font-size: 18px;
        padding: 5px 0 5px 0;
    }
`

const City = styled.div`
    padding-bottom: 5px;
`

const Place = styled.div`
    display: flex;
    padding-bottom: 5px;
`

const Location = styled.div`
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 300px) {
        font-size: 13px;
    }
`

const Description = styled.div`
    font-size: 14px;
    height: 80px;
    overflow: hidden;
    text-overflow: ellipsis;

    @media screen and (max-width: 300px) {
        height: 75px;
        font-size: 13px;
    }
`
const Date = styled.div`
    font-size: 15px;
    white-space: nowrap;
    @media screen and (max-width: 300px) {
        font-size: 13px;
    }
`
const Cost = styled.div`
    font-size: 25px;
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 5px 10px;

    @media screen and (max-width: 300px) {
        font-size: 22px;
    }
`

const StarContainer = styled.div`
    position: absolute;
    bottom: 15px;
    left: 10px;
    display: flex;
    align-items: center;
`

const HeartContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;
    border-radius: 0 0 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const LoadImageWrapper = styled.div`
    display: flex;
    height: 50%;
    align-items: center;
    justify-content: center;
`
const Circle = styled.div`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: white;
    margin-right: 5px;
`

const EventType = styled.div`
    font-size: 14px;
    display: flex;
    align-items: center;
    padding-bottom: 10px;
`
export default function EventCard ({event}) {
    const [favourite, setFavourite] = useState();
    const [image, setImage] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        async function loadImage () {
            const image = await ExternalAPI.loadImage(event.mainImage.href)
            setImage(image)
        }
        loadImage()
        setFavourite(isFavourite);
    }, []);

    async function openEventPage () {
        navigate(`./${event.id}`)
    }

    function isFavourite() {
        const articles_read = localStorage.getItem("favouriteEvents");
        if (articles_read) {
            return articles_read.includes(event.id.toString());
        } else {
            return false;
        }
    }

    async function addOrRemoveToFavourite() {
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

    return (
        <Card onClick={openEventPage}>
            {
                image ? <Image src={image.href}></Image> : <LoadImageWrapper><Loading/></LoadImageWrapper>
            }
            <Content>
                <Location>
                    <HeartContainer onClick={e => {
                        e.stopPropagation();
                        addOrRemoveToFavourite();
                    }}>
                        {
                            favourite ? <img width={"38px"} src={HEART_RED} alt={"Избранное"}/> : <img width={"38px"} src={HEART} alt={"Избранное"}/>
                        }
                    </HeartContainer>
                    <div>
                        <City>{event.city.name},</City>
                        <Place>{event.address}</Place>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <img style={{paddingRight: "7px"}} width={"18px"} src={IMAGE} alt={"Фотография"}/>
                        <Date>{DateFormatter.format(event.date)}</Date>
                    </div>
                </Location>
                <Name><strong>{event.name}</strong></Name>
                <EventType><Circle/>{event.eventType.name}</EventType>
                <Description>{event.smallDescription}</Description>
                <StarContainer>
                    <img width={"25spx"} src={STAR} alt={"Оценка"}/>
                    <div style={{paddingLeft: "2px"}}>{event.rating}</div>
                </StarContainer>
                <Cost>{event.cost}₽</Cost>
            </Content>
        </Card>
    )
}