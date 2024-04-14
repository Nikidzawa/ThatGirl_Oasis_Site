import PageNameHeader from "../../commonComponents/PageNameHeader";
import OUR_IMAGE from "../../img/our.png"
import TeamMember from "./TeamMember";
import TeamData from "./TeamData";
import styled from "styled-components";
import LOGO from "../../img/logo.png"
import {useEffect} from "react";

const Title = styled.div`
    font-size: 25px;
    font-weight: bold;
    color: #333;
    margin: 10px 0;
`

const TeamContainer = styled.div`
    display: flex;
    gap: 10px;
    overflow: auto;
    padding:  0 10px 10px 10px;
`

const Footer = styled.footer`
    background-color: #333;
    padding: 20px;
    font-size: 18px;
    text-align: center;
`
const AboutUsTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    text-align: center;
    align-items: center;
    justify-content: center;
    color: black;
    max-width: 500px;
    margin: 30px auto 70px;
    font-size: 18px;
`

export default function AboutUsPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="main">
            <PageNameHeader pageName={"О нас"} image={OUR_IMAGE}></PageNameHeader>
            <div style={{padding: "10px", minHeight: "100vh"}}>
                <AboutUsTextContainer>
                    <img width={"200px"} src={LOGO}/>
                    <div>Проект «That girl oasis» — это место для «той самой» девушки, которая хочет вести яркую и
                        богатую во всех сферах жизнь
                    </div>
                    <div>Наш проект направлен на саморазвитие, знакомство, общение, поддержку, отдых, здоровый образ
                        жизни — все это забота о себе 💆‍♀️
                    </div>
                    <div>А самая главная ценность нашего проекта — дружба и поддержка</div>
                    <div>Мы устраиваем мероприятия, в которых собраны самые разные направления для женского развития✨
                    </div>
                </AboutUsTextContainer>
                <Title>Команда That Girls Oasis</Title>
                <TeamContainer>
                    {
                        TeamData.getTeam().map((teamMember, index) => <TeamMember key={index} teamMember={teamMember}/>)
                    }
                </TeamContainer>
                <div style={{margin: "10px 0"}}>
                    <a href={"https://docs.google.com/document/d/1RVRKiIsjIXQyyFog6iVd-Mp83vupcz368N_oNC5DkVg/edit?usp=sharing"}>Пользовательское соглашение</a>
                </div>
            </div>
            <Footer>
                <div>© 2024 ThatGirlsOasis.ru</div>
                <div style={{paddingTop: "10px"}}>ИНН: 262804322510</div>
            </Footer>
        </div>
    )
}