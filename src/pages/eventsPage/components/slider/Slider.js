import styled from "styled-components";
import {useState} from "react";
import RIGHT_ARROW from "../../../../img/right-arrow.png"
import LEFT_ARROW from "../../../../img/left-arrow.png"
import "../../../../index.css"
import Slide from "./Slide";

const Background = styled.div`
    background-color: #333;
    display: flex;
    position: relative;
    justify-content: center;
    width: 100%;
    height: 350px;
    margin: 15px 0 10px 0;
    @media screen and (max-width: 370px){
        height: 280px;
    }
`

const LeftArrow = styled.div`
    position: absolute;
    bottom: 50%;
    left: 15px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 50%;
    padding: 10px 15px;
    opacity: 60%;
    z-index: 2;
    ${props => props.value === 0 && `display: none`}}
`

const RightArrow = styled.div`
    position: absolute;
    bottom: 50%;
    right: 15px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 50%;
    padding: 10px 15px;
    opacity: 60%;
    z-index: 2;
    ${props => props.value === props.maxValue && `display: none`}}
`

export default function Slider ({children}) {
    const [currentPosition, setCurrentPosition] = useState(0);

    function handleRightClick() {
        if (currentPosition < children.length - 1) {
            setCurrentPosition(currentPosition + 1)
        }
    }

    function handleLeftClick() {
        if (currentPosition > 0) {
            setCurrentPosition(currentPosition - 1)
        }
    }

    return (
        <Background>
                {children.map((event, index) => (
                    <Slide key={event.id} index={index} event={event} currentPosition={currentPosition}/>
                ))}
            <RightArrow onClick={e => handleRightClick()} value={currentPosition} maxValue={children.length - 1}>
                <img width={"15px"} src={RIGHT_ARROW} alt={"Вправо"}/>
            </RightArrow>
            <LeftArrow onClick={e => handleLeftClick()} value={currentPosition}>
                <img width={"15px"} src={LEFT_ARROW} alt={"Влево"}/>
            </LeftArrow>
        </Background>
    )
}