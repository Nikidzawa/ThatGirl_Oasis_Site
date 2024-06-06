import LUPA from "../../../img/lupa.png";
import LIGHT from "../../../img/ligth.png";
import Money from "../../../img/money.png";
import BALLON from "../../../img/ballon.png";
import RedHeart from "../../../img/red_heart.png";
import styled from "styled-components";
import React, {useEffect, useMemo, useState} from "react";
import EventTypesAPI from "../../../API/internal/categoryes/events/EventTypesAPI";

const Button = styled.button`
    height: 2.5rem;
    font-size: 0.9375rem;
    min-width: auto;
    border-radius: 1.25rem;
    background-color: #F5F5F5;
    padding: ${props => props.backgroundImage ? "0.625rem 0.9375rem 0.625rem 2rem" : "0.625rem 1.25rem"};
    background-image: ${props => props.backgroundImage ? `url('${props.backgroundImage}')` : 'none'};
    background-repeat: no-repeat;
    background-position: center left 0.3125rem;
    background-size: 1.5625rem;

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
    gap: 0.625rem;
    height: 3.125rem;
    overflow-x: auto;
    white-space: nowrap;
    @media screen and (max-width: 300px) {
        gap: 0.5rem;
    }
`;

const Input = styled.input`
    width: 100%;
    padding-left: 2.375rem;
    border-radius: 1.25rem;
    font-size: 0.875rem;
    height: 2.5rem;
    outline: none;
    background-image: ${props => `url('${props.backgroundImage}')`};
    background-repeat: no-repeat;
    background-position: center left 0.3125rem;
    background-size: 1.75rem;
`;

const SearchContainer = styled.div`
    background-color: #333;
    padding: 0.625rem 0.9375rem;
`;

const Select = styled.select`
    height: 2.5rem;
    border-radius: 1.25rem;
    font-size: 0.9375rem;
    width: auto;
    border: none;
    outline: none;
    text-align: center;
    max-width: 11.875rem;
    background-color: #F5F5F5;
    padding: ${props => props.backgroundImage ? "0.625rem 0.625rem 0.625rem 2rem" : "0.625rem"};
    background-image: ${props => props.backgroundImage ? `url('${props.backgroundImage}')` : 'none'};
    background-repeat: no-repeat;
    background-position: center left 0.3125rem;
    background-size: 1.5625rem;
    cursor: pointer;

    ${(props) => props.value !== "NONE" ?
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
`;


export default function SearchPanel ({events, setSortedEvents}) {
    const [sortBy, setSortBy] = useState(["Скоро", "Рядом"]);
    const [priceSort, setPriceSort] = useState("NONE");
    const [search, setSearch] = useState("");
    const [typeSort, setTypeSort] = useState("NONE");
    const [types, setTypes] = useState("");

    useEffect(() => {
        getTypes();
        async function getTypes () {
            const response = await EventTypesAPI.getAllEventTypes();
            setTypes(response);
        }
    }, [])

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
        if (typeSort !== "NONE") {
            sorted = sorted.filter(event => event.eventType.name === typeSort);
            return searchSort(sorted);
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
            event.city.name.toLowerCase().includes(search.toLowerCase())
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
    function handleTypeSort(type) {
        const sorted = sortBy.filter(item => item !== typeSort);
        setTypeSort(type);
        setSortBy([...sorted, type]);
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
                <Select onChange={e => handleTypeSort(e.target.value)} backgroundImage={BALLON} value={typeSort}>
                    <option value={"NONE"}>Без категории</option>
                    {
                        types &&
                        types.map(type => <option value={type.name}>{type.name}</option>)
                    }
                </Select>
                <Select onChange={e => handlePriceSort(e.target.value)} backgroundImage={Money} value={priceSort}>
                    <option value={"NONE"}>Цена не важна</option>
                    <option value={"Недорогие"}>Сначала недорогие</option>
                    <option value={"Дорогие"}>Сначала дорогие</option>
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