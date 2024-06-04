import BasePath from "../../BasePath";

export default class MailAPI extends BasePath {
    static mailUrl = `${this.baseUrl}/mail`

    static sendMessage (mail, message) {
        const url = `${this.mailUrl}/send/${mail}/${message}`;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(url, requestOptions);
    }
}
