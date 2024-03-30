import styled from "styled-components";
import LOGO from "../img/logo.jpg"

const ModalWindow = styled.div`
    z-index: 9999;
    position: fixed;
    top: 0;
    bottom: 60px;
    right: 0;
    left: 0;
    display: ${props => props.visible ? "flex" : "none"};
    justify-content: center;
    align-items: center;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    color: #561f0a;
    font-size: 20px;
    padding: 10px;
`;

const ModalContent = styled.div`
    background: #e2a272;
    border-radius: 20px;
    min-width: 250px;
    min-height: 300px;
    display: flex;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const IMAGE = styled.img`
    height: auto;
    width: 300px;
    border-radius: 20px 0 0 20px;

    @media (max-width: 768px) {
        border-radius: 20px 20px 0 0;
        margin-bottom: 10px;
    }
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px;
`;

const TEXT = styled.div`
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

const DESCRIPTION = styled.div`
    font-size: 16px;
    padding: 10px;
`;

export default function Modal ({visible, setVisible}) {
    return (
        <ModalWindow visible={visible} onClick={() => setVisible(false)}>
            <ModalContent>
                <IMAGE src={LOGO}/>
                <TextContainer>
                    <TEXT>Мероприятия в THAT GIRLS OASIS</TEXT>
                    <DESCRIPTION>Здесь ты сможешь записаться на интересные мероприятия и мастер-классы вместе со своими подругами</DESCRIPTION>
                    <DESCRIPTION>Если появятся вопросы, то всегда можешь обратиться в поддержку </DESCRIPTION>
                    <DESCRIPTION>С любовью - Лера</DESCRIPTION>
                </TextContainer>
            </ModalContent>
        </ModalWindow>
    );
}