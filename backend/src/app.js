import express from "express";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";
import { __dirname } from "./utils.js";
import logger from "./config/logger.js";
import expressWinston from "express-winston";
import { DB_URL, connectDB } from "./config/db.js";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;
const COOKIESECRET = process.env.COOKIESECRET;

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser(COOKIESECRET));
app.use(expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoredRoutes: function (req, res) { return false; }
}));

// Session setup
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: DB_URL,
            collection: "sessions",
            ttl: 24 * 60 * 60, // 1 día
        }),
        secret: COOKIESECRET,
        resave: false,
        saveUninitialized: false,
    })
);

//Routes

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});