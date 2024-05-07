import BasePath from "../BasePath";

export default class PaymentAPI extends BasePath {
    static paymentUrl = `${this.baseUrl}/payment`

    static startPay (eventCarts) {
        const url = `${this.paymentUrl}/startPay`
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventCarts)
        };
        return fetch(url, requestOptions).then(response => response.json());
    }

    static receivePay () {
        const url = `${this.paymentUrl}/receivePay`

    }
}