import { useGlobalContext } from "../context/GlobalState";
import { useState } from "react";

const Admin = () => {
  const { state, dispatch } = useGlobalContext();
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
  });

  const addProduct = () => {
    dispatch({
      type: "ADD_PRODUCT",
      payload: { ...newProduct, id: Date.now() },
    });
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <input
        placeholder="Title"
        onChange={(e) =>
          setNewProduct({ ...newProduct, title: e.target.value })
        }
      />
      <input
        placeholder="Price"
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
      />
      <input
        placeholder="Image URL"
        onChange={(e) =>
          setNewProduct({ ...newProduct, image: e.target.value })
        }
      />
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
};

export default Admin;
