import { useContext } from "react"
import Modal from "./UI/Modal"
import CartContext from "../store/cart-context"
import currencyFormatter from "../utils/currencyFormatter"
export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const cartTotal=cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
     0).toFixed(2);

     function handleClose(){
        userProgressCtx.hideCheckout();
     }
     function handleSubmit(event){
        event.preventDefault();

        const fd=new FormData(event.target);
        const customerData=Object.fromEntries(fd.entries());
        
        fetch('http://localhost:3000/orders',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                order: {
                    items:cartCtx.items,
                    customer: customerData,
                }
                
                
            })
        });
    }
    return <Modal className="checkout" open={userProgressCtx.progress==='checkout'} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
            <Input label="Full Name" id="name" type="text" />
            <Input label="E-Mail Address" id="email" type="email" />
            <Input label="Street" id="street" type="text" />
            <div>
                <Input label="Postal Code" id="postal-code" type="text" />
                <Input label="City" id="city" type="text" />
            </div>
            <p className="modal-actions">
                <Button type="button" textOnly onClick={handleClose}>Close</Button>
                <Button>Submit Order</Button>
            </p>
        </form>
    </Modal>
}