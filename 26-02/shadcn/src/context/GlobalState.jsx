import { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";

const GlobalContext = createContext();

const initialState = {
  products: [],
  cart: [],
  user: null, // Null = not logged in, 'admin' = admin user
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    case "EDIT_PRODUCT":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => dispatch({ type: "SET_PRODUCTS", payload: res.data }))
      .catch((err) => console.error(err));
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
