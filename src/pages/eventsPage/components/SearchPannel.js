import LUPA from "../../../img/lupa.png";
import LIGHT from "../../../img/ligth.png";
import Location from "../../../img/location.png";
import Money from "../../../img/money.png";
import RedHeart from "../../../img/red_heart.png";
import styled from "styled-components";
import {useMemo, useState} from "react";

const Button = styled.button`
    height: 40px;
    font-size: 15px;
    min-width: auto;
    border-radius: 20px;
    background-color: #F5F5F5;
    padding: ${props => props.backgroundImage ? "10px 15px 10px 32px" : "10px 20px 10px 20px"};
    background-image: ${props => props.backgroundImage ? `url('${props.backgroundImage}')` : 'none'};
    background-repeat: no-repeat;
    background-position: center left 5px;
    background-size: 25px;

    ${(props) =>
    props.selected &&
    `
            background-color: green;
            color: white;
            `
}

    ${(props) =>
    !props.selected &&
    `
            background-color: white;
            color: black;
            `
}
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    height: 50px;
    overflow-x: auto;
    white-space: nowrap;
    @media screen and (max-width: 300px) {
        gap: 8px;
    }
`;

const Input = styled.input`
    width: 100%;
    padding-left: 38px;
    border-radius: 20px;
    font-size: 14px;
    height: 40px;
    outline: none;
    background-image: ${props => `url('${props.backgroundImage}')`};
    background-repeat: no-repeat;
    background-position: center left 5px;
    background-size: 28px;
`

const SearchContainer = styled.div`
    background-color: #333;
    padding: 10px 15px 10px 15px;
`

const Select = styled.select`
    height: 40px;
    border-radius: 20px;
    font-size: 15px;
    width: auto;
    border: none;
    outline: none;
    background-color: #F5F5F5;
    padding: ${props => props.backgroundImage ? "10px 10px 10px 32px" : "10px 10px 10px 10px"};
    background-image: ${props => props.backgroundImage ? `url('${props.backgroundImage}')` : 'none'};
    background-repeat: no-repeat;
    background-position: center left 5px;
    background-size: 25px;
    ${(props) => props.value !== "Не важна" ? 
            `
            background-color: green;
            color: white;
            ` 
            : 
            `
            background-color: #F5F5F5;
            color: black;
            `
    }
    option {
        background-color: white;
        color: black;
    }
`

const Option = styled.option`
    
`

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;

    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
}

export default function SearchPanel ({user, events, setSortedEvents}) {
    const [sortBy, setSortBy] = useState(["Скоро", "Рядом"]);
    const [priceSort, setPriceSort] = useState("Не важна")
    const [search, setSearch] = useState("");

    useMemo(() => {
        if (!events) return;
        const sortedEvents = sortEvents(events);
        setSortedEvents(sortedEvents);
    }, [events, sortBy, search, priceSort]);

    function sortEvents(sortedEvents) {
        let sorted = sortedEvents;

        if (sortBy.includes("Скоро")) {
            sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
        if (sortBy.includes("Недорогие")) {
            sorted.sort((a, b) => a.cost - b.cost);
        } else if (sortBy.includes("Дорогие")) {
            sorted.sort((a, b) => b.cost - a.cost);
        }
        if (sortBy.includes("Рядом")) {
            sorted.sort((event1, event2) => {
                const distance1 = calculateDistance(user.latitude, user.longitude, event1.lat, event1.lon);
                const distance2 = calculateDistance(user.latitude, user.longitude, event2.lat, event2.lon);
                return distance1 - distance2;
            });
        }
        if (sortBy.includes("Избранное")) {
            sorted = sorted.filter(event => {
                const favouriteEvents = localStorage.getItem("favouriteEvents");
                if (favouriteEvents) {
                    const favouriteEventsArray = favouriteEvents.split(",");
                    return favouriteEventsArray.includes(event.id.toString());
                }
                return false;
            });
        }
        return searchSort(sorted);
    }

    function searchSort(sortedEvents) {
        return sortedEvents.filter(event =>
            event.name.toLowerCase().includes(search.toLowerCase()) ||
            event.smallDescription.toLowerCase().includes(search.toLowerCase()) ||
            event.fullDescription.toLowerCase().includes(search.toLowerCase()) ||
            event.city.toLowerCase().includes(search.toLowerCase()) ||
            event.address.toLowerCase().includes(search.toLowerCase())
        );
    }

    function handleSort (option) {
        if (sortBy.includes(option)) {
            setSortBy(sortBy.filter(item => item !== option));
        } else {
            setSortBy([...sortBy, option])
        }
    }

    function handlePriceSort (option) {
        const sorted = sortBy.filter(item => item !== priceSort);
        setPriceSort(option);
        setSortBy([...sorted, option]);
    }

    return (
        <SearchContainer>
            <div style={{display: "flex", margin: "0 0 10px 0"}}>
                <Input placeholder={"Найти мероприятие"} onChange={e => setSearch(e.target.value)} backgroundImage={LUPA}/>
            </div>
            <ButtonContainer>
                <Button
                    backgroundImage={LIGHT}
                    selected={sortBy.includes('Скоро')}
                    onClick={() => handleSort('Скоро')}
                >Скоро</Button>
                <Button
                    backgroundImage={Location}
                    selected={sortBy.includes('Рядом')}
                    onClick={() => handleSort('Рядом')}
                >Рядом</Button>
                <Select onChange={e => handlePriceSort(e.target.value)} backgroundImage={Money} value={priceSort}>
                    <Option value={"Не важна"}>Цена не важна</Option>
                    <Option value={"Недорогие"}>Сначала недорогие</Option>
                    <Option value={"Дорогие"}>Сначала дорогие</Option>
                </Select>
                <Button
                    backgroundImage={RedHeart}
                    selected={sortBy.includes('Избранное')}
                    onClick={() => handleSort('Избранное')}
                >Избранное
                </Button>
            </ButtonContainer>
        </SearchContainer>
    )
}