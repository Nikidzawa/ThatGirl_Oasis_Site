import styled from "styled-components";

const PageNameContainer = styled.div`
    padding: 20px;
    background-color: #333333;
    display: flex;
    align-items: center;
    gap: 15px;
`

const NameContainer = styled.div`
    font-size: 27px;
    font-weight: bold;
    color: #eeded2;
`

export default function PageNameHeader({image, pageName}) {
    return (
        <PageNameContainer>
            <img width={"35px"} src={image}/>
            <NameContainer>{pageName}</NameContainer>
        </PageNameContainer>
    )
}