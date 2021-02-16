import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes/index.js';

dotenv.config();
const Database = process.env.DATABASE;

// db config
mongoose.connect(Database, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => console.log( 'Database Connected' ))
  .catch(err => console.log( err ));

// Instantiate the app
const app = express();
// Define our app port.
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json({extended: false}));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome'})
})
app.use(routes);

// listener
app.listen(port, () => console.log(`Server is listening on port ${port}`));
