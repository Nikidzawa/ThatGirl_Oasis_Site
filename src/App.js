import {Navigate, Route, Routes} from "react-router-dom";
import EventsPage from "./pages/eventsPage/EventsPage";
import {useEffect, useState} from "react";
import Loading from "./commonComponents/Loading";
import InternalAPI from "./API/InternalAPI";
import CreateEventPage from "./pages/createEventPage/CreateEventPage";
import styled from "styled-components";
import Header from "./commonComponents/Header";
import EventPage from "./pages/eventPage/EventPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import ShoppingCartPage from "./pages/shoppingCartPage/ShoppingCartPage";
import AboutUsPage from "./pages/aboutUs/AboutUsPage";


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
        getUser();

        async function getUser() {
            const userData = await InternalAPI.getUser(720970497);
            if (userData.ok) {
                const user = await userData.json();
                setUser(user);
                getUserStatus(user)
            } else {
                setLoading(false);
            }
        }

        async function getUserStatus (user) {
            const status = await InternalAPI.getRole(user.id);
            setUserStatus(status);
            setLoading(false);
            localStorage.setItem("userId", user.id);
        }

    }, []);

    return (
        <div>
            {loading ? <LoaderWrapper><Loading circleColor={"#333"}/></LoaderWrapper> :
                <div>
                    <Header userStatus={userStatus}/>
                    <div style={{paddingTop: "70px"}}>
                        <Routes>
                            <Route path={"/events"} element={<EventsPage user={user}/>} />
                            <Route path={"/events/:id"} element={<EventPage user={user}/>} />
                            <Route path={"/createEvents"} element={<CreateEventPage user={user}/>} />
                            <Route path={"/shopping_cart"} element={<ShoppingCartPage user={user} />} />
                            <Route path={"/aboutUs"} element={<AboutUsPage />} />
                            <Route path={"/404"} element={<NotFoundPage />} />
                            <Route path={"/*"} element={<Navigate to={"/events"} />} />
                        </Routes>
                    </div>
                </div>
            }
        </div>
    );
}

export default App;