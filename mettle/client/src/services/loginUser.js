import axios from "axios";

export async function loginUser(credentials) {
  const response = await axios.post("/api/auth/login", credentials, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  });

  console.log("Login response:", response.data);  // <-- Log after response received

  return response.data;
}
