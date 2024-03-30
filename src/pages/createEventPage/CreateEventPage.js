import CreateEventCard from "./components/CreateEventCard";
import styled from "styled-components";
import React, {useState} from "react";
import Loading from "../../commonComponents/Loading";
import ExternalAPI from "../../API/ExternalAPI";
import InternalAPI from "../../API/InternalAPI";
import InteractiveMap from "../../commonComponents/Map";


const Content = styled.div`
    display: flex;
    padding-bottom: 80px;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

const H1 = styled.h1`
    text-align: center;
`;

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
    margin-top: 20px;
    border-radius: 20px;
`;
const LocationButton = styled.button`
    background-color: white;
    width: 180px;
    height: 50px;
    border-radius: 20px;
    margin: 0 0 20px 0;
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
export default function CreateEventPage({ user }) {
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState(null)
    const [time, setTime] = useState("")
    const [rating, setRating] = useState("");
    const [cost, setCost] = useState("");
    const [smallDescription, setSmallDescription] = useState("");
    const [fullDescription, setFullDescription] = useState("");
    const [image, setImage] = useState(null);
    const [lon, setLon] = useState(null);
    const [lat, setLat] = useState(null)

    const [inputsError, setInputsError] = useState(false);
    const [geocodingError, setGeocodingError] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [loading, setLoading] = useState(false);

    async function sendData() {
        setLoading(true);
        const regex = /^\d+(\.\d+)?$/;
        if (city && address && name && date && time && smallDescription && regex.test(rating) && regex.test(cost) && fullDescription && image) {
            setInputsError(false);
            try {
                await checkLocation();
                await InternalAPI.postEvent({
                    city: city,
                    address: address,
                    name: name,
                    date: date,
                    time: time,
                    rating: rating,
                    cost: cost,
                    lon: lon,
                    lat: lat,
                    smallDescription: smallDescription,
                    fullDescription: fullDescription,
                    image: "https://mykaleidoscope.ru/x/uploads/posts/2022-10/1666788313_65-mykaleidoscope-ru-p-kapkeiki-dekor-vkontakte-68.jpg"
                });
            } catch (error) {
                console.error("Ошибка при отправке данных:", error);
            }
        } else {
            setInputsError(true);
        }
        setLoading(false);
    }
    async function checkLocation() {
        const data = await ExternalAPI.getGeocode(city, address);
        if (data.response.GeoObjectCollection.featureMember.length > 0) {
            const firstObject = data.response.GeoObjectCollection.featureMember[0].GeoObject;
            const coordinates = firstObject.Point.pos.split(' ');

            const lon = coordinates[0];
            const lat = coordinates[1];

            setLon(Number.parseFloat(lon));
            setLat(Number.parseFloat(lat));
            setShowMap(true);
            setGeocodingError(false);
        } else {
            setShowMap(false);
            setGeocodingError(true);
            throw new Error("Геокодирование не удалось");
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

    return (
        <Content>
            <div>
                <H1>Создать мероприятие</H1>
                <InputBlock>
                    <Block>Геолокация</Block>
                    <BasicInput onChange={e => setCity(e.target.value)} placeholder={"Город"}/>
                    <BasicInput onChange={e => setAddress(e.target.value)} placeholder={"Улица, дом"}/>
                    {
                        geocodingError &&
                        <ErrorMessage>Ошибка геокодирования - не удалось определить долготу и широту объекта.
                            Проверьте поля адреса, города и попробуйте снова.
                            Можете дополнительно свериться с https://www.openstreetmap.org</ErrorMessage>
                    }
                    {
                        showMap &&
                        <div style={{height: "250px"}}>
                            <InteractiveMap lat={lat} lon={lon}/>
                        </div>
                    }
                    <div style={{textAlign: "center"}}>
                        <LocationButton onClick={checkLocation}>Проверить местоположение</LocationButton>
                    </div>

                    <Block>Дата и время (МСК)</Block>
                    <FlexInput>
                        <input onChange={e => setDate(e.target.value)} type="date" id="datePicker"/>
                        <input onChange={e => setTime(e.target.value)} type="time" id="timePicker"/>
                    </FlexInput>

                    <Block>Основная информация</Block>
                    <BasicInput onChange={e => setName(e.target.value)} placeholder={"Название"}/>
                    <BigInput onChange={e => setSmallDescription(e.target.value)} placeholder={"Краткое описание"}/>
                    <BigInput onChange={e => setFullDescription(e.target.value)} placeholder={"Развёрнутое описание"}/>
                    <FlexInput>
                        <BasicInput onChange={e => setRating(e.target.value)} placeholder={"Рейтинг (нап. 4.7)"}/>
                        <BasicInput onChange={e => setCost(e.target.value)} placeholder={"Цена"}/>
                    </FlexInput>

                    <Block>Картинка</Block>
                    <input type="file" onChange={handleImageChange} accept="image/*"></input>
                </InputBlock>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <CreateEventCard name={name} city={city} cost={cost} address={address} rating={rating}
                                     smallDescription={smallDescription} date={date} image={image}/>
                </div>

                {
                    inputsError &&
                    <ErrorMessage>Проверьте, что все поля заполнены, а рейтинг и цена являются цифрами</ErrorMessage>
                }
                <div onClick={sendData} style={{textAlign: "center"}}>
                    {loading ? <LoadingWrapper><Loading/></LoadingWrapper> : <Button>Создать</Button>}
                </div>
            </div>
        </Content>
    );
}