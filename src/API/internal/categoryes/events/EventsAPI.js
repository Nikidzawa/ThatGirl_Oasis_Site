import BasePath from "../../BasePath";

export default class EventsAPI extends BasePath {
    static eventsUrl = `${this.baseUrl}/events`

    static postEvent(event) {
        const userId = localStorage.getItem("userId");
        const url = `${this.eventsUrl}/${userId}`;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
        };
        return fetch(url, requestOptions);
    }

    static deleteEvent(eventId) {
        const userId = localStorage.getItem("userId");
        const url = `${this.eventsUrl}/${eventId}/${userId}`;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(url, requestOptions);
    }

    static getEventById (eventId) {
        const url = `${this.eventsUrl}/${eventId}`;
        return fetch(url);
    }

    static getEventImagesByEventId (eventId) {
        const url = `${this.eventsUrl}/${eventId}/images`;
        return fetch(url);
    }

    static setImages(event) {
        const userId = localStorage.getItem("userId");
        const url = `${this.eventsUrl}/setImages/${userId}`
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
        }
        return fetch(url, requestOptions)
    }

    static checkRegister (eventId, token) {
        const url = `${this.eventsUrl}/checkMemberStatus/${eventId}/${token}`
        return fetch(url);
    }
}