import dotevn from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import routes from "./routes";

dotevn.config();

const app = express();

//middlewares 中间件
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());


//数据库 database
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    autoIndex: false,
}, (err) => {
    if (err) throw err;
    console.log('MongoDB connected');
});

//路由 route
app.use('/api', routes);

//starts server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
