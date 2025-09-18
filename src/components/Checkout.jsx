import { useContext ,useActionState} from "react"
import Modal from "./UI/Modal"
import CartContext from "../store/cart-context"
import currencyFormatter from "../utils/currencyFormatter"
import useHttp from "../hooks/useHttp";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({

    })
};
export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const { 
        data,
        error,
        sendRequest,
    clearData
 } = useHttp(
        'http://localhost:3000/orders', {
        requestConfig
    });
    const cartTotal=cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
     0).toFixed(2);

     function handleClose(){
        userProgressCtx.hideCheckout();
     }

     function handleFinish(){
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
     }

     async function checkoutAction(fd){
        const customerData=Object.fromEntries(fd.entries());
        
        await sendRequest(
        JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData,
                }, 
            }));
    }

    const [isSending] = useActionState(checkoutAction, null);

    let actions=(
    <>
    <Button type="button" textOnly onClick={handleClose}>
        Close
    </Button>
    <Button>Submit Order</Button>
    </>
);
    if(isSending){
        actions=<span>Sending order data...</span>
    }
    if(data){
        return <Modal className="checkout" open={userProgressCtx.progress==='checkout'} onClose={handleClose}>
                <h2>Order Successful!</h2>
                <p>Your order has been placed successfully.</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Close</Button>
                </p>
            </Modal>
    }
    return <Modal className="checkout" open={userProgressCtx.progress==='checkout'} onClose={handleClose}>
        <form onSubmit={handleSubmit} action={checkoutAction}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
            <Input label="Full Name" id="name" type="text" />
            <Input label="E-Mail Address" id="email" type="email" />
            <Input label="Street" id="street" type="text" />
            <div>
                <Input label="Postal Code" id="postal-code" type="text" />
                <Input label="City" id="city" type="text" />
            </div>
            {error && <Error message={error} title="Failed to submit order" />}
            <p className="modal-actions">
                {actions}
            </p>
        </form>
    </Modal>
}