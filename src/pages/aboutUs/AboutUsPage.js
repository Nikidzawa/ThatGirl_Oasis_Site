import PageNameHeader from "../../commonComponents/PageNameHeader";
import OUR_IMAGE from "../../img/our.png"
import TeamMember from "./TeamMember";
import TeamData from "./TeamData";
import styled from "styled-components";

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

export default function AboutUsPage() {
    return (
        <div className="main">
            <PageNameHeader pageName={"О нас"} image={OUR_IMAGE}></PageNameHeader>
            <div style={{padding: "10px", minHeight: "100vh"}}>
                <Title>Команда That Girls Oasis</Title>
                <TeamContainer>
                    {
                        TeamData.getTeam().map(teamMember => <TeamMember teamMember={teamMember}/>)
                    }
                </TeamContainer>
            </div>
            <Footer>
                <div>© 2024 ThatGirlsOasis.ru</div>
                <div style={{paddingTop: "10px"}}>ИНН: 262804322510</div>
            </Footer>
        </div>
    )
}