import express from 'express';
import bodyParser from 'body-parser';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import connectDB from './config/connectDB';
import 'dotenv/config';
import cors from 'cors';

let app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

configViewEngine(app);
initWebRoutes(app);
connectDB();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `backend of nodejs is running on the port: http://localhost:${port} `,
  );
});
