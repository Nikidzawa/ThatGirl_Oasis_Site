import styled from "styled-components";

const PageNameContainer = styled.div`
    padding: 20px;
    background-color: #333333;
    display: flex;
    align-items: center;
    gap: 10px;
`

const NameContainer = styled.div`
    font-size: 28px;
    font-family: "Trebuchet MS";
    font-weight: bold;
`

export default function PageNameHeader({image, pageName}) {
    return (
        <PageNameContainer>
            <img width={"35px"} src={image}/>
            <NameContainer>{pageName}</NameContainer>
        </PageNameContainer>
    )
}