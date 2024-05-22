import styled from "styled-components";
import {useEffect} from "react";
import NOT_FOUND_IMAGE from "../../img/notFound.png"

const MainContainer = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 30px;
`

const Text = styled.div`
    color: #333333;
    font-size: 20px;
`

export default function NotFoundPage () {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <MainContainer>
            <img width={'70px'} src={NOT_FOUND_IMAGE} alt={'404'}/>
            <Text style={{textAlign: "center"}}>К сожалению, страницы уже не существует</Text>
        </MainContainer>
    )
}