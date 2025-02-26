import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalState";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import "./ProductDetails.css";

const queryClient = new QueryClient();

const fetchProduct = async (id) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
};

const ProductDetailsComponent = () => {
  const { dispatch } = useGlobalContext();
  const { id } = useParams();

  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  if (isLoading) return <p className="loading">Loading product details...</p>;
  if (error) return <p className="error">Error fetching product details.</p>;

  return (
    <div className="product-details">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <h2>{product.title}</h2>
        <p className="product-price">${product.price}</p>
        <p className="product-description">{product.description}</p>
        <button
          className="add-to-cart-btn"
          onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const ProductDetails = () => (
  <QueryClientProvider client={queryClient}>
    <ProductDetailsComponent />
  </QueryClientProvider>
);

export default ProductDetails;
