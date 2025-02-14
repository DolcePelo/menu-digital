import express from "express";
import dotenv from "dotenv";
import categoryRouter from "./routes/category.routes.js";
import productRouter from "./routes/product.routes.js";
import userRouter from "./routes/user.routes.js";
import menuRouter from "./routes/menu.routes.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import sessionRouter from "./routes/sessions.routes.js";
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

//inicialización de passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/menus", menuRouter);
app.use("/api/session", sessionRouter);

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});