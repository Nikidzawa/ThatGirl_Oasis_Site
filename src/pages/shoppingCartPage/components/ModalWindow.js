import styled from "styled-components";
import LOGO from "../../../img/logo.png"
import {useEffect, useRef, useState} from "react";
import MailAPI from "../../../API/internal/categoryes/mail/MailAPI";
import EXIT_IMAGE from "../../../img/delete.png"

const ModalWindowBackground = styled.div`
    display: ${props => props.visible ? "flex" : "none"};
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
    height: 420px;
    width: 80%;
    max-width: 600px;
    background-color: #eeded2;
    border-radius: 20px;
    padding: 20px;
    text-align: center;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
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
    margin-top: 20px;
    justify-content: center;
    display: flex;
    gap: 10px;
`
const Button = styled.button`
    margin-top: 30px;
    border: 1px solid black;
    background-color: green;
    border-radius: 20px;
    color: white;
    width: 200px;
    padding: 10px;
`

const TimerSection = styled.div`
    margin-top: 20px;
`

const Image = styled.img`
    position: absolute;
    right: 20px;
    top: 20px;
    width: 35px;
    cursor: pointer;
`

export default function ModalWindow ({email, setModalVisible, modalVisible, setEmailSuccess}) {
    const [firstInput, setFirstInput] = useState("");
    const [secondInput, setSecondInput] = useState("");
    const [thirdInput, setThirdInput] = useState("");
    const [fourthInput, setFourthInput] = useState("");

    const firstInputRef = useRef(null);
    const secondInputRef = useRef(null);
    const thirdInputRef = useRef(null);
    const fourthInputRef = useRef(null);

    const [firstVisible, setFirstVisible] = useState(false);

    const [timeLeft, setTimeLeft] = useState(60);
    const [isRunning, setIsRunning] = useState(true);

    const [exception, setException] = useState(false);
    const [code, setCode] = useState(null);

    useEffect(() => {
        if (firstVisible) {
            firstInputRef.current.focus();
            sendMessageToMail();
        }
    }, [firstVisible]);

    useEffect(() => {
        if (modalVisible) {
            setFirstVisible(true);
        }
    }, [modalVisible]);

    useEffect(() => {
        if (modalVisible) {
            let timerId;
            if (isRunning && timeLeft > 0) {
                timerId = setTimeout(() => {
                    setTimeLeft(timeLeft - 1);
                }, 1000);
            } else if (timeLeft === 0) {
                setIsRunning(false);
            }
            return () => clearTimeout(timerId);
        }
    }, [timeLeft, isRunning, modalVisible]);

    function handleRestartButton () {
        setTimeLeft(60);
        setIsRunning(true);
        sendMessageToMail();
    }

    function sendMessageToMail () {
        const randomCode = Math.floor(1000 + Math.random() * 9000);
        MailAPI.sendMessage(email, randomCode);
        setCode(randomCode);
    }

    function successCode (value) {
        const userValue = Number.parseInt(firstInput + secondInput + thirdInput + value);
        if (userValue === code) {
            setEmailSuccess(true)
            setException(false)
            setModalVisible(false)
            localStorage.setItem("email", email)
        } else setException(true)
    }

    function handleFirstInput(e) {
        const value = e.target.value;
        if (/^\d?$/.test(value)) {
            setFirstInput(value);
            if (value.length === 1) {
                secondInputRef.current.focus();
            }
        }
    }

    function handleSecondInput(e) {
        const value = e.target.value;
        if (/^\d?$/.test(value)) {
            setSecondInput(value);
            if (value.length === 1) {
                thirdInputRef.current.focus();
            }
        }
    }

    function handleThirdInput(e) {
        const value = e.target.value;
        if (/^\d?$/.test(value)) {
            setThirdInput(value);
            if (value.length === 1) {
                fourthInputRef.current.focus();
            }
        }
    }

    function handleFourthInput(e) {
        const value = e.target.value;
        if (/^\d?$/.test(value)) {
            setFourthInput(value);
            if (firstVisible && secondInput && thirdInput) {
                successCode(value)
            }
        }
    }

    return (
        <ModalWindowBackground visible={modalVisible}>
            <ModalWindowContent>
                <Image src={EXIT_IMAGE} onClick={e => setModalVisible(false)}/>
                <div>
                    <img src={LOGO} width={"120px"} alt={"лого"}/>
                    <h4>На почту {email} было отправлено письмо с кодом подтверждения</h4>
                </div>
                <InputsDiv>
                    <Input
                        value={firstInput}
                        onChange={handleFirstInput}
                        maxLength="1"
                        ref={firstInputRef}
                    />
                    <Input
                        value={secondInput}
                        onChange={handleSecondInput}
                        maxLength="1"
                        ref={secondInputRef}
                    />
                    <Input
                        value={thirdInput}
                        onChange={handleThirdInput}
                        maxLength="1"
                        ref={thirdInputRef}
                    />
                    <Input
                        value={fourthInput}
                        onChange={handleFourthInput}
                        maxLength="1"
                        ref={fourthInputRef}
                    />
                </InputsDiv>
                <Button onClick={() => successCode(fourthInput)}>Подтвердить почту</Button>
                <TimerSection>
                    {
                        exception && <div style={{color: "red"}}>Неверный код</div>
                    }
                    {isRunning ? (
                        <div>Вы сможете переотправить письмо через: {timeLeft}</div>
                    ) : (
                        <button onClick={handleRestartButton}>Переотправить письмо</button>
                    )}
                </TimerSection>
            </ModalWindowContent>
        </ModalWindowBackground>
    );
}