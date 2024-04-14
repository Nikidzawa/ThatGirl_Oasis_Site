import styled from "styled-components";

const ModalWindow = styled.div`
    z-index: 9999;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: ${props => props.visible ? "flex" : "none"};
    justify-content: center;
    align-items: center;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    color: black;
    font-size: 20px;
    padding: 10px;
`;

const ModalContent = styled.div`
    position: relative;
    background: white;
    border-radius: 20px;
    min-width: 250px;
    max-width: 350px;
    height: 300px;
    padding: 20px;
`;

const ButtonContainer = styled.div`
    position: absolute;
    width: 90%;
    bottom: 20px;
    display: flex;
    justify-content: space-between;
`

const RedButton = styled.button`
    color: white;
    background-color: red;
    border-color: red;
    padding: 15px;
    border-radius: 20px;
`
const GreenButton = styled.button`
    color: white;
    background-color: green;
    border-color: green;
    padding: 15px;
    border-radius: 20px;
`

export default function AcceptDeleteEventModal ({visible, setVisible, deleteEvent}) {
    function handleDelete () {
        setVisible(false);
        deleteEvent();
    }

    return (
        <ModalWindow visible={visible} onClick={() => setVisible(false)}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <h2>Вы действительно хотите удалить событие?</h2>
                <div style={{color: 'red'}}>Восстановить его будет уже невозможно, а купленные билеты аннулируются</div>
                <ButtonContainer>
                    <RedButton onClick={handleDelete}>Удалить</RedButton>
                    <GreenButton onClick={() => setVisible(false)}>Отменить</GreenButton>
                </ButtonContainer>
            </ModalContent>
        </ModalWindow>
    );
}