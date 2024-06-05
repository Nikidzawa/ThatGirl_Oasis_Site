import SHOPPING_CART_IMAGE from "../../img/cart.png"
import CART_NOT_FOUND_IMAGE from "../../img/cartNotFound.png"
import PageNameHeader from "../../commonComponents/PageNameHeader";
import React, {useEffect, useState} from "react";
import EventCart from "./components/EventCart";
import styled from "styled-components";
import Loading from "../../commonComponents/Loading";
import PaymentAPI from "../../API/internal/categoryes/PaymentAPI";
import {useNavigate} from "react-router-dom";
import EventsAPI from "../../API/internal/categoryes/events/EventsAPI";
import SUCCESS_IMG from "../../img/success.png"
import ModalWindow from "./components/ModalWindow";
import MAIL_IMG from "../../img/mail.png"

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
    height: calc(100vh - 180px);
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
    width: 100%;
    font-size: 16px;
    background-color: #eeded2;
    border: none;
    background-image: ${props => `url('${props.backgroundImage}')`};
    background-repeat: no-repeat;
    background-position: center left 5px;
    background-size: 25px;
    border-bottom: solid 1px ${props => props.error ? 'red' : 'black'};
    padding-left: 35px;
    padding-bottom: 0;
    align-items: center;
`;

const SuccessEmailButton = styled.div`
    padding: 10px;
    background-color: green;
    color: white;
    text-align: center;
    border-radius: 10px;
`

export default function ShoppingCartPage ({user}) {
    const [eventCarts, setEventCarts] = useState(null);
    const [loading, setLoading] = useState(null);
    const [finalCost, setFinalCost] = useState(null);
    const [email, setEmail] = useState("");

    const [emailIsValid, setEmailIsValid] = useState(true);
    const [emailIsNull, setEmailIsNull] = useState(false);
    const [emailSuccess, setEmailSuccess] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);
        fetchEvents();
        fetchEmail();

        async function fetchEvents () {
            setLoading(true);

            const cartsData = JSON.parse(localStorage.getItem("cartEvents")) || [];
            const eventPromises = cartsData.map(async (event) => {
                let response = await EventsAPI.getEventById(event.id);
                if (response.ok) {
                    return event;
                }
                return null;
            });

            const resolvedEvents = await Promise.all(eventPromises);
            const filteredEvents = resolvedEvents.filter(event => event !== null);

            localStorage.setItem("cartEvents", JSON.stringify(filteredEvents));
            setEventCarts(filteredEvents);
            await calculateFinalCost(filteredEvents);
            setLoading(false);
        }

        async function fetchEmail () {
            let email = localStorage.getItem("email") || null;
            if (email) {
                setEmailSuccess(true)
                setEmail(email);
            }
        }
    }, [])

    useEffect(() => {
        const localStorageEmail = localStorage.getItem("email") || null;
        if (email !== localStorageEmail) {
            setEmailSuccess(false)
        } else setEmailSuccess(true)
    }, [email])

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
        if (emailSuccess) {
            const result = await PaymentAPI.startPay(eventCarts, email.trim());
            window.location.href = result.confirmation.confirmation_url;
        } else {
            await emailValidation()
        }
    }

    async function emailValidation () {
        if (email) {
            setEmailIsNull(false);
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (emailRegex.test(email)) {
                setEmailIsValid(true);
                setModalVisible(true)
            } else {
                setEmailIsValid(false);
            }
        } else {
            setEmailIsNull(true);
        }
    }

    function goToEventsPage () {
        navigate("/events")
    }

    return (
        <div className={"main"}>
            <PageNameHeader padding={"20px"} pageName={"Корзина"} image={SHOPPING_CART_IMAGE} />
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
                            <div style={{display: "flex", gap: "10px"}}>
                                <Input value={email}
                                       backgroundImage={MAIL_IMG}
                                       placeholder={"Почтовый адрес"}
                                       onChange={e => setEmail(e.target.value)}
                                       error={!emailIsValid || emailIsNull}/>
                                {
                                    emailSuccess ?
                                        <img src={SUCCESS_IMG}
                                             width={"45px"}
                                             /> :
                                        <SuccessEmailButton onClick={emailValidation}>Подтвердить</SuccessEmailButton>
                                }
                            </div>
                            {
                                !emailIsValid && <div style={{color: "red"}}>Введите корректный адрес электронной почты</div>
                            }
                            {
                                emailIsNull && <div style={{color: "red"}}>Поле должно быть заполнено</div>
                            }
                        </InputsContainer>
                    </div> :
                    <CenterText>
                        <img width={"80px"} src={CART_NOT_FOUND_IMAGE} alt={"Не найдено"}/>
                        <div style={{textAlign: "center"}}>Вы пока не добавили мероприятия в корзину</div>
                        <div style={{fontSize: "20px", color: "green", cursor: "pointer"}} onClick={goToEventsPage}>Добавить мероприятие</div>
                    </CenterText>
            }
            {
                eventCarts && eventCarts.length > 0 && finalCost &&
                <ButtonsContainer>
                    <Button onClick={startPay}>Оплатить {finalCost}₽</Button>
                </ButtonsContainer>
            }
            <ModalWindow email={email} setModalVisible={setModalVisible} modalVisible={modalVisible} setEmailSuccess={setEmailSuccess}/>
        </div>
    )
}