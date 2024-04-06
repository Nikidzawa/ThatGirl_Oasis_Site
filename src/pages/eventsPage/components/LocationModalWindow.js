import styled from "styled-components";
import CLOSE_BUTTON from "../../../img/delete.png"

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
    width: 100%;
    height: 25px;
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
    right: 10px;
    top: 10px;
`

const CityContainer = styled.div`
    padding: 10px 0;
`

export default function LocationModalWindow({locationModalVisible, setLocationModalVisible, cities, setCity}) {

    function handleCity (city) {
        setCity(city);
        setLocationModalVisible(false);
    }

    return (
        <ModalWindow visible={locationModalVisible}>
            <ModalContent>
                <CloseButton onClick={() => setLocationModalVisible(false)} width={"35px"} src={CLOSE_BUTTON}></CloseButton>
                <div>
                    <h2 style={{textAlign: "center"}}>Выбрать город</h2>
                    <Input placeholder={"Поиск..."}/>
                </div>
                <CitiesContainer>
                    {
                        cities ? cities.map(city => <CityContainer onClick={() => handleCity(city)} key={city.id}>{city.name}</CityContainer>) :
                            <div>Города не созданы</div>
                    }
                </CitiesContainer>
            </ModalContent>
        </ModalWindow>
    )
}