import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import EventsAPI from "../../API/internal/categoryes/events/EventsAPI";
import styled from "styled-components";
import DateFormatter from "../../commonComponents/DateFormatter";

const Container = styled.div`
    min-height: 1200px;
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
        <>
            {
                loading ? <div>Загрузка</div> : !event ? <div>Событие не найдено</div> :
                    <Container>
                        <h1>{event.name} {DateFormatter.format(event.date)}</h1>
                        <h3 style={{color: 'green'}}>Билет подтверждён</h3>
                        <img src={event.mainImage}/>
                    </Container>
            }
        </>
    );
}

