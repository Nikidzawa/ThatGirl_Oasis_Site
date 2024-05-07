import BasePath from "../../BasePath";

export default class EventCityAPI extends BasePath {
    static eventCityUrl = `${this.baseUrl}/eventCities`

    static getAllCities () {
        const url = `${this.eventCityUrl}/getAll`
        return fetch(url).then(response => response.json());
    }

    static getEventsByCityId (cityId) {
        const url = `${this.eventCityUrl}/getEventsByCityId/${cityId}`
        return fetch(url).then(response => response.json());
    }

    static postEventCity (eventCity) {
        const userId = localStorage.getItem("userId");
        const url = `${this.eventCityUrl}/${userId}`
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventCity)
        };
        return fetch(url, requestOptions).then(response => response.json());
    }

    static deleteEventCityById (eventId) {
        const userId = localStorage.getItem("userId");
        const url = `${this.eventCityUrl}/${eventId}/${userId}`;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(url, requestOptions);
    }
}