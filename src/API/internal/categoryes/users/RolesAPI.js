import BasePath from "../../BasePath";

export default class RolesAPI extends BasePath {
    static rolesUrl = `${this.baseUrl}/users/roles`

    static getRole (userId) {
        const url = `${this.rolesUrl}/${userId}`
        return fetch(url).then(response => response.text());
    }
}