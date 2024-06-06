import styled from "styled-components";
import React from 'react';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    color: #333;
    width: 350px;
    height: 430px;
    text-align: center;
    align-items: center;
    padding: 10px;
    background-color: #fdb942;
    border-radius: 20px;
    position: relative;
`
const Name = styled.div`
    font-size: 25px;
    padding-top: 10px;
`

const Image = styled.img`
    width: 240px;
    height: 245px;
    border-radius: 50%;
`

const SocialLinksContainer = styled.div`
    display: flex;
    gap: 20px;
    padding-top: 20px;
    position: absolute;
    bottom: 10px;
`
const Circle = styled.div`
    margin-bottom: 2px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: #333;
    margin-right: 5px;
`
const RoleContainer = styled.div`
    padding-top: 5px;
    display: flex;
    align-items: center;
`

export default function TeamMember({teamMember}) {
    return (
        <Container>
            <Image src={teamMember.img} alt="Изображение сотрудника" />
            <Name>{teamMember.name}</Name>
            <RoleContainer><Circle/><div>{teamMember.role}</div></RoleContainer>
            <div style={{paddingTop: "10px"}}>{teamMember.description}</div>
            <SocialLinksContainer>
                {
                    teamMember.socialLinks.map(link => (
                        <a key={link.href} href={link.href}>
                            <img width={"50px"} src={link.img} alt="Иконка социальной сети" />
                        </a>
                    ))
                }
            </SocialLinksContainer>
        </Container>
    )
}