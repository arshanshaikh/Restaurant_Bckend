import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from './database/dbConnection.js';
import { errorMiddleware } from "./error/error.js";
import reservationRouter from  "./routes/reservationRoutes.js";

const app = express();
dotenv.config({path: "./config/config.env"});

// Load environment variables
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Set up CORS
app.use(cors({
    origin: FRONTEND_URL,
    methods: ["POST"],
    credentials: true,
}));

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes connection
app.use('/api/v1/reservation', reservationRouter);

// Database connection
dbConnection();

// Error middleware
app.use(errorMiddleware);

// Handle preflight requests
// app.options('*', cors());

// Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

export default app;




// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { dbConnection } from './database/dbConnection.js';
// import { errorMiddleware } from "./error/error.js";
// import reservationRouter from  "./routes/reservationRoutes.js"

// const app = express();
// dotenv.config({path: "./config/config.env"});

// //frontend connection
// app.use(cors({
//     origin: [process.env.FRONTEND_URL],  //frontend connection from config file if we want to make more backend to connect with same frontend then used ,
//     methods : ["POST"], //various request can be added for now only  POST is used in this project
//     credentials : true,
// }))

// app.use(express.json());//from string to json object
// app.use(express.urlencoded({extended : true})); //used for to understand data is of which type

// //Routes connection
// app.use('/api/v1/reservation',reservationRouter);

// //db connection
// dbConnection();


// //error connection
// app.use(errorMiddleware)



// export default app;