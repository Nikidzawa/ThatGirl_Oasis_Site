import CreateEventCard from "./components/CreateEventCard";
import styled from "styled-components";
import React, {useState} from "react";
import Loading from "../../commonComponents/Loading";
import FireBase from "../../API/FireBase";
import InternalAPI from "../../API/InternalAPI";
import PageNameHeader from "../../commonComponents/PageNameHeader";
import CREATE_EVENT_IMAGE from "../../img/addEvent.png"
import SetEventTypeModal from "./components/SetEventTypeModal";
import SetEventCityModal from "./components/SetEventCityModal";


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
`;

const Button = styled.button`
    background-color: white;
    width: 150px;
    height: 40px;
    border-radius: 20px;
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
export default function CreateEventPage() {
    const [selectedCity, setSelectedCity] = useState(null);
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState(null)
    const [time, setTime] = useState("")
    const [rating, setRating] = useState("");
    const [cost, setCost] = useState("");
    const [smallDescription, setSmallDescription] = useState("");
    const [fullDescription, setFullDescription] = useState("");

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


    const [exception, setException] = useState(false);
    const [success, setSuccess] = useState(false);

    async function sendData() {
        setLoading(true);
        const regex = /^\d+(\.\d+)?$/;
        if (selectedCity && address && name && date && time && regex.test(rating) && regex.test(cost) && fullDescription && handleImage && selectedType) {
            setInputsError(false);
            let eventId;
            let eventObject = {
                city: selectedCity,
                address: address,
                name: name,
                date: date,
                time: time,
                rating: rating,
                cost: cost,
                smallDescription: smallDescription,
                fullDescription: fullDescription,
                favorite: favorite,
                eventType: selectedType
            }
            try {
                const response = await InternalAPI.postEvent(eventObject);
                if (response.ok) {
                    eventObject = await response.json();
                } else {
                    throw new Error(response.status)
                }

                const mainImageHref = await FireBase.uploadImage(image, eventId);
                eventObject.mainImage = { href: mainImageHref };

                if (images && images.length > 0) {
                    const imagesPromises = images.map(image => FireBase.uploadImage(image, eventId));
                    const imagesHrefs = await Promise.all(imagesPromises);
                    eventObject.eventImages = images.map((image, index) => ({ href: imagesHrefs[index] }));
                }

                const response2 = await InternalAPI.setImages(eventObject);
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
        } else {
            setInputsError(true);
        }
        setLoading(false);
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

    return (
        <Content>
            <PageNameHeader image={CREATE_EVENT_IMAGE} pageName={"Создать мероприятие"}/>
            <InputBlock>
                <Block>Геолокация</Block>
                <ButtonAndText>
                    <Button onClick={() => setEventCityModalIsVisible(true)}>Выбрать город</Button>
                    {
                        selectedCity ? selectedCity.name : <div>Город не задан</div>
                    }
                </ButtonAndText>
                <BasicInput onChange={e => setAddress(e.target.value)} placeholder={"Адрес"}/>
                <Block>Дата и время (МСК)</Block>
                <FlexInput>
                    <input onChange={e => setDate(e.target.value)} type="date" id="datePicker"/>
                    <input onChange={e => setTime(e.target.value)} type="time" id="timePicker"/>
                </FlexInput>

                <Block>Основная информация</Block>
                <BasicInput onChange={e => setName(e.target.value)} placeholder={"Название"}/>
                <BigInput onChange={e => setSmallDescription(e.target.value)} placeholder={"Краткое описание"}/>
                <BigInput onChange={e => setFullDescription(e.target.value)} placeholder={"Развёрнутое описание"}/>
                <ButtonAndText onClick={() => setEventTypeModalIsVisible(true)}>
                    <Button>Выбрать тип мероприятия</Button>
                    {
                        selectedType ? <div>Тип мероприятия: {selectedType.name}</div> :
                            <div>Тип мероприятия не выбран</div>
                    }
                </ButtonAndText>
                <FlexInput>
                    <BasicInput onChange={e => setRating(e.target.value)} placeholder={"Рейтинг (нап. 4.7)"}/>
                    <BasicInput onChange={e => setCost(e.target.value)} placeholder={"Цена"}/>
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
                <input type="file" onChange={handleImageChange} accept="image/*"></input>
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
                    exception && <div style={{color: "red"}}>Неизвестная ошибка, возможно проболема с облаком</div>
                }
                {
                    success && <div style={{color: "green"}}>Успешно создано</div>
                }
                {loading ? <LoadingWrapper><Loading/></LoadingWrapper> : <Button onClick={sendData}>Создать</Button>}
            </div>
            <SetEventCityModal modalIsVisible={eventCityModalIsVisible} setModalVisible={setEventCityModalIsVisible} selectedCity={selectedCity} setSelectedCity={setSelectedCity}></SetEventCityModal>
            <SetEventTypeModal modalIsVisible={eventTypeModalIsVisible} setModalVisible={setEventTypeModalIsVisible} setSelectedType={setSelectedType} selectedType={selectedType}></SetEventTypeModal>
        </Content>
    );
}