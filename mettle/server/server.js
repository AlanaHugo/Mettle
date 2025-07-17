const express = require('express');
const mongoose = require('mongoose');
const swaggerSpec = require("./swagger");
const cors = require('cors');
require('dotenv').config();

const searchRoutes = require('./routes/searchroutes');
const productRoutes = require('./routes/productRoutes');
const articleRoutes = require('./routes/articleRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/auth', authRoutes); 
app.use("/api/search", searchRoutes);

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mettleApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
