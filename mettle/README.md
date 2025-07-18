# Mettle

Mettle is a full-stack web application built with **React**, **Express.js**, **MongoDB**, and **Node.js**, designed as a secure, user-friendly platform for product browsing, article reading, and community content sharing.

---

## 🌟 Features

- 🔐 User authentication (login & registration)
- 🛍 Product listing, filtering, and sorting
- 📄 Product detail view
- 🛒 Shopping cart functionality
- ✍️ Article reading and submission (protected route)
- 🗂 Admin options (optional extension)
- 🌱 Built using the MVC architecture for scalability and maintainability

---

## 🧱 Tech Stack

| Frontend      | Backend        | Database  | Tools & Libraries       |
| ------------- | -------------- | --------- | ------------------------ |
| React         | Express.js     | MongoDB   | Mongoose, JWT, bcryptjs |
| React Router  | Node.js        |           | dotenv, nodemon         |
| Tailwind CSS  |                |           |                         |

---

## 🛠️ Getting Started

### Prerequisites

- Node.js
- npm / yarn
- MongoDB (local or MongoDB Atlas)

---

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/mettle.git
cd mettle


2. **Install dependencies**

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

3. Environment variables
Create a .env file in the /server directory and add the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

🔐 Never commit your .env file.


Start the Application:
npm run dev from the root folder will start the client and server concurrently.


🧪 API Endpoints Overview
Auth
POST /api/auth/register – Register a user

POST /api/auth/login – Log in user and return JWT

Products
GET /api/products – Get all products

GET /api/products/:id – Get a single product

Articles
GET /api/articles – Fetch all articles

POST /api/articles – Submit new article (requires token)

🔐 Security Features
Passwords hashed with bcrypt

Authenticated routes using JWT

Environment variables for secrets

Optional: input validation middleware

🚀 Deployment (Optional)
If deploying to services like Render, Vercel, or Heroku:

Add environment variables in the platform's config

Ensure frontend and backend are connected via a proxy or environment-based URL

For MongoDB Atlas, whitelist your IP and use the connection string in .env

🤝 Contributing
Fork the repo

Create your branch: git checkout -b feature/some-feature

Commit your changes: git commit -m "Add feature"

Push to the branch: git push origin feature/some-feature

Open a pull request

📄 License
This project is licensed under the MIT License. Feel free to use and modify as needed