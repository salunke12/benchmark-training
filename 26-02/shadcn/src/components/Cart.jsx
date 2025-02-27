import { useGlobalContext } from "../context/GlobalState";
import "./Cart.css";

const Cart = () => {
  const { state, dispatch } = useGlobalContext();

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {state.cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        state.cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-image" />
            <div className="cart-details">
              <p className="cart-title">{item.title}</p>
              <p className="cart-price">${item.price}</p>
              <button
                className="remove-btn"
                onClick={() =>
                  dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                }
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
