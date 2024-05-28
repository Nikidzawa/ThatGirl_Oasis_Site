import CreateEventCard from "./components/CreateEventCard";
import styled from "styled-components";
import React, {useState} from "react";
import Loading from "../../commonComponents/Loading";
import FireBase from "../../API/FireBase";
import PageNameHeader from "../../commonComponents/PageNameHeader";
import CREATE_EVENT_IMAGE from "../../img/addEvent.png"
import SetEventTypeModal from "./components/SetEventTypeModal";
import SetEventCityModal from "./components/SetEventCityModal";
import EventsAPI from "../../API/internal/categoryes/events/EventsAPI";


const Content = styled.div`
    background-color: rgba(0, 0, 0, 0.5);\
    padding-bottom: 30px;
`;

const Images = styled.div`
    display: flex;
    padding-bottom: 5px;
    grid-gap: 10px;
    align-items: center;
    overflow-x: auto;
    white-space: nowrap;
`;

const Img = styled.img`
    width: 70px;
    height: 75px;
`

const InputBlock = styled.div`
    margin: 20px 0 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BasicInput = styled.input`
    width: 90%;
    height: 30px;
    margin-bottom: 20px;
`;

const BigInput = styled.textarea`
    width: 90%;
    min-height: 60px;
    margin-bottom: 20px;
    border-color: ${props => props.active ? 'red' : 'black'};
`;

const Button = styled.button`
    background-color: white;
    width: 150px;
    height: 40px;
    border-radius: 20px;
    border-color: ${props => props.active ? 'red' : 'black'};
`;

const LoadingWrapper = styled.div`
    display: flex;
    padding: 10px;
    justify-content: center;
`

const ErrorMessage = styled.div`
    text-align: center;
    color: red;
    padding: 10px;
`

const FlexInput = styled.div`
    display: flex;
    margin-bottom: 20px;
    gap: 20px;
`
const Block = styled.p`
    text-align: center;
    padding: 10px;
    border-bottom: 1px white solid;
`
const ButtonAndText = styled.div`
    display: flex;
    gap: 20px;
    padding-bottom: 20px;
    align-items: center;
`

const Input = styled.div`
    border-color: ${props => props.active ? 'red' : 'black'};
`

export default function CreateEventPage() {
    const [selectedCity, setSelectedCity] = useState(null);
    const [address, setAddress] = useState(null);
    const [name, setName] = useState(null);
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [rating, setRating] = useState(null);
    const [cost, setCost] = useState(null);
    const [smallDescription, setSmallDescription] = useState(null);
    const [fullDescription, setFullDescription] = useState(null);
    const [contactPhone, setContactPhone] =useState(null)

    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);

    const [handleImage, setHandleImage] = useState(null);
    const [handleImages, setHandleImages] = useState([]);

    const [selectedType, setSelectedType] = useState(null);
    const [favorite, setFavorite] = useState(false);

    const [inputsError, setInputsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [eventCityModalIsVisible, setEventCityModalIsVisible] = useState(false);
    const [eventTypeModalIsVisible, setEventTypeModalIsVisible] = useState(false)


    const [cityValidation, setCityValidation] = useState(false);
    const [addressValidation, setAddressValidation] = useState(false);
    const [nameValidation, setNameValidation] = useState(false);
    const [dateValidation, setDateValidation] = useState(false);
    const [timeValidation, setTimeValidation] = useState(false);
    const [contactPhoneValidation, setContactPhoneValidation] = useState(false);
    const [ratingValidation, setRatingValidation] = useState(false);
    const [costValidation, setCostValidation] = useState(false);
    const [fullDescriptionValidation, setFullDescriptionValidation] = useState(false);
    const [eventTypeValidation, setEventTypeValidation] = useState(false);
    const [mainImageValidation, setMainImageValidation] = useState(false);


    const [exception, setException] = useState(false);
    const [success, setSuccess] = useState(false);

    async function sendData() {
        let eventId;
        let eventObject = {
                city: selectedCity,
                address: address,
                name: name,
                date: date,
                time: time,
                contactPhone: contactPhone,
                rating: rating,
                cost: cost,
                smallDescription: smallDescription,
                fullDescription: fullDescription,
                favorite: favorite,
                eventType: selectedType
        }
        try {
            const response = await EventsAPI.postEvent(eventObject);
            if (response.ok) {
                eventObject = await response.json();
            } else {
                throw new Error(response.status)
            }
            const eventId = eventObject.id;
            const mainImageHref = await FireBase.uploadImage(image, eventId);
            eventObject.mainImage = { href: mainImageHref };

            if (images && images.length > 0) {
                const imagesPromises = images.map(singleImage => FireBase.uploadImage(singleImage, eventId));
                const imagesHrefs = await Promise.all(imagesPromises);
                eventObject.eventImages = images.map((image, index) => ({ href: imagesHrefs[index] }));
            }

            const response2 = await EventsAPI.setImages(eventObject);
            if (response2.ok) {
                setException(false);
                setSuccess(true)
            } else {
                throw new Error(response2.status);
            }
        } catch (error) {
            if (eventId) {
                await FireBase.deleteFolder(eventId);
            }
            setException(true);
            console.error("Ошибка при отправке данных: ", error);
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setHandleImage(reader.result);
            };
            setImage(file)
            reader.readAsDataURL(file);
        }
    };

    const handleImagesChange = (e) => {
        const files = e.target.files;
        const newImages = [];
        const newFiles = [];
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onloadend = () => {
                    newImages.push(reader.result);
                    newFiles.push(file);
                    if (newImages.length === files.length) {
                        setHandleImages(newImages);
                        setImages(newFiles);
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };

    function validation () {
        setLoading(true);
        const regex = /^\d+(\.\d+)?$/;

        if (date === null) {
            setDateValidation(true);
        } else setDateValidation(false);
        if (time === null) {
            setTimeValidation(true);
        } else setTimeValidation(false)
        if (selectedCity === null) {
            setCityValidation(true);
        } else setCityValidation(false);
        if (address === null) {
            setAddressValidation(true);
        } else setAddressValidation(false);
        if (name === null) {
            setNameValidation(true);
        } else setNameValidation(false);
        if (contactPhone === null) {
            setContactPhoneValidation(true);
        } else setContactPhoneValidation(false);
        if (rating === null && regex.test(rating)) {
            setRatingValidation(true);
        } else setRatingValidation(false);
        if (cost === null && regex.test(cost)) {
            setCostValidation(true);
        } else setCostValidation(false);
        if (fullDescription === null) {
            setFullDescriptionValidation(true);
        } else setFullDescriptionValidation(false);
        if (selectedType === null) {
            setEventTypeValidation(true);
        } else setEventTypeValidation(false);
        if (image === null) {
            setMainImageValidation(true);
        } else setMainImageValidation(false);

        if (dateValidation || timeValidation || cityValidation || addressValidation || nameValidation || contactPhoneValidation || ratingValidation || costValidation || fullDescriptionValidation || eventTypeValidation || mainImageValidation) {
            setInputsError(true);
        } else {
            setInputsError(false);
            sendData();
        }
        setLoading(false);
    }

    return (
        <Content className={"main"}>
            <PageNameHeader padding={"20px"} image={CREATE_EVENT_IMAGE} pageName={"Создать мероприятие"}/>
            <InputBlock>
                <Block>Геолокация</Block>
                <ButtonAndText>
                    <Button active={cityValidation}
                            onClick={() => setEventCityModalIsVisible(true)}>*Выбрать город</Button>
                    {
                        selectedCity ? selectedCity.name : <div>Город не задан</div>
                    }
                </ButtonAndText>
                <BasicInput active={addressValidation} onChange={e => setAddress(e.target.value)} placeholder={"*Адрес"}/>
                <Block>*Дата и время (МСК)</Block>
                <FlexInput>
                    <Input active={dateValidation} onChange={e => setDate(e.target.value)} type="date" id="datePicker"/>
                    <Input active={timeValidation} onChange={e => setTime(e.target.value)} type="time" id="timePicker"/>
                </FlexInput>
                <Block>Основная информация</Block>
                <BasicInput active={nameValidation} onChange={e => setName(e.target.value)} placeholder={"*Название"}/>
                <ButtonAndText>
                    <Button active={eventTypeValidation}
                            onClick={() => setEventTypeModalIsVisible(true)}>*Выбрать тип мероприятия</Button>
                    {
                        selectedType ? <div>Тип мероприятия: {selectedType.name}</div> : <div>Тип мероприятия не выбран</div>
                    }
                </ButtonAndText>
                <BigInput onChange={e => setSmallDescription(e.target.value)} placeholder={"Краткое описание"}/>
                <BigInput active={fullDescriptionValidation} onChange={e => setFullDescription(e.target.value)} placeholder={"*Развёрнутое описание"}/>
                <BasicInput active={contactPhoneValidation} onChange={e => setContactPhone(e.target.value)} placeholder={"*Контактный номер телефона"}/>
                <FlexInput>
                    <BasicInput active={ratingValidation} onChange={e => setRating(e.target.value)} placeholder={"*Рейтинг (нап. 4.7)"}/>
                    <BasicInput active={costValidation} onChange={e => setCost(e.target.value)} placeholder={"*Цена"}/>
                </FlexInput>
                <label>
                    <input
                    type={"checkbox"}
                    checked={favorite}
                    onChange={() => setFavorite(!favorite)}
                    />
                    Дополнительно поместить в слайдер
                </label>
                <Block>Главная картинка</Block>
                <Input active={mainImageValidation} type="file" onChange={handleImageChange} accept="image/*"></Input>
            </InputBlock>
            <div style={{display: "flex", justifyContent: "center"}}>
                <CreateEventCard name={name}
                                 cost={cost}
                                 address={address}
                                 rating={rating}
                                 smallDescription={smallDescription}
                                 date={date}
                                 image={handleImage}
                                 type={selectedType}
                />
            </div>
            {
                inputsError &&
                <ErrorMessage>Проверьте, что все поля заполнены, а рейтинг и цена являются цифрами</ErrorMessage>
            }
            <Block>Второстепенные картинки</Block>
            <input style={{marginBottom: "20px"}} type="file" onChange={handleImagesChange} name="photos" id="photos" multiple/>
            {
                handleImages &&
                <Images>
                    {
                        handleImages.map(image => <Img key={image.id} src={image}/>)
                    }
                </Images>
            }
            <div style={{textAlign: "center", marginTop: "20px"}}>
                {
                    exception && <div style={{color: "red", padding: "10px"}}>Неизвестная ошибка, возможно проболема с облаком</div>
                }
                {
                    success && <div style={{color: "greenyellow", padding: "10px"}}>Успешно создано</div>
                }
                {loading ? <LoadingWrapper><Loading/></LoadingWrapper> : <Button onClick={validation}>Создать</Button>}
            </div>
            <SetEventCityModal modalIsVisible={eventCityModalIsVisible} setModalVisible={setEventCityModalIsVisible} selectedCity={selectedCity} setSelectedCity={setSelectedCity}></SetEventCityModal>
            <SetEventTypeModal modalIsVisible={eventTypeModalIsVisible} setModalVisible={setEventTypeModalIsVisible} setSelectedType={setSelectedType} selectedType={selectedType}></SetEventTypeModal>
        </Content>
    );
}