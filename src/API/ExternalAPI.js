export default class ExternalAPI {
    static getGeocode (city, address) {
        const getUserRoleURL = `https://geocode-maps.yandex.ru/1.x?apikey=a9e37ef6-bfed-43a3-81eb-1f8cbd52bbc1&format=json&geocode=${city}, ${address}&limit=1`
        return fetch(getUserRoleURL).then(response => response.json());
    }

    static loadImage (image) {
        const yDiskUploadUrl = `https://cloud-api.yandex.net/v1/disk/resources/download?path=${image}`
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': 'OAuth y0_AgAAAAA6DSoUAADLWwAAAAD-7B2bAAAmShKyx9pJQ7i_DbM850VcHQn9NA'}
        }
        return fetch(yDiskUploadUrl, requestOptions).then(response => response.json());
    }
}