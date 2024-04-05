export default class InternalAPI {
    static getUser (userId) {
        const getUserURL = `http://localhost:8080/api/getUserById/${userId}`
        return fetch(getUserURL);
    }

    static getRole (userId) {
        const getUserURL = `http://localhost:8080/api/getUserStatus/${userId}`
        return fetch(getUserURL).then(response => response.text());
    }
    static postEvent(event) {
        const getUserRoleURL = `http://localhost:8080/api/postEvent`;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
        };
        return fetch(getUserRoleURL, requestOptions);
    }

    static getEvent (eventId) {
        const getUserEventsUrl = `http://localhost:8080/api/getEvent/${eventId}`;
        return fetch(getUserEventsUrl);
    }

    static getEventsByType (typeName) {
        const url = `http://localhost:8080/api/getEventsByType/${typeName}`
        return fetch(url).then(response => response.json());
    }

    static getAllEventTypes () {
        const url = `http://localhost:8080/api/getAllEventTypes`;
        return fetch(url).then(response => response.json());
    }

    static deleteEventTypeById (id) {
        const url = `http://localhost:8080/api/deleteEventType/${id}`;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(url, requestOptions);
    }

    static postEventType (eventType) {
        const postEventType = `http://localhost:8080/api/postEventType`;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventType)
        };
        return fetch(postEventType, requestOptions).then(response => response.json());
    }

    static getEventsByCityId (cityId) {
        const url = `http://localhost:8080/api/getEventsByCityId/${cityId}`
        return fetch(url).then(response => response.json());
    }

    static getAllCities () {
        const url = `http://localhost:8080/api/getEventCities`
        return fetch(url).then(response => response.json());
    }

    static postEventCity (eventCity) {
        const url = `http://localhost:8080/api/postEventCity`
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventCity)
        };
        return fetch(url, requestOptions).then(response => response.json());
    }

    static deleteEventCityById (eventCityId) {
        const url = `http://localhost:8080/api/deleteEventCity/${eventCityId}`;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(url, requestOptions);
    }
}