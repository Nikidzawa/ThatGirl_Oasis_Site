import styled from "styled-components";
import PLUS from "../../../img/plus.png"
import MINUS from "../../../img/minus.png"
import BUCKET from "../../../img/bucket.png"
import {useNavigate} from "react-router-dom";

const Background = styled.div`
    height: 80px;
    background-color: #333333;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    align-items: center;
`

const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`
const Title = styled.div`
    font-size: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: absolute;
    left: 0;
    right: 40px;
`;

const PriceAndCountContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 6px;
`
const Text = styled.div`
    font-size: 20px;
`
const UpperRow = styled.div`
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
`


export default function EventCart ({setEventCarts, eventCarts, eventCart, setFinalCost, finalCost}) {
    const navigate = useNavigate()
    async function plusCount () {
        const count = Number.parseInt(eventCart.count) + 1;
        if (count < 100) {
            eventCart.count=count;
            setFinalCost(finalCost + eventCart.cost)
            await updateLocalStorageData();
        }
    }

    async function minusCount() {
        const count = Number.parseInt(eventCart.count) - 1;
        if (count === 0) {
            await deleteEvent()
        } else {
            eventCart.count=count;
            setFinalCost(finalCost - eventCart.cost);
            await updateLocalStorageData();
        }
    }

    async function deleteEvent() {
        const updatedCartEvents = eventCarts.filter(otherEventCart => otherEventCart.id !== eventCart.id);
        setEventCarts(updatedCartEvents);
        localStorage.setItem("cartEvents", JSON.stringify(updatedCartEvents));
    }

    async function updateLocalStorageData() {
        localStorage.setItem("cartEvents", JSON.stringify(eventCarts));
    }

    return (
        <Background>
            <img alt={"картинка"} onClick={() => navigate(`/events/${eventCart.id}`)} width={"75px"} height={"65px"} src={eventCart.mainImage.href}/>
            {
                <div style={{marginLeft: "10px", flex: "1"}}>
                    <UpperRow>
                        <Title>{eventCart.name}</Title>
                        <img alt={"удалить"} onClick={deleteEvent} style={{marginLeft: "auto"}} width={"30px"} src={BUCKET}/>
                    </UpperRow>
                    <PriceAndCountContainer>
                        <ButtonsContainer>
                            <img alt={"увеличить"} onClick={plusCount} width={"35px"} src={PLUS}/>
                            <Text>{eventCart.count}</Text>
                            <img alt={"уменьшить"} onClick={minusCount} width={"35px"} src={MINUS}/>
                        </ButtonsContainer>
                        <Text>{eventCart.cost}₽</Text>
                    </PriceAndCountContainer>
                </div>
            }
        </Background>
    )
}