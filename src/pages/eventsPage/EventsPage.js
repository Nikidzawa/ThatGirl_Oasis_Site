import styled from 'styled-components';
import EventCard from "./components/EventCard";
import {useEffect, useState} from "react";
import InternalAPI from "../../API/InternalAPI";
import Loading from "../../commonComponents/Loading";
import GridContainer from "../../commonComponents/GridContainer";
import SearchPanel from "./components/SearchPannel";
import Slider from "../../commonComponents/Slider";
import BACKGROUND_IMAGE from "../../img/background.jpg"

const LoadingWrapper = styled.div`
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
const Background = styled.div`
    background-image: none;
    background-repeat: repeat;
    background-size: contain;
    
    @media screen and (max-width: 500px) {
        background-image: ${props => props.image && `url(${props.image})`};
    }
`

const NotFoundMessage = styled.div`
    text-align: center;
    align-items: center;
    margin-top: 200px;
    padding: 20px;
`
export default function EventsPage ({user}) {
    const [loading, setLoading] = useState(true)
    const [events, setEvents] = useState(null)
    const [sortedEvents, setSortedEvents] = useState(null)

    useEffect(() => {
        async function getAllEvents() {
            const data = await InternalAPI.getAllEvents();
            setEvents(data);
            setLoading(false);
        }
        getAllEvents();
    }, []);

    return (
        <div>
            {
                loading ? <LoadingWrapper><Loading/></LoadingWrapper> : !events ? <LoadingWrapper>Мероприятия не найдены</LoadingWrapper>
                    :
                    <Background image={BACKGROUND_IMAGE}>
                        <div style={{
                            textAlign: "center",
                            fontSize: "23px",
                            padding: "15px 0 15px 0",
                            backgroundColor: "#333",
                            fontWeight: "bold",
                            fontFamily: "Candara"
                        }}>Популярные мероприятия
                        </div>
                        <Slider/>
                        <div style={{
                            textAlign: "center",
                            fontSize: "23px",
                            padding: "25px 0 10px 0",
                            backgroundColor: "#333",
                            fontWeight: "bold",
                            fontFamily: "Candara"
                        }}>Все мероприятия
                        </div>
                        <SearchPanel user={user} events={events} setSortedEvents={setSortedEvents}/>
                        <GridContainer>{!sortedEvents || sortedEvents.length === 0 ?
                            <NotFoundMessage>К сожалению, ничего не нашли</NotFoundMessage> :
                            sortedEvents.map(event => <EventCard key={event.id} event={event} user={user}/>)}
                        </GridContainer>
                    </Background>
            }
        </div>
    )
}