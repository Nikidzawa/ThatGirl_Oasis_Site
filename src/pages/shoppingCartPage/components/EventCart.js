import styled from "styled-components";
import {useEffect, useState} from "react";
import ExternalAPI from "../../../API/ExternalAPI";
import PLUS from "../../../img/plus.png"
import MINUS from "../../../img/minus.png"
import BUCKET from "../../../img/bucket.png"
import Loading from "../../../commonComponents/Loading";

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
    left: 100px;
    right: 50px;
`;

const PriceAndCountContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 6px;
`
const Text = styled.div`
    font-size: 20px;
`
const UpperRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const LoadImageWrapper = styled.div`
    display: flex;
    height: 50%;
    align-items: center;
    justify-content: center;
`


export default function EventCart ({setEventCarts, eventCarts, eventCart, setFinalCost, finalCost}) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        loadImage();

        async function loadImage () {
            const image = await ExternalAPI.loadImage(eventCart.mainImage.href);
            setImage(image);
        }
    }, [])

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
            {
                image ? <img width={"75px"} height={"65px"} src={image.href}/> :
                    <LoadImageWrapper><Loading/></LoadImageWrapper>
            }
            {
                <div style={{marginLeft: "10px", flex: "1"}}>
                    <UpperRow>
                        <Title>{eventCart.name}</Title>
                        <img onClick={deleteEvent} style={{marginLeft: "auto"}} width={"30px"} src={BUCKET}/>
                    </UpperRow>
                    <PriceAndCountContainer>
                        <ButtonsContainer>
                            <img onClick={plusCount} width={"35px"} src={PLUS}/>
                            <Text>{eventCart.count}</Text>
                            <img onClick={minusCount} width={"35px"} src={MINUS}/>
                        </ButtonsContainer>
                        <Text>{eventCart.cost}₽</Text>
                    </PriceAndCountContainer>
                </div>
            }
        </Background>
    )
}