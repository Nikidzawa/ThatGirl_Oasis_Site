import PageNameHeader from "../../commonComponents/PageNameHeader";
import PROFILE_IMAGE from "../../img/profile.png"

export default function ProfilePage({ user }) {

    return (
        <div>
            <PageNameHeader image={PROFILE_IMAGE} pageName={"Профиль"}/>
        </div>
    );
}