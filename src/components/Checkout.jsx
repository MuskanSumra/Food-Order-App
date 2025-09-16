import { useContext } from "react"
import Modal from "./UI/Modal"
import CartContext from "../store/cart-context"
import currencyFormatter from "../utils/currencyFormatter"
export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const cartTotal=cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
     0).toFixed(2);
    return <Modal className="checkout" >
        <form action="">
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        </form>
    </Modal>
}