import BasePath from "../../BasePath";

export default class UsersAPI extends BasePath {
    static usersUrl = `${this.baseUrl}/users`

    static getUser (userId) {
        const url = `${this.usersUrl}/${userId}`
        return fetch(url);
    }
}