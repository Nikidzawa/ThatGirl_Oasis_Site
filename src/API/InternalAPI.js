export default class InternalAPI {

    static defaultPath = "https://nikidzawa.online"
    static getUser (userId) {
        const url = `${this.defaultPath}/api/getUserById/${userId}`
        return fetch(url);
    }

    static getRole (userId) {
        const url = `${this.defaultPath}/api/getUserStatus/${userId}`
        return fetch(url).then(response => response.text());
    }
    static postEvent(event) {
        const userId = localStorage.getItem("userId");
        const url = `${this.defaultPath}/api/postEvent/${userId}`;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
        };
        return fetch(url, requestOptions);
    }

    static deleteEvent (eventId) {
        const userId = localStorage.getItem("userId");
        const url = `${this.defaultPath}/api/deleteEventById/${eventId}/${userId}`;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(url, requestOptions);
    }

    static setImages(event) {
        const userId = localStorage.getItem("userId");
        const url = `${this.defaultPath}/api/setImages/${userId}`
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
        }
        return fetch(url, requestOptions)
    }

    static getEvent (eventId) {
        const url = `${this.defaultPath}/api/getEvent/${eventId}`;
        return fetch(url);
    }

    static deleteEventCityById (eventId) {
        const userId = localStorage.getItem("userId");
        const url = `${this.defaultPath}/api/deleteEventById/${eventId}/${userId}`;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(url, requestOptions);
    }

    static getEventsByType (typeId) {
        const url = `${this.defaultPath}/api/getEventsByType/${typeId}`
        return fetch(url).then(response => response.json());
    }

    static getAllEventTypes () {
        const url = `${this.defaultPath}/api/getAllEventTypes`;
        return fetch(url).then(response => response.json());
    }

    static deleteEventTypeById (id) {
        const userId = localStorage.getItem("userId");
        const url = `${this.defaultPath}/api/deleteEventType/${id}/${userId}`;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(url, requestOptions);
    }

    static postEventType (eventType) {
        const userId = localStorage.getItem("userId");
        const url = `${this.defaultPath}/api/postEventType/${userId}`;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventType)
        };
        return fetch(url, requestOptions).then(response => response.json());
    }

    static getEventsByCityId (cityId) {
        const url = `${this.defaultPath}/api/getEventsByCityId/${cityId}`
        return fetch(url).then(response => response.json());
    }

    static getAllCities () {
        const url = `${this.defaultPath}/api/getEventCities`
        return fetch(url).then(response => response.json());
    }

    static postEventCity (eventCity) {
        const userId = localStorage.getItem("userId");
        const url = `${this.defaultPath}/api/postEventCity/${userId}`
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventCity)
        };
        return fetch(url, requestOptions).then(response => response.json());
    }
}