import {Navigate, Route, Routes} from "react-router-dom";
import EventsPage from "./pages/eventsPage/EventsPage";
import MyProfilePage from "./pages/MyProfilePage";
import FaqPage from "./pages/FaqPage";
import {useEffect, useState} from "react";
import Loading from "./commonComponents/Loading";
import Exception from "./commonComponents/Exception";
import InternalAPI from "./API/InternalAPI";
import CreateEventPage from "./pages/createEventPage/CreateEventPage";
import styled from "styled-components";
import Header from "./commonComponents/Header";
import EventPage from "./pages/eventPage/EventPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";


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

function App() {
    const [user, setUser] = useState(null);
    const [userStatus, setUserStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getUser() {
            const userData = await InternalAPI.getUser(720970497);
            if (userData) {
                setUser(userData);
                getUserStatus(userData)
            } else {
                setLoading(false);

            }
        }
        async function getUserStatus (userData) {
            const status = await InternalAPI.getRole(userData.id);
            setUserStatus(status)
            setLoading(false);
        }
        getUser();
    }, []);

    return (
        <div>
            {loading ? <LoaderWrapper><Loading/></LoaderWrapper> : (user === null || userStatus === null) ? <Exception/> :
                <div>
                    <Header userStatus={userStatus}/>
                    <div style={{paddingTop: "60px"}}>
                        <Routes>
                            <Route path={"/events"} element={<EventsPage user={user}/>} />
                            <Route path={"/events/:id"} element={<EventPage/>} />
                            <Route path={"/createEvents"} element={<CreateEventPage user={user}/>} />
                            <Route path={"/profile"} element={<MyProfilePage user={user} />} />
                            <Route path={"/faq"} element={<FaqPage />} />
                            <Route path={"/404"} element={<NotFoundPage />} />
                            <Route path={"/*"} element={<Navigate to={"/404"} />} />
                    </Routes>
                    </div>
                </div>
            }
        </div>
    );
}

export default App;