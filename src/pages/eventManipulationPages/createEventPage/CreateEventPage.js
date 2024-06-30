import CreateEventCard from "../components/CreateEventCard";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import Loading from "../../../commonComponents/Loading";
import FireBase from "../../../API/FireBase";
import PageNameHeader from "../../../commonComponents/PageNameHeader";
import CREATE_EVENT_IMAGE from "../../../img/addEvent.png"
import SetEventTypeModal from "../components/SetEventTypeModal";
import SetEventCityModal from "../components/SetEventCityModal";
import EventsAPI from "../../../API/internal/categoryes/events/EventsAPI";


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
    border: 1px solid ${props => props.active ? 'red' : 'black'};
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
    border: ${props => props.active ? '1px solid red' : 'none'};;
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

const base64ToFile = (base64String, fileName) => {
    const arr = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
};

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
    const [selectedType, setSelectedType] = useState(null);
    const [favorite, setFavorite] = useState(false);

    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);

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

    const [exception, setException] = useState("");
    const [success, setSuccess] = useState(false);

    const [cashedEvent, setCashedEvent] = useState()

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
            if (!response.ok) {
                const responseJson = await response.json();
                throw new Error(`Ошибка при сохарнении мероприятия: ${response.status} - ${responseJson.message}`);
            }

            eventObject = await response.json();
            eventId = eventObject.id;

            try {
                await FireBase.deleteFolder(eventId);
            } catch (firebaseError) {
                console.error("Ошибка при удалении папки в Firebase: ", firebaseError);
                throw firebaseError;
            }

            try {
                const mainImageHref = await FireBase.uploadImage(base64ToFile(image, `mainImage${eventId}`), eventId);
                eventObject.mainImage = { href: mainImageHref };
            } catch (firebaseError) {
                console.error("Ошибка при загрузке главного изображения: ", firebaseError);
                throw firebaseError;
            }

            if (images && images.length > 0) {
                try {
                    const imagesPromises = images.map((singleImage, index) =>
                        FireBase.uploadImage(base64ToFile(singleImage, `otherImage${eventId}:${index}`), eventId)
                    );
                    const imagesHrefs = await Promise.all(imagesPromises);
                    eventObject.eventImages = images.map((image, index) => ({ href: imagesHrefs[index] }));
                } catch (firebaseError) {
                    console.error("Ошибка при загрузке дополнительных изображений: ", firebaseError);
                    throw firebaseError;
                }
            }

            const response2 = await EventsAPI.setImages(eventObject);
            if (!response2.ok) {
                const responseJson = await response.json();
                throw new Error(`Ошибка при сохранении изображения: ${response2.status} - ${responseJson.message}`);
            }

            setSuccess(true);

        } catch (error) {
            if (eventId) {
                try {
                    await FireBase.deleteFolder(eventId);
                } catch (firebaseError) {
                    console.error("Ошибка при повторном удалении папки в Firebase: ", firebaseError);
                }
            }
            setException(error);
            console.error("Ошибка при отправке данных: ", error);
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImagesChange = (e) => {
        const files = e.target.files;
        const newImages = [];
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onloadend = () => {
                    newImages.push(reader.result);
                    if (newImages.length === files.length) {
                        setImages(newImages);
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };

    async function createEvent () {
        setLoading(true);
        setSuccess(false);
        setException("");
        setInputsError(false);
        if (validation()) {
            await sendData();
        }
        setLoading(false);
    }

    function validation() {
        const regex = /^\d+(\.\d+)?$/;

        let isDateValid = !!date;
        let isTimeValid = !!time;
        let isCityValid = !!selectedCity;
        let isAddressValid = !!address;
        let isNameValid = !!name;
        let isContactPhoneValid = !!contactPhone;
        let isRatingValid = rating && regex.test(rating);
        let isCostValid = cost && regex.test(cost);
        let isFullDescriptionValid = !!fullDescription;
        let isEventTypeValid = !!selectedType;
        let isMainImageValid = !!image;

        setDateValidation(!isDateValid);
        setTimeValidation(!isTimeValid);
        setCityValidation(!isCityValid);
        setAddressValidation(!isAddressValid);
        setNameValidation(!isNameValid);
        setContactPhoneValidation(!isContactPhoneValid);
        setRatingValidation(!isRatingValid);
        setCostValidation(!isCostValid);
        setFullDescriptionValidation(!isFullDescriptionValid);
        setEventTypeValidation(!isEventTypeValid);
        setMainImageValidation(!isMainImageValid);
        if (
            isDateValid && isTimeValid && isCityValid && isAddressValid &&
            isNameValid && isContactPhoneValid && isRatingValid &&
            isCostValid && isFullDescriptionValid && isEventTypeValid && isMainImageValid
        )
        {
            return true;
        } else {
            setInputsError(true);
            return false;
        }

    }

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("cachedEvent"))
        if (!data) {
            data = {
                selectedCity: selectedCity,
                selectedType: selectedType,
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
                image: image,
                images: images
            };
            localStorage.setItem("cachedEvent", JSON.stringify(data))
        }
        setCashedEvent(data)
        setDate(data.date)
        setTime(data.time)
        setName(data.name)
        setRating(data.rating)
        setCost(data.cost)
        setAddress(data.address)
        setSelectedType(data.selectedType)
        setSelectedCity(data.selectedCity)
        setContactPhone(data.contactPhone)
        setSmallDescription(data.smallDescription)
        setFullDescription(data.fullDescription)
        setFavorite(data.favorite)
        setImage(data.image)
        setImages(data.images)
    }, [])

    useEffect(() => {
        if (success) {
            localStorage.removeItem("cachedEvent")
        }
    }, [success])

    const updateCachedEvent = (key, value) => {
        setCashedEvent(prev => {
            const updated = { ...prev, [key]: value };
            localStorage.setItem("cachedEvent", JSON.stringify(updated));
            return updated;
        });
    };

    useEffect(() => {
        updateCachedEvent("date", date);
    }, [date]);

    useEffect(() => {
        updateCachedEvent("time", time);
    }, [time]);

    useEffect(() => {
        updateCachedEvent("name", name);
    }, [name]);

    useEffect(() => {
        updateCachedEvent("favorite", favorite);
    }, [favorite]);

    useEffect(() => {
        updateCachedEvent("rating", rating);
    }, [rating]);

    useEffect(() => {
        updateCachedEvent("cost", cost);
    }, [cost]);

    useEffect(() => {
        updateCachedEvent("address", address);
    }, [address]);

    useEffect(() => {
        updateCachedEvent("selectedType", selectedType);
    }, [selectedType]);

    useEffect(() => {
        updateCachedEvent("selectedCity", selectedCity);
    }, [selectedCity]);

    useEffect(() => {
        updateCachedEvent("contactPhone", contactPhone);
    }, [contactPhone]);

    useEffect(() => {
        updateCachedEvent("fullDescription", fullDescription);
    }, [fullDescription]);

    useEffect(() => {
        updateCachedEvent("smallDescription", smallDescription);
    }, [smallDescription]);
    useEffect(() => {
        updateCachedEvent("image", image)
    }, [image]);
    useEffect(() => {
        updateCachedEvent("images", images)
    }, [images]);
    return (
        <Content className={"main"}>
            <PageNameHeader padding={"20px"} image={CREATE_EVENT_IMAGE} pageName={"Создать мероприятие"}/>
            <InputBlock>
                <Block>Геолокация</Block>
                <ButtonAndText>
                    <Button onClick={() => setEventCityModalIsVisible(true)} active={cityValidation}>*Выбрать город</Button>
                    {
                        selectedCity ? selectedCity.name : <div>Город не задан</div>
                    }
                </ButtonAndText>
                <BasicInput value={address} active={addressValidation} onChange={e => setAddress(e.target.value)} placeholder={"*Адрес"}/>
                <Block>*Дата и время (МСК)</Block>
                <FlexInput>
                    {
                        dateValidation ? <input value={date} style={{borderColor: "red"}} onChange={e => setDate(e.target.value)} type="date" id="datePicker"/> :
                            <input value={date} onChange={e => setDate(e.target.value)} type="date" id="datePicker"/>
                    }
                    {
                        timeValidation ? <input value={time} style={{borderColor: "red"}} onChange={e => setTime(e.target.value)} type="time" id="timePicker"/> :
                            <input value={time} onChange={e => setTime(e.target.value)} type="time" id="timePicker"/>
                    }
                </FlexInput>
                <Block>Основная информация</Block>
                <BasicInput active={nameValidation}
                            onChange={e => setName(e.target.value)}
                            value={name}
                            placeholder={"*Название"}/>
                <ButtonAndText>
                    <Button onClick={() => setEventTypeModalIsVisible(true)}
                            active={eventTypeValidation}>*Выбрать тип мероприятия</Button>
                    {
                        selectedType ? <div>Тип мероприятия: {selectedType.name}</div> : <div>Тип мероприятия не выбран</div>
                    }
                </ButtonAndText>
                <BigInput value={smallDescription} onChange={e => setSmallDescription(e.target.value)} placeholder={"Краткое описание"}/>
                <BigInput value={fullDescription} active={fullDescriptionValidation} onChange={e => setFullDescription(e.target.value)} placeholder={"*Развёрнутое описание"}/>
                <BasicInput value={contactPhone} active={contactPhoneValidation} onChange={e => setContactPhone(e.target.value)} placeholder={"*Контактный номер телефона"}/>
                <FlexInput>
                    <BasicInput value={rating} active={ratingValidation} onChange={e => setRating(e.target.value)} placeholder={"*Рейтинг (нап. 4.7)"}/>
                    <BasicInput value={cost} active={costValidation} onChange={e => setCost(e.target.value)} placeholder={"*Цена"}/>
                </FlexInput>
                <label>
                    <input
                    type={"checkbox"}
                    checked={favorite}
                    onChange={() => setFavorite(!favorite)}
                    value={favorite}
                    />
                    Дополнительно поместить в слайдер
                </label>
                <Block>Главная картинка</Block>
                {
                    mainImageValidation ?
                        <input style={{border: "1px solid red"}} type="file" onChange={handleImageChange} accept="image/*"></input> :
                        <input type="file" onChange={handleImageChange} accept="image/*"></input>
                }
            </InputBlock>
            <div style={{display: "flex", justifyContent: "center"}}>
                <CreateEventCard name={name}
                                 cost={cost}
                                 address={address}
                                 rating={rating}
                                 smallDescription={smallDescription}
                                 date={date}
                                 image={image}
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
                images &&
                <Images>
                    {
                        images.map(image => <Img key={image.id} src={image}/>)
                    }
                </Images>
            }
            <div style={{textAlign: "center", marginTop: "20px"}}>
                {
                    exception && <div style={{color: "red", padding: "10px"}}>Ошибка сервера: {exception}</div>
                }
                {
                    success && <div style={{color: "greenyellow", padding: "10px"}}>Успешно создано</div>
                }
                {
                    loading ? <LoadingWrapper><Loading/></LoadingWrapper> :
                        <Button onClick={createEvent}>Создать</Button>
                }
            </div>
            <SetEventCityModal modalIsVisible={eventCityModalIsVisible} setModalVisible={setEventCityModalIsVisible} selectedCity={selectedCity} setSelectedCity={setSelectedCity}></SetEventCityModal>
            <SetEventTypeModal modalIsVisible={eventTypeModalIsVisible} setModalVisible={setEventTypeModalIsVisible} setSelectedType={setSelectedType} selectedType={selectedType}></SetEventTypeModal>
        </Content>
    );
}