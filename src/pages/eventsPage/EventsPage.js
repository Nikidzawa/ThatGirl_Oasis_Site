import styled from 'styled-components';
import EventCard from "./components/EventCard";
import {useEffect, useState} from "react";
import Loading from "../../commonComponents/Loading";
import GridContainer from "../../commonComponents/GridContainer";
import SearchPanel from "./components/SearchPannel";
import Slider from "./components/slider/Slider";
import BACKGROUND_IMAGE from "../../img/background.jpg"
import EVENT_IMAGE from "../../img/event.png"
import PageNameHeader from "../../commonComponents/PageNameHeader";
import LOCATION from "../../img/location.png"
import LocationModalWindow from "./components/LocationModalWindow";
import NotFound from "./components/NotFound";
import EventCityAPI from "../../API/internal/categoryes/events/EventCityAPI";

const LoadingWrapper = styled.div`
    color: #333;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    font-size: 26px;
    text-align: center;
`
const Background = styled.div`
    background-image: none;
    background-repeat: repeat;
    background-size: contain;
    @media screen and (max-width: 760px) {
        background-image: ${props => props.image && `url(${props.image})`};
    }
`

const LocationContainer = styled.div`
    padding-left: 15px;
    display: flex;
`

const Location = styled.div`
    display: flex;
    align-items: center;
    background-color: #f1e3d8;
    color: #333333;
    padding: 5px 10px 5px 5px;
    border-radius: 10px;
`

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;

    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
}

export default function EventsPage ({user}) {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState(null);
    const [favoriteEvents, setFavoriteEvents] = useState(null);
    const [city, setCity] = useState(null);
    const [cities, setCities] = useState(null);
    const [sortedEvents, setSortedEvents] = useState(null);
    const [locationModalVisible, setLocationModalVisible] = useState(false);

    useEffect(() => {
        fetchCities();

        async function fetchCities () {
            const responseCities = await EventCityAPI.getAllCities();
            if (responseCities.length === 0) {
                setLoading(false);
                return;
            }
            setCities(responseCities);
            let selectedCity;
            if (user) {
                const filteredCities = responseCities.sort((city1, city2) => {
                    const distance1 = calculateDistance(user.latitude, user.longitude, city1.latitude, city1.longitude);
                    const distance2 = calculateDistance(user.latitude, user.longitude, city2.latitude, city2.longitude);
                    return distance1 - distance2;
                });
                selectedCity = filteredCities[0];
            } else {
                selectedCity = responseCities[0];
            }
            setCity(selectedCity);
        }
    }, []);

    useEffect(() => {
        getEvents()
        async function getEvents () {
            if (city) {
                setLoading(true);
                const response = await EventCityAPI.getEventsByCityId(city.id);
                setEvents(response);
                const favouriteEvents = response.filter(event => event.favorite === true);
                setFavoriteEvents(favouriteEvents);
                setLoading(false);
            }
        }
    }, [city]);
    return (
        <div>
            {
                loading ? <LoadingWrapper><Loading circleColor={"#333"}/></LoadingWrapper> :
                    <Background className={"main"} image={BACKGROUND_IMAGE}>
                        <div style={{backgroundColor: "#333"}}>
                            <PageNameHeader pageName={"Мероприятия"} image={EVENT_IMAGE}></PageNameHeader>
                            {
                                city &&
                                <LocationContainer>
                                    <Location onClick={() => setLocationModalVisible(true)}>
                                        <img alt={"location"} width={"25px"} src={LOCATION}/>
                                        <div>{city.name}</div>
                                    </Location>
                                </LocationContainer>
                            }
                            {
                                favoriteEvents &&
                                favoriteEvents.length > 0 &&
                                <Slider>{favoriteEvents}</Slider>
                            }
                            <SearchPanel events={events} setSortedEvents={setSortedEvents}/>
                        </div>

                        <GridContainer>{!sortedEvents || sortedEvents.length === 0 ?
                            <NotFound/> : sortedEvents.map(event => <EventCard key={event.id} event={event} user={user}/>)}
                        </GridContainer>
                    </Background>
            }
            <LocationModalWindow
                locationModalVisible={locationModalVisible}
                setLocationModalVisible={setLocationModalVisible}
                cities={cities}
                setCity={setCity}
            />
        </div>
    )
}