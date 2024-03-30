export default class ExternalAPI {
    static getGeocode (city, address) {
        const getUserRoleURL = `https://geocode-maps.yandex.ru/1.x?apikey=a9e37ef6-bfed-43a3-81eb-1f8cbd52bbc1&format=json&geocode=${city}, ${address}&limit=1`
        return fetch(getUserRoleURL).then(response => response.json());
    }
}