import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import EventsAPI from "../../API/internal/categoryes/events/EventsAPI";
import styled from "styled-components";
import DateFormatter from "../../commonComponents/DateFormatter";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const MainDiv = styled.div`
    min-height: 1200px;
    margin: 0 auto;
    text-align: center;
    color: black;
`

const AcceptText = styled.h3`
    color: yellowgreen;
    font-size: 25px;
`

const NotRegisterText = styled.h3`
    color: red;
    font-size: 25px;
`

export default function CheckRegister() {
    const { eventId, token } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkRegister() {
            if (eventId && token) {
                const response = await EventsAPI.checkRegister(eventId, token);
                if (response.ok) {
                    const responseJson = await response.json();
                    setEvent(responseJson);
                }
            }
            setLoading(false);
        }
        checkRegister();
    }, [eventId, token]);

    return (
        <MainDiv>
            {
                loading ? <div>Загрузка</div> : event ?
                    <Container>
                        <h1>{event.name} {DateFormatter.format(event.date)}</h1>
                        <img src={event.mainImage} width={"120px"}/>
                        <AcceptText style={{color: 'green'}}>Билет подтверждён</AcceptText>
                    </Container> : <NotRegisterText>Токен не подтверждён</NotRegisterText>
            }
        </MainDiv>
    );
}

