import styled from "styled-components";
import {useEffect, useState} from "react";
import ExternalAPI from "../../../API/ExternalAPI";
import PLUS from "../../../img/plus.png"
import MINUS from "../../../img/minus.png"
import InternalAPI from "../../../API/InternalAPI";
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
const Price = styled.div`
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


export default function EventCart ({setEventCarts, eventCarts, user, eventCart}) {
    const [image, setImage] = useState(null);
    const [event, setEvent] = useState(null);
    const [count, setCount] = useState(null);

    useEffect(() => {
        setFields();
        loadImage();

        async function setFields () {
            setEvent(eventCart.event);
            setCount(eventCart.count);
        }
        async function loadImage () {
            const image = await ExternalAPI.loadImage(eventCart.event.mainImage.href);
            setImage(image);
        }
    }, [])

    async function adToCart () {
        const response = await InternalAPI.addEventToCart(user.id, event.id);
        if (response.ok) {
            if (count !== 100) {
                const json = await response.json();
                setCount(json.count)
            }
        }
    }

    async function removeFromCart() {
        const response = await InternalAPI.removeEventFromCart(user.id, event.id);
        if (response.ok) {
            if (count === 1) {
                const newEventCarts = eventCarts.filter(otherEventCart => otherEventCart.id !== eventCart.id);
                setEventCarts(newEventCarts);
            } else {
                const json = await response.json();
                setCount(json.count);
            }
        }
    }

    return (
        <Background>
            {
                image ? <img width={"75px"} height={"65px"} src={image.href}/> :
                    <LoadImageWrapper><Loading/></LoadImageWrapper>
            }
            {
                event && count && (
                    <div style={{marginLeft: "10px", flex: "1"}}>
                        <UpperRow>
                            <Title>{event.name}</Title>
                            <img style={{marginLeft: "auto"}} width={"30px"} src={BUCKET}/>
                        </UpperRow>
                        <PriceAndCountContainer>
                            <ButtonsContainer>
                                <img onClick={adToCart} width={"35px"} src={PLUS}/>
                                <Price>{count}</Price>
                                <img onClick={removeFromCart} width={"35px"} src={MINUS}/>
                            </ButtonsContainer>
                            <Price>{event.cost}₽</Price>
                        </PriceAndCountContainer>
                    </div>
                )
            }
        </Background>
    )
}