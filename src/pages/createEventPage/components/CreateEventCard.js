import styled from "styled-components";
import React from "react";
import IMAGE from "../../../img/calendar.png"
import STAR from "../../../img/star.png"
import HEART from "../../../img/heart.png"
import NULL_PHOTO from "../../../img/camera.png"
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
export default function CreateEventCard ({name, date, city, address, smallDescription, rating, cost, image, type}) {
    return (
        <Card>
            <Image src={image ? image : NULL_PHOTO}></Image>
            <Content>
                <Location>
                    <div>
                        <City>{city ? city : "Город"}</City>
                        <Place>{address ? address : "Адрес"}</Place>
                    </div>
                    <HeartContainer>
                        <img width={"35px"} src={HEART}/>
                    </HeartContainer>
                    <div style={{display: "flex", alignItems: "center", paddingLeft: "10px"}}>
                        <img style={{paddingRight: "7px"}} width={"18px"} src={IMAGE}/>
                        <Date>{date ? DateFormatter.format(date) : "Дата"}</Date>
                    </div>
                </Location>
                <Name><strong>{name ? name : "Название"}</strong></Name>
                <EventType><Circle/>{type ? type.name : "тип не выбран"}</EventType>
                <Description>{smallDescription ? smallDescription : "Краткое описание"}</Description>
                <StarContainer>
                    <img width={"25spx"} src={STAR}/>
                    <div style={{paddingLeft: "2px"}}>{rating ? rating : "Рейтинг"}</div>
                </StarContainer>
                <Cost>{cost ? cost : "цена"}₽</Cost>
            </Content>
        </Card>
    )
}