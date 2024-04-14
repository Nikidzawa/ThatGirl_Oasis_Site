import SHOPPING_CART_IMAGE from "../../img/cart.png"
import PageNameHeader from "../../commonComponents/PageNameHeader";
import {useEffect, useState} from "react";
import EventCart from "./components/EventCart";
import styled from "styled-components";
import Loading from "../../commonComponents/Loading";

const EventsContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px 5px 70px 5px;
    gap: 10px;
`
const LoaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`
const ButtonsContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 20px;
    height: 70px;
`
const Button = styled.button`
    background-color: green;
    border-top: 1px black solid;
    color: azure;
    height: 100%;
    font-size: 28px;
    padding: 10px 15px;
    flex: 1;
`
const CenterText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #333333;
    font-size: 20px;
`
export default function ShoppingCartPage () {
    const [eventCarts, setEventCarts] = useState(null);
    const [loading, setLoading] = useState(null);
    const [finalCost, setFinalCost] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchEvents();
        async function fetchEvents () {
            setLoading(true)
            const cartsData = JSON.parse(localStorage.getItem("cartEvents"));
            setEventCarts(cartsData);
            calculateFinalCost(cartsData);
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        calculateFinalCost(eventCarts);
    }, [eventCarts])

    async function calculateFinalCost(events) {
        if (events && events.length > 0) {
            let totalCost = 0;
            events.forEach(eventCart => {
                totalCost += eventCart.cost * eventCart.count;
            });
            setFinalCost(totalCost);
        }
    }

    return (
        <div className={"main"}>
            <PageNameHeader pageName={"Корзина"} image={SHOPPING_CART_IMAGE} />
            {
                loading ? <LoaderWrapper><Loading circleColor={"black"}/></LoaderWrapper> : eventCarts && eventCarts.length > 0 ?
                    <EventsContainer>
                        {
                            eventCarts.map(eventCart => <EventCart
                                key={eventCart.id}
                                setEventCarts={setEventCarts}
                                eventCarts={eventCarts}
                                eventCart={eventCart}
                                setFinalCost={setFinalCost}
                                finalCost={finalCost}
                            />)
                        }
                    </EventsContainer> :
                    <CenterText>
                        <div style={{textAlign: "center"}}>Вы пока не добавили мероприятия в корзину</div>
                    </CenterText>
            }
            {
                eventCarts && eventCarts.length > 0 && finalCost && <ButtonsContainer><Button>Оплатить {finalCost}₽</Button></ButtonsContainer>
            }
        </div>
    )
}