import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { PrimaryButton, SecondaryButton } from "../../components/Buttons";
import "./ProductDetail.css";

// Add to cart on click of primary button
const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  // Extract state passed from products list
  const filterState = location.state?.from || {};
  const category = filterState.category;

  // "Return to shop" with filters still applied on click of secondary button
  const handleGoBack = () => {
    if (filterState) {
      navigate("/products", { state: { filters: filterState } });
    } else {
      navigate("/products");
    }
  };

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
        {/* Image */}
        <div className="image-Container">
          <img src={product.imageUrl} alt={product.name} width="300" />
        </div>
        <div className="text-and-buttons-Container">
          {/* Text       */}
          <div className="text-Container">
            <Typography variant="h4">{product.name}</Typography>
            <Typography>${product.price}</Typography>
            <Typography>{product.description}</Typography>
          </div>

          <div className="buttons-container">
            <SecondaryButton onClick={handleGoBack}>
              Back to results
            </SecondaryButton>
            <PrimaryButton onClick={() => addToCart(product)}>
              Add to Cart
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
