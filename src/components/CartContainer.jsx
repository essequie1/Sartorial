import { useProductsContext } from '../context/productsContext';
import { useUserContext } from '../context/userContext';
import { useState } from 'react';
import { CartNotice, CartProduct } from './componentsIndex';
import { useNavigate } from 'react-router-dom';
import '../scss/CartContainer.scss';

export const CartContainer = ({ isShown, handleShowCart }) => {
  const [confirmation, setConfirmation] = useState(false);
  const { cart, clearCart, cartTotal } = useProductsContext();
  const { isLoggedIn } = useUserContext();
  const navigation = useNavigate();

  const handleRedirect = () => {
    if (isLoggedIn) {
      navigation('/checkout');
      handleShowCart();
    } else {
      setConfirmation(true);
    }
  };

  const handleCartDisplay = () => {
    handleShowCart();
    setConfirmation(false);
  };

  return (
    <div className={isShown ? 'cart-container --active' : 'cart-container --inactive'}>
      <button className="cart-container__closeBtn" onClick={handleCartDisplay}>
        <span className="material-symbols-outlined">close</span>
      </button>
      <p className="cart-container__title">Your Cart</p>
      {cart.length > 0 ? (
        <>
          <div className="cart-container__products">
            {cart.map(prod => (
              <CartProduct key={prod.id} product={prod} />
            ))}
          </div>
          <div className="cart-container__total">
            <p>Total</p>
            <p>{'$ ' + cartTotal}</p>
          </div>
          <div className="cart-container__bottom">
            <button onClick={handleRedirect} className="checkout">
              Go to Checkout
            </button>
            <button onClick={() => clearCart()} className="clear-cart">
              <span className="material-symbols-outlined">backspace</span>
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty...</p>
      )}
      {confirmation ? <CartNotice closeMenu={handleShowCart} removeNotice={() => setConfirmation(false)} /> : null}
    </div>
  );
};
