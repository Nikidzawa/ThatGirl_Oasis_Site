import styled from "styled-components";

const PageNameContainer = styled.div`
    background-color: #333333;
    display: flex;
    align-items: center;
    gap: 10px;
`

const NameContainer = styled.div`
    font-size: 27px;
    font-weight: bold;
    color: #eeded2;
`

export default function PageNameHeader({image, pageName, padding}) {
    return (
        <PageNameContainer style={{padding: padding}}>
            <img width={"35px"} src={image}/>
            <NameContainer>{pageName}</NameContainer>
        </PageNameContainer>
    )
}