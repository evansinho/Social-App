import express from 'express';
//import mongoose from 'mongoose';

// Instantiate the app
const app = express();
// Define our app port.
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome'})
})

// listener
app.listen(port, () => console.log(`Server is listening on port ${port}`));