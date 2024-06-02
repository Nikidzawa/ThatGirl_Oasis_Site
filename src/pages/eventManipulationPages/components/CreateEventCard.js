import styled from "styled-components";
import React from "react";
import IMAGE from "../../../img/calendar.png"
import STAR from "../../../img/star.png"
import HEART from "../../../img/heart.png"
import NULL_PHOTO from "../../../img/camera.png"
import DateFormatter from "../../../commonComponents/DateFormatter";

const Card = styled.div`
    height: 450px;
    width: 340px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    background-color: #333;
    margin-top: 20px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    border-radius: 20px;

    @media screen and (max-width: 360px) {
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
    @media screen and (max-width: 360px) {
        font-size: 18px;
        padding: 5px 0 5px 0;
    }
`

const Location = styled.div`
    font-size: 15px;
    padding-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 360px) {
        font-size: 13px;
    }
`
const MainContainer = styled.div`
    height: 83%;
    overflow: hidden;
`

const Description = styled.div`
    font-size: 14px;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;

    @media screen and (max-width: 360px) {
        height: 70px;
        font-size: 13px;
    }
`
const Date = styled.div`
    font-size: 15px;
    white-space: nowrap;
    @media screen and (max-width: 360px) {
        font-size: 13px;
    }
`

const StarAndCostContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const Cost = styled.div`
    font-size: 25px;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 5px 10px;

    @media screen and (max-width: 360px) {
        font-size: 22px;
    }
`

const StarContainer = styled.div`
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
export default function CreateEventCard ({name, date, address, smallDescription, rating, cost, image, type}) {
    return (
        <Card>
            <HeartContainer>
                <img width={"35px"} src={HEART}/>
            </HeartContainer>
            <Image src={image ? image : NULL_PHOTO}></Image>
            <Content>
                <MainContainer>
                    <Location>
                        <div>{address ? address : "Адрес"}</div>
                        <div style={{display: "flex", alignItems: "center", paddingLeft: "10px"}}>
                            <img style={{paddingRight: "7px"}} width={"18px"} src={IMAGE}/>
                            <Date>{date ? DateFormatter.format(date) : "Дата"}</Date>
                        </div>
                    </Location>
                    <Name><strong>{name ? name : "Название"}</strong></Name>
                    <EventType><Circle/>{type ? type.name : "тип не выбран"}</EventType>
                    <Description>{smallDescription ? smallDescription : "Краткое описание"}</Description>
                </MainContainer>
                <StarAndCostContainer>
                    <StarContainer>
                        <img width={"25spx"} src={STAR}/>
                        <div style={{paddingLeft: "2px"}}>{rating ? rating : "Рейтинг"}</div>
                    </StarContainer>
                    <Cost>{cost ? cost : "цена"}₽</Cost>
                </StarAndCostContainer>
            </Content>
        </Card>
    )
}