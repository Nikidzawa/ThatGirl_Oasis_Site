import SHOPPING_CART_IMAGE from "../../img/cart.png"
import PageNameHeader from "../../commonComponents/PageNameHeader";


export default function ShoppingCartPage () {
    return (
        <div>
            <PageNameHeader pageName={"Корзина"} image={SHOPPING_CART_IMAGE} />
        </div>
    )
}