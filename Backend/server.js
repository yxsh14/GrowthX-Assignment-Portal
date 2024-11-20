require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/db');


const userRoutes = require('./src/Routes/userRoutes');
const assignmentRoutes = require('./src/Routes/assignmentRoutes');
connectDB();



const app = express();
app.use(express.json());

app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/assignments', assignmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
