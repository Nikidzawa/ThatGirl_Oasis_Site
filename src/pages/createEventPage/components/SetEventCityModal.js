import styled from "styled-components";
import {useEffect, useState} from "react";
import InternalAPI from "../../../API/InternalAPI";
import DELETE_IMAGE from "../../../img/delete.png"

const ModalWindow = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: ${props => props.active ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    color: #202020;
`

const ModalContent = styled.div`
    padding: 25px;
    background: white;
    border-radius: 16px;
    min-width: 250px;
    min-height: 250px;
`

const EventCitiesContainer = styled.div`
    align-items: center;
    gap: 10px;
    justify-content: center;
    margin: 10px 0 20px;
    overflow-y: auto;
    max-height: 200px;
`

const EventCity = styled.div`
    margin-top: 10px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border: 1px solid black;
    min-height: 60px;
`

const CreateEventCityButton = styled.button`
    border: 1px solid black;
    padding: 10px;
`
const SetEventCityModal = ({modalIsVisible, setModalVisible, setSelectedCity, selectedCity}) => {
    const [cities, setCities] = useState(null);
    const [newEventCityName, setNewEventCityName] = useState(null);
    const [cityExists, setCityExists] = useState(false);
    const [deleteException, setDeleteException] = useState(false);

    useEffect(() => {
        getAllEventCities();
        async function getAllEventCities() {
            const data = await InternalAPI.getAllCities();
            setCities(data);
        }
    }, []);

    async function createEventCity() {
        if (!newEventCityName) {
            return;
        }
        setNewEventCityName("");
        const trimmedEventCity = newEventCityName.trim().toLowerCase();

        const isExistingCity = cities.some(someCity => someCity.name.trim().toLowerCase() === trimmedEventCity);
        if (isExistingCity) {
            setCityExists(true)
            return;
        }

        setCityExists(false)
        const response = await InternalAPI.postEventCity({
            name: newEventCityName
        })
        setCities(prevEventCities => [...prevEventCities, response]);
    }

    function selectCityAndCloseWindow (city) {
        setSelectedCity(city);
        setModalVisible(false);
    }

    async function deleteEventCity(e, city) {
        e.stopPropagation();
        const checkResponse = await InternalAPI.getEventsByCityId(city.id);
        if (checkResponse.length > 0) {
            setDeleteException(true);
            return;
        }

        const deleteResponse = await InternalAPI.deleteEventCityById(city.id);
        if (deleteResponse.ok) {
            setDeleteException(false);
            setCities(cities.filter(event => event.id !== city.id));
            if (selectedCity && selectedCity.id === city.id) {
                setSelectedCity(null);
            }
        }
    }

    return (
        <ModalWindow active={modalIsVisible} onClick={() => setModalVisible(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <h2>Присвоить город</h2>
                <input placeholder={"Поиск"} style={{width: "100%", height: "30px"}}/>
                <div style={{minHeight: "200px"}}>
                    {!cities ? (
                        <div style={{marginTop: "20px"}}>Города не созданы</div>
                    ) : (
                        <EventCitiesContainer>
                            {cities.map((city, index) => (
                                <EventCity onClick={() => selectCityAndCloseWindow(city)} key={index}>
                                    <div style={{marginRight: "auto"}}>{city.name}</div>
                                    <img onClick={(e) => deleteEventCity(e, city)} width={"30px"} src={DELETE_IMAGE}/>
                                </EventCity>
                            ))}
                        </EventCitiesContainer>
                    )}
                </div>
                <h2>Создать тип</h2>
                {
                    cityExists && <p style={{color: "red"}}>Указаный город уже существует</p>
                }
                {
                    deleteException && <p style={{color: "red"}}>Чтобы удалить город, необходимо удалить все мероприятия с этим городом</p>
                }
                <div style={{display: "flex", gap: "10px"}}>
                    <input placeholder={"Имя"} onChange={e => setNewEventCityName(e.target.value)} value={newEventCityName}/>
                    <CreateEventCityButton onClick={createEventCity}>Создать город</CreateEventCityButton>
                </div>
            </ModalContent>
        </ModalWindow>
    );
};

export default SetEventCityModal;