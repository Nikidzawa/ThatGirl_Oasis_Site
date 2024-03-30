import {Map, Placemark, YMaps, ZoomControl} from "react-yandex-maps";
export default function InteractiveMap ({lat, lon}) {
    return (
        <YMaps query={{ apikey: '69b2e791-2b45-4268-841f-2a98c25e62cc' }}>
            <div style={{ width: '100%', height: '400px' }}>
                <Map defaultState={{ center: [lat, lon], zoom: 9 }}>
                    <Placemark geometry={[lat, lon]} />
                    <ZoomControl options={{ float: 'right' }} />
                </Map>
            </div>
        </YMaps>
    );
};