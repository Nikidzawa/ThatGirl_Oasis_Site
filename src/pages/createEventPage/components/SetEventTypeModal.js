import styled from "styled-components";
import {useEffect, useState} from "react";
import DELETE_IMAGE from "../../../img/delete.png"
import EventTypesAPI from "../../../API/internal/categoryes/events/EventTypesAPI";

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

const EventTypesContainer = styled.div`
    align-items: center;
    gap: 10px;
    justify-content: center;
    margin: 10px 0 20px;
    overflow-y: auto;
    max-height: 200px;
`

const EventType = styled.div`
    margin-top: 10px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border: 1px solid black;
    min-height: 60px;
`

const CreateEventTypeButton = styled.button`
    border: 1px solid black;
    padding: 10px;
`
const SetEventTypeModal = ({modalIsVisible, setModalVisible, setSelectedType, selectedType}) => {
    const [eventTypes, setEventTypes] = useState(null);
    const [newEventTypeName, setNewEventTypeName] = useState(null);
    const [typeExists, setTypeExists] = useState(false);
    const [deleteException, setDeleteException] = useState(false);

    useEffect(() => {
        getAllEventTypes();
        async function getAllEventTypes() {
            const data = await EventTypesAPI.getAllEventTypes();
            setEventTypes(data);
        }
    }, []);

    async function createEventType() {
        if (!newEventTypeName) {
            return;
        }
        setNewEventTypeName("");
        const fixedEventType = newEventTypeName.trim().toLowerCase();

        const isExistingType = eventTypes.some(someType => someType.name.trim().toLowerCase() === fixedEventType);
        if (isExistingType) {
            setTypeExists(true)
            return;
        }

        setTypeExists(false)
        const responseEventType = await EventTypesAPI.postEventType({
            name: newEventTypeName
        })
        setEventTypes(prevEventTypes => [...prevEventTypes, responseEventType]);
    }

    function selectTypeAndCloseWindow (type) {
        setSelectedType(type);
        setModalVisible(false);
    }

    async function deleteEventType(e, type) {
        e.stopPropagation();
        const checkResponse = await EventTypesAPI.getEventsByType(type.id);
        if (checkResponse.length > 0) {
            setDeleteException(true);
            return;
        }

        const deleteResponse = await EventTypesAPI.deleteEventTypeById(type.id);
        if (deleteResponse.ok) {
            setDeleteException(false);
            setEventTypes(eventTypes.filter(event => event.id !== type.id));
            if (selectedType && selectedType.id === type.id) {
                setSelectedType(null);
            }
        }
    }

    return (
        <ModalWindow active={modalIsVisible} onClick={() => setModalVisible(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <h2>Присвоить тип</h2>
                <input placeholder={"Поиск"} style={{width: "100%", height: "30px"}}/>
                <div style={{minHeight: "200px"}}>
                    {!eventTypes ? (
                        <div style={{marginTop: "20px"}}>Типы не созданы</div>
                    ) : (
                        <EventTypesContainer>
                            {eventTypes.map((type, index) => (
                                <EventType onClick={() => selectTypeAndCloseWindow(type)} key={index}>
                                    <div style={{marginRight: "auto"}}>{type.name}</div>
                                    <img onClick={(e) => deleteEventType(e, type)} width={"30px"} src={DELETE_IMAGE}/>
                                </EventType>
                            ))}
                        </EventTypesContainer>
                    )}
                </div>
                <h2>Создать тип</h2>
                {
                   typeExists && <p style={{color: "red"}}>Указаный тип уже существует</p>
                }
                {
                    deleteException && <p style={{color: "red"}}>Чтобы удалить тип, необходимо удалить все мероприятия с эти типом</p>
                }
                <div style={{display: "flex", gap: "10px"}}>
                    <input placeholder={"Имя"} onChange={e => setNewEventTypeName(e.target.value)} value={newEventTypeName}/>
                    <CreateEventTypeButton onClick={createEventType}>Создать тип</CreateEventTypeButton>
                </div>
            </ModalContent>
        </ModalWindow>
    );
};

export default SetEventTypeModal;