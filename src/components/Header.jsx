import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button  from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';
import { use } from 'react';
export default function Header() {
  const cartCTx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalCartItems = cartCTx.items.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0);
  function handleShowCart(){
    userProgressCtx.showCart();
  }
  return (
    <header id="main-header">
        <div id="title">
        <img src={logoImg} alt="FoodYouLove Logo" />
        <h1>FoodYouLove</h1>
        </div>
        <nav>
            <Button textOnly>Cart ({totalCartItems})</Button>
        </nav>
        
    </header>
  );
}