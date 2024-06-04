import styled from "styled-components";
import LOGO from "../../../img/logo.png"
import {useState} from "react";
import InputMask from 'react-input-mask';

const ModalWindowBackground = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    background: rgba(0, 0, 0, 0.75);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`
const ModalWindowContent = styled.div`
    height: 360px;
    width: 80%;
    background-color: #eeded2;
    border-radius: 20px;
    padding: 20px;
    text-align: center;
    color: black;
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    width: 30px;
    height: 60px;
    border: none;
    background-color: #eeded2;
    border-bottom: 2px solid green;
    color: black;
    font-size: 23px;
    text-align: center;
`
const InputsDiv = styled.div`
    margin-top: 30px;
    justify-content: center;
    display: flex;
    gap: 10px;
`

export default function ModalWindow ({mail}) {
    const [firstInput, setFirstInput] = useState("");
    const [secondInput, setSecondInput] = useState("");
    const [thirdInput, setThirdInput] = useState("");
    const [fourthInput, setFourthInput] = useState("")

    function handleFirstInput(e) {
        setFirstInput(e.target.value)
    }

    function handleSecondInput(e) {
        setSecondInput(e.target.value)
    }

    function handleThirdInput(e) {
        setThirdInput(e.target.value)
    }

    function handleFourthInput(e) {
        setFourthInput(e.target.value)
    }

    return (
        <ModalWindowBackground>
            <ModalWindowContent>
                <div>
                    <img src={LOGO} width={"120px"}/>
                    <h4>На почту {mail} было отправлено письмо с кодом подтверждения</h4>
                </div>
                <InputsDiv>
                    <Input value={firstInput} onChange={e => handleFirstInput(e)} maxLength="1"/>
                    <Input value={secondInput} onChange={e => handleSecondInput(e)} maxLength="1"/>
                    <Input value={thirdInput} onChange={e => handleThirdInput(e)} maxLength="1"/>
                    <Input value={fourthInput} onChange={e => handleFourthInput(e)} maxLength="1"/>
                </InputsDiv>

            </ModalWindowContent>
        </ModalWindowBackground>
    )
}