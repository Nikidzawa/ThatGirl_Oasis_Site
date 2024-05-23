import styled from "styled-components";
import React from 'react';


const LoaderCircle = styled.div`
    border: ${props => props.circleColor ? "4px solid " + props.circleColor : "4px solid white"};
    border-top: 4px solid transparent;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`

export default function Loading ({circleColor}) {
    return <LoaderCircle circleColor={circleColor}/>
}