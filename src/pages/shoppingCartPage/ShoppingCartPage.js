import SHOPPING_CART_IMAGE from "../../img/cart.png"
import CART_NOT_FOUND_IMAGE from "../../img/cartNotFound.png"
import PageNameHeader from "../../commonComponents/PageNameHeader";
import {useEffect, useState} from "react";
import EventCart from "./components/EventCart";
import styled from "styled-components";
import Loading from "../../commonComponents/Loading";
import PaymentAPI from "../../API/internal/categoryes/PaymentAPI";

const EventsContainer = styled.div`
    display: flex;
    flex-direction: column;
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
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 20px;
    height: 70px;
    max-width: 1000px;
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
    height: 100vh;
    justify-content: center;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    color: black;
    font-size: 23px;
    padding: 10px;
    gap: 10px;
`

const Separator = styled.div`
    background-color: black;
    margin: 20px auto;
    width: 80%;
    height: 2px;
`
const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 10px;
`

const Input = styled.input`
    min-height: 25px;
    font-size: 16px;
    background-color: #eeded2;
    border: none;
    border-bottom: solid 1px ${props => props.error ? 'red' : 'black'};
`

export default function ShoppingCartPage () {
    const [eventCarts, setEventCarts] = useState(null);
    const [loading, setLoading] = useState(null);
    const [finalCost, setFinalCost] = useState(null);
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");

    const [emailIsValid, setEmailIsValid] = useState(true);
    const [emailIsNull, setEmailIsNull] = useState(false);
    const [emailIsEquals, setEmailIsEquals] = useState(true);

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

    async function startPay () {
        if (email && confirmEmail) {
            setEmailIsNull(false);
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (emailRegex.test(email)) {
                setEmailIsValid(true);
                if (email === confirmEmail) {
                    setEmailIsEquals(true);
                    const result = await PaymentAPI.startPay(eventCarts, email.trim());
                    window.location.href = result.confirmation.confirmation_url;
                } else {
                    setEmailIsEquals(false);
                }
            } else {
                setEmailIsValid(false);
            }
        } else {
            setEmailIsNull(true);
        }
    }

    return (
        <div className={"main"}>
            <PageNameHeader pageName={"Корзина"} image={SHOPPING_CART_IMAGE} />
            {
                loading ? <LoaderWrapper><Loading circleColor={"black"}/></LoaderWrapper> : eventCarts && eventCarts.length > 0 ?
                    <div style={{padding: "5px 5px 70px 5px"}}>
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
                        </EventsContainer>
                        <Separator/>
                        <InputsContainer>
                        <div style={{color: "black", textAlign: "center"}}>После покупки, билеты придут на указанный адрес электронной почты</div>
                            <Input placeholder={"Почтовый адрес"} onChange={e => setEmail(e.target.value)} error={!emailIsValid || emailIsNull || !emailIsEquals}/>
                            <Input placeholder={"Подтвердите почтовый адрес"} onChange={e => setConfirmEmail(e.target.value)} error={!emailIsValid || emailIsNull || !emailIsEquals}/>
                            {
                                !emailIsValid && <div style={{color: "red"}}>Введите корректный адрес электронной почты</div>
                            }
                            {
                                emailIsNull && <div style={{color: "red"}}>Поля должны быть заполнены</div>
                            }
                            {
                                !emailIsEquals && <div style={{color: "red"}}>Адреса не равны</div>
                            }
                        </InputsContainer>
                    </div> :
                    <CenterText>
                        <img width={"80px"} src={CART_NOT_FOUND_IMAGE} alt={"Не найдено"}/>
                        <div style={{textAlign: "center"}}>Вы пока не добавили мероприятия в корзину</div>
                    </CenterText>
            }
            {
                eventCarts && eventCarts.length > 0 && finalCost &&
                <ButtonsContainer>
                    <Button onClick={startPay}>Оплатить {finalCost}₽</Button>
                </ButtonsContainer>
            }
        </div>
    )
}