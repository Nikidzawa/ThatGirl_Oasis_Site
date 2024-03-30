import EVENT from "./img/event.png";
import PROFILE from "./img/profile.png";
import FAQ from "./img/faq.png";
import styled from "styled-components";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

const Option = styled(Link)`
    text-decoration: none;
    color: inherit;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;

    &.active {
        background-color: green;
    }
`

const ButtonText = styled.div`
    padding-top: 5px;
`
const ButtonImage = styled.img`
    padding-top: 2px;
    height: 28px;
`
export default function Footer () {
    const location = useLocation();
    const [buttonSelected, setButton] = useState("events");

    useEffect(() => {
        if (location.pathname.includes("/events")) {
            setButton("events");
        } else if (location.pathname.includes("/profile")) {
            setButton("profile");
        } else if (location.pathname.includes("/faq")) {
            setButton("faq");
        }
    }, [location.pathname]);

    return (
        <footer>
            <Option to={"/events"}  className={buttonSelected === "events" ? "active" : ""}>
                <ButtonImage src={EVENT}/>
                <ButtonText>Мероприятия</ButtonText>
            </Option>

            <Option to={"/profile"} className={buttonSelected === "profile" ? "active" : ""}>
                <ButtonImage src={PROFILE}/>
                <ButtonText>Профиль</ButtonText>
            </Option>
            <Option to={"/faq"} className={buttonSelected === "faq" ? "active" : ""}>
                <ButtonImage src={FAQ}/>
                <ButtonText>Помощь</ButtonText>
            </Option>
        </footer>
    )
}