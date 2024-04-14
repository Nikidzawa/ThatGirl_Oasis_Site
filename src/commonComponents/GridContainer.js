import styled from "styled-components";

const Container = styled.div`
    display: grid;
    position: relative;
    grid-template-columns: auto auto auto;
    gap: 20px;
    background: rgba(0, 0, 0, 0.6);
    justify-content: center;
    padding-bottom: 20px;
    min-height: 100vh;
    
    @media (max-width: 1120px) {
        grid-template-columns: auto auto;
    }
    
    @media (max-width: 760px) {
        gap: 10px;
        grid-template-columns: auto;
    }
`

export default function GridContainer ({children}) {
    return (
        <Container>{children}</Container>
    )
}