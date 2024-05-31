import styled from "styled-components";
import PLUS from "../../../img/plus.png"
import PLUS_GREEN from "../../../img/plus_green.png"
import MINUS from "../../../img/minus.png"
import MINUS_RED from "../../../img/minus_red.png"
import BUCKET from "../../../img/bucket.png"
import {useNavigate} from "react-router-dom";
import React from 'react';

const Background = styled.div`
    height: 80px;
    background-color: #333333;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    align-items: center;
`

const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`
const Title = styled.div`
    font-size: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: absolute;
    left: 0;
    right: 40px;
`;

const PriceAndCountContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 6px;
`
const Count = styled.div`
    font-size: 20px;
    cursor: default;
`
const UpperRow = styled.div`
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
`


export default function EventCart ({setEventCarts, eventCarts, eventCart, setFinalCost, finalCost}) {
    const navigate = useNavigate()
    async function plusCount () {
        const count = Number.parseInt(eventCart.count) + 1;
        if (count < 100) {
            eventCart.count=count;
            setFinalCost(finalCost + eventCart.cost)
            await updateLocalStorageData();
        }
    }

    async function minusCount() {
        const count = Number.parseInt(eventCart.count) - 1;
        if (count === 0) {
            await deleteEvent()
        } else {
            eventCart.count=count;
            setFinalCost(finalCost - eventCart.cost);
            await updateLocalStorageData();
        }
    }

    async function deleteEvent() {
        const updatedCartEvents = eventCarts.filter(otherEventCart => otherEventCart.id !== eventCart.id);
        setEventCarts(updatedCartEvents);
        localStorage.setItem("cartEvents", JSON.stringify(updatedCartEvents));
    }

    async function updateLocalStorageData() {
        localStorage.setItem("cartEvents", JSON.stringify(eventCarts));
    }

    return (
        <Background>
            <img alt={"картинка"} onClick={() => navigate(`/events/${eventCart.id}`)} width={"75px"} height={"65px"} src={eventCart.mainImage.href}/>
            {
                <div style={{marginLeft: "10px", flex: "1"}}>
                    <UpperRow>
                        <Title>{eventCart.name}</Title>
                        <img alt={"удалить"} onClick={deleteEvent} style={{marginLeft: "auto", cursor: "pointer"}} width={"30px"} src={BUCKET}/>
                    </UpperRow>
                    <PriceAndCountContainer>
                        <ButtonsContainer>
                            <img style={{cursor: "pointer"}} alt={"увеличить"} onClick={plusCount} width={"35px"} src={PLUS_GREEN}/>
                            <Count>{eventCart.count}</Count>
                            <img style={{cursor: "pointer"}} alt={"уменьшить"} onClick={minusCount} width={"35px"} src={MINUS_RED}/>
                        </ButtonsContainer>
                        <Count>{eventCart.cost}₽</Count>
                    </PriceAndCountContainer>
                </div>
            }
        </Background>
    )
}