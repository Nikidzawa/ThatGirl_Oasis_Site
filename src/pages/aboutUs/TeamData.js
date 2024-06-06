import LERA from "../../img/team/lera.jpg"
import TANYA from "../../img/team/tanya.jpg"
import NIKITA from "../../img/team/nikita.jpg"
import TELEGRAM from "../../img/team/socialLinks/telega.png"
import GITHUB from "../../img/team/socialLinks/gitHub.png"

class TeamData {
    static getTeam () {
        return [
            {
                img: LERA,
                name: "Лера",
                role: "Основательница сообщества",
                description: "Отвечаю за поиск партнёров и организацию работы команды",
                socialLinks: [
                    {
                        img: TELEGRAM,
                        href: "https://t.me/leralo_00"
                    },
                ]
            },
            {
                img: TANYA,
                name: "Татьяна",
                role: "Бренд менеджер",
                description: "Веду соц сети, публикую материалы",
                socialLinks: [
                    {
                        img: TELEGRAM,
                        href: "https://t.me/kudryavvcevaa"
                    },
                ]
            },
            {
                img: LERA,
                name: "Лера",
                role: "Куратор мероприятий",
                description: "Отвечаю за мероприятия, а так же коммуницирую с участниками",
                socialLinks: [
                    {
                        img: TELEGRAM,
                        href: "https://t.me/leralo_00"
                    },
                ]
            },
            {
                img: NIKITA,
                name: "Никита",
                role: "Ведущий разработчик",
                description: "Разработал экосистему That Girl Oasis",
                socialLinks: [
                    {
                        img: TELEGRAM,
                        href: "https://t.me/Nikidzawa"
                    },
                    {
                        img: GITHUB,
                        href: "https://github.com/Nikidzawa"
                    }
                ]
            }
        ]
    }
}
export default TeamData