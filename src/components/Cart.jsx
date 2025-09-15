import { useContext } from "react";
import Modal from "./UI//Modal";
import CartContext from "../store/cart-context";
import currencyFormatter from "../utils/currencyFormatter";
import Button from "./UI/Button";
import CartItem from "./CartItem";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const cartTotal=cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
     0).toFixed(2);

     function handleCloseCart(){
        userProgressCtx.hideCart();
     }

    return <Modal className="cart" open={userProgressCtx.progress==='cart'} >
        <h2>Your Cart</h2>
        <ul>
          {cartCtx.items.map(item => (
            <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price} onAdd={() => cartCtx.addItem(item)} onRemove={() => cartCtx.removeItem(item)} />
          ))}</ul>
        <p className="cartTotal">{currencyFormatter.format(cartTotal)}</p>
        <p className="modal-actions">
            <Button textOnly onClick={handleCloseCart}>Close</Button>
            <Button onClick={userProgressCtx.showCheckout}>Go to Checkout</Button>
        </p>
    </Modal>
}