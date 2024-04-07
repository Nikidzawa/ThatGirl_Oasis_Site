import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    color: #333;
    width: 250px;
    height: 400px;
    text-align: center;
    align-items: center;
    padding: 10px;
    background-color: #fdb942;
    border-radius: 20px;
    position: relative;
`
const Name = styled.div`
    font-size: 25px;
    padding-top: 5px;
`
const Role = styled.div`
    padding: 5px;
`

const Image = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
`

const SocialLinksContainer = styled.div`
    display: flex;
    gap: 20px;
    padding-top: 20px;
    position: absolute;
    bottom: 10px;
`

export default function TeamMember({teamMember}) {
    return (
        <Container>
            <Image src={teamMember.img} alt="Изображение сотрудника" />
            <Name>{teamMember.name}</Name>
            <Role>{teamMember.role}.</Role>
            <div>{teamMember.description}</div>
            <SocialLinksContainer>
                {
                    teamMember.socialLinks.map(link => (
                        <a key={link.href} href={link.href}>
                            <img width={"55px"} src={link.img} alt="Иконка социальной сети" />
                        </a>
                    ))
                }
            </SocialLinksContainer>
        </Container>
    )
}