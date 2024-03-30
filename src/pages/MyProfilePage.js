import {useEffect, useState} from "react";
import InternalAPI from "../API/InternalAPI";
import Loading from "../commonComponents/Loading";
import styled from "styled-components";
import EventCard from "./eventsPage/components/EventCard";
import GridContainer from "../commonComponents/GridContainer";

const H2 = styled.div`
    text-align: center;
    padding: 10px;
    background-color: black;
`

const LoaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 60px;
    left: 0;
`

const SSQ = styled.div`
    
`
export default function MyProfilePage({ user }) {
    const [events, setEvents] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserEvents();
        async function getUserEvents() {
            const response = await InternalAPI.getUserEvents(user.id);
            setEvents(response);
            setLoading(false);
        }
    }, [user.id]);

    return (
        <div>
            <div></div>
        </div>
    );
}