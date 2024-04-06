export default class ExternalAPI {
    static loadImage (image) {
        const yDiskUploadUrl = `https://cloud-api.yandex.net/v1/disk/resources/download?path=${image}`
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': 'OAuth y0_AgAAAAA6DSoUAADLWwAAAAD-7B2bAAAmShKyx9pJQ7i_DbM850VcHQn9NA'}
        }
        return fetch(yDiskUploadUrl, requestOptions).then(response => response.json());
    }
}