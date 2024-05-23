import styled from "styled-components";
import CLOSE_BUTTON from "../../../img/delete.png"
import React, {useEffect, useState} from "react";

const ModalWindow = styled.div`
    z-index: 2;
    position: fixed;
    display: ${props => (props.visible ? "block" : "none")};
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    color: #202020;
`

const ModalContent = styled.div`
    margin: 0 auto;
    max-width: 600px;
    position: fixed;
    top: 20%;
    right: 10px;
    left: 10px;
    padding: 25px;
    background-color: #f1e3d8;
    border-radius: 16px;
    min-height: 350px;
`

const Input = styled.input`
    width: 95%;
    padding: 5px;
    background-color: #f1e3d8;
    border-radius: 10px;
    font-size: 18px;
`

const CitiesContainer = styled.div`
    padding-top: 10px;
    max-height: 220px;
    width: 100%;
    overflow-y: auto;
`

const CloseButton = styled.img`
    position: absolute;
    cursor: pointer;
    right: 10px;
    top: 10px;
`

const CityContainer = styled.div`
    padding: 10px 0;
    cursor: pointer;
`

export default function LocationModalWindow({ locationModalVisible, setLocationModalVisible, cities, setCity }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCities, setFilteredCities] = useState([])
    function handleChangeCity(city) {
        setCity(city);
        setLocationModalVisible(false);
    }

    useEffect(() => {
        if (cities) {
            setFilteredCities(cities.filter(city =>
                city.name.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        }
    }, [searchQuery, cities])

    return (
        <ModalWindow visible={locationModalVisible}>
            <ModalContent>
                <CloseButton onClick={() => setLocationModalVisible(false)} width={"35px"}
                             src={CLOSE_BUTTON}></CloseButton>
                <h2 style={{ textAlign: "center" }}>Выбрать город</h2>
                <Input placeholder={"Поиск..."} onChange={e => setSearchQuery(e.target.value)} value={searchQuery} />
                <CitiesContainer>
                    {filteredCities.length > 0 ? (
                        filteredCities.map(city => (
                            <CityContainer onClick={() => handleChangeCity(city)} key={city.id}>{city.name}</CityContainer>
                        ))
                    ) : (
                        <div>Ничего не найдено</div>
                    )}
                </CitiesContainer>
            </ModalContent>
        </ModalWindow>
    );
}