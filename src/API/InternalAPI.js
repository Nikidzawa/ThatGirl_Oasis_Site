export default class InternalAPI {
    static getUser (userId) {
        const getUserURL = `https://nikidzawa.online/api/getUserById/${userId}`
        return fetch(getUserURL);
    }

    static getRole (userId) {
        const getUserURL = `https://nikidzawa.online/api/getUserStatus/${userId}`
        return fetch(getUserURL).then(response => response.text());
    }
    static postEvent(event) {
        const userId = localStorage.getItem("userId");
        const getUserRoleURL = `https://nikidzawa.online/api/postEvent/${userId}`;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
        };
        return fetch(getUserRoleURL, requestOptions);
    }

    static getEvent (eventId) {
        const getUserEventsUrl = `https://nikidzawa.online/api/getEvent/${eventId}`;
        return fetch(getUserEventsUrl);
    }

    static deleteEventCityById (eventId) {
        const userId = localStorage.getItem("userId");
        const url = `https://nikidzawa.online/api/deleteEventById/${eventId}/${userId}`;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(url, requestOptions);
    }

    static getEventsByType (typeId) {
        const url = `https://nikidzawa.online/api/getEventsByType/${typeId}`
        return fetch(url).then(response => response.json());
    }

    static getAllEventTypes () {
        const url = `https://nikidzawa.online/api/getAllEventTypes`;
        return fetch(url).then(response => response.json());
    }

    static deleteEventTypeById (id) {
        const userId = localStorage.getItem("userId");
        const url = `https://nikidzawa.online/api/deleteEventType/${id}/${userId}`;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(url, requestOptions);
    }

    static postEventType (eventType) {
        const userId = localStorage.getItem("userId");
        const postEventType = `https://nikidzawa.online/api/postEventType/${userId}`;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventType)
        };
        return fetch(postEventType, requestOptions).then(response => response.json());
    }

    static getEventsByCityId (cityId) {
        const url = `https://nikidzawa.online/api/getEventsByCityId/${cityId}`
        return fetch(url).then(response => response.json());
    }

    static getFavouriteEventsByCityId (cityId) {
        const url = `https://nikidzawa.online/api/getFavouriteEventsByCityId/${cityId}`
        return fetch(url).then(response => response.json());
    }

    static setOrRemoveEventFavorite (cityId, eventId) {
        const userId = localStorage.getItem("userId");
        const url = `https://nikidzawa.online/api/setOrRemoveEventFavorite/${cityId}/${eventId}/${userId}`;
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(url, requestOptions).then(response => response.json());
    }

    static getAllCities () {
        const url = `https://nikidzawa.online/api/getEventCities`
        return fetch(url).then(response => response.json());
    }

    static postEventCity (eventCity) {
        const userId = localStorage.getItem("userId");
        const url = `https://nikidzawa.online/api/postEventCity/${userId}`
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventCity)
        };
        return fetch(url, requestOptions).then(response => response.json());
    }

    static deleteEventCityById (eventCityId) {
        const userId = localStorage.getItem("userId");
        const url = `https://nikidzawa.online/api/deleteEventCity/${eventCityId}/${userId}`;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(url, requestOptions);
    }
}