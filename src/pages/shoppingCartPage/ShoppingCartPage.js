import SHOPPING_CART_IMAGE from "../../img/cart.png"
import PageNameHeader from "../../commonComponents/PageNameHeader";
import {useEffect, useState} from "react";
import InternalAPI from "../../API/InternalAPI";
import EventCart from "./components/EventCart";
import styled from "styled-components";
import Loading from "../../commonComponents/Loading";

const EventsContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
`
const LoaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 60px;
    left: 0;
`
const ButtonsContainer = styled.div`
    position: fixed;
    bottom: 0;
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
export default function ShoppingCartPage ({user}) {
    const [eventCarts, setEventCarts] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        fetchEvents();
        async function fetchEvents () {
            const response = await InternalAPI.getUserCartEvents(user.id);
            console.log(response)
            if (response && response.length > 0) {
                setEventCarts(response);
            }
            setLoading(false);
        }
    }, [])

    return (
        <div>
            <PageNameHeader pageName={"Корзина"} image={SHOPPING_CART_IMAGE} />
            {
                loading ? <LoaderWrapper><Loading circleColor={"black"}/></LoaderWrapper> : eventCarts && eventCarts.length > 0 ?
                    <EventsContainer>{eventCarts.map(eventCart => <EventCart setEventCarts={setEventCarts} eventCarts={eventCarts} user={user} eventCart={eventCart}/>)}</EventsContainer> :
                    <div style={{color: "#333"}}>Пока тут пусто...</div>
            }
            <ButtonsContainer>
                <Button>Оплатить</Button>
            </ButtonsContainer>
        </div>
    )
}