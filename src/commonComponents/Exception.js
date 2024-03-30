import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 60px;
    left: 0;
`

export default function Exception () {
    return (
        <Container>
            <div style={{fontSize: "35px", paddingBottom: "10px"}}>⛔</div>
            <div>Сначала необходимо создать анкету</div>
        </Container>
    )
}