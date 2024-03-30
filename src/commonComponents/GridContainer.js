import styled from "styled-components";

const Container = styled.div`
    min-height: 900px;
    display: grid;
    grid-template-columns: auto;
    justify-content: center;
`

const ElementsContainer = styled.div`
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    padding: 10px;
`
export default function GridContainer ({children}) {
    return (
        <Container>
            <ElementsContainer>
                {children}
            </ElementsContainer>
        </Container>
    )
}