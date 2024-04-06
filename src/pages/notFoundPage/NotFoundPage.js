import styled from "styled-components";

const CenterText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #333333;
    font-size: 20px;
`

export default function NotFoundPage () {
    return (
        <CenterText>
            <div style={{textAlign: "center"}}>К сожалению, страницы не уже не существует</div>
        </CenterText>
    )
}