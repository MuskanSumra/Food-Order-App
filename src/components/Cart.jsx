import { useContext } from "react";
import Modal from "./UI//Modal";
import CartContext from "../store/cart-context";
import currencyFormatter from "../utils/currencyFormatter";
import Button from "./UI/Button";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const cartTotal=cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
     0).toFixed(2);

    return <Modal className="cart">
        <h2>Your Cart</h2>
        <ul>
          {cartCtx.items.map(item => (
            <li key={item.id}>
                {item.name} x {item.amount}
            </li>))}
        </ul>
        <p className="cartTotal">{currencyFormatter.format(cartTotal)}</p>
        <p className="modal-actions">
            <Button textOnly>Close</Button>
            <Button >Go to Checkout</Button>
        </p>
    </Modal>
}