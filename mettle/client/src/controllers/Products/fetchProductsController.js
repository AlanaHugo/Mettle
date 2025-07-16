import axios from "axios";

/**
 * fetchProducts
 * --------------------------
 * Fetches all product data from the backend API.
 * Used in the Products page to get the initial full product list.
 */
export async function fetchProducts() {
  const response = await axios.get("/api/products");
  return response.data;
}

