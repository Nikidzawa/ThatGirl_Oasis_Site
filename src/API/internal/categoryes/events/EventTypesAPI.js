import BasePath from "../../BasePath";

export default class EventTypesAPI extends BasePath {
    static eventTypesURL = `${this.baseUrl}/eventTypes`

    static getAllEventTypes () {
        const url = `${this.eventTypesURL}/getAll`;
        return fetch(url).then(response => response.json());
    }

    static postEventType (eventType) {
        const userId = localStorage.getItem("userId");
        const url = `${this.eventTypesURL}/${userId}`;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventType)
        };
        return fetch(url, requestOptions).then(response => response.json());
    }

    static deleteEventTypeById (typeId) {
        const userId = localStorage.getItem("userId");
        const url = `${this.eventTypesURL}/${typeId}/${userId}`;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(url, requestOptions);
    }

    static getEventsByType (typeId) {
        const url = `${this.eventTypesURL}/getEventsByTypeId/${typeId}`
        return fetch(url).then(response => response.json());
    }
}