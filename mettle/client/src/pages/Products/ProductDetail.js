import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { PrimaryButton, SecondaryButton } from "../../components/Buttons";
import { useCart } from "../../context/cartContext"; // Import useCart hook
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { addToCart } = useCart(); // Get addToCart from cart context

  const [product, setProduct] = useState(null);

  // Extract filters passed from products list to retain filter state on return
  const filterState = location.state?.filters || {};
  const category = filterState.category;

  const hasFilters = filterState && Object.keys(filterState).length > 0;

  // Navigate back to products with filters preserved if any
  const handleGoBack = () => {
    if (hasFilters) {
      navigate("/products", { state: { filters: filterState } });
    } else {
      navigate("/products");
    }
  };

  // Fetch product details on mount or id change
  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(console.error);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Breadcrumbs category={category} productName={product.name} />
      <div className="details-Flex">
        <div className="image-Container">
          <img src={product.imageUrl} alt={product.name} width="300" />
        </div>
        <div className="text-and-buttons-Container">
          <div className="text-Container">
            <Typography variant="h4">{product.name}</Typography>
            <Typography>${product.price}</Typography>
            <Typography>{product.description}</Typography>
          </div>

          <div className="buttons-container">
            <SecondaryButton onClick={handleGoBack}>Back to results</SecondaryButton>
            {/* Use addToCart from context */}
            <PrimaryButton onClick={() => addToCart(product)}>Add to Cart</PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
