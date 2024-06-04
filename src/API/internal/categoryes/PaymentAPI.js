import BasePath from "../BasePath";

export default class PaymentAPI extends BasePath {
    static paymentUrl = `${this.baseUrl}/payment`

    static startPay (eventCarts, mail) {
        const url = `${this.paymentUrl}/startPay/${mail}`
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventCarts)
        };
        return fetch(url, requestOptions).then(response => response.json());
    }
}