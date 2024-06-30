export default class DateFormatter {
    static format(dateString) {
        const months = [
            "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
            "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
        ];
        const dateParts = dateString.split('-');
        const month = parseInt(dateParts[1]);
        const day = parseInt(dateParts[2]);

        return day + ' ' + months[month - 1];
    }
}