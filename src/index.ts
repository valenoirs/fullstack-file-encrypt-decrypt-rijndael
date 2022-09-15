import "dotenv/config.js";
import config from "./config/config";
import express, { Express, Request, Response } from "express";
import { connect } from "mongoose";
import helmet from "helmet";
import path from "path";
import methodOverride from "method-override";
import expressLayouts from "express-ejs-layouts";
import flash from "connect-flash";
import session from "express-session";

// Import Routes
import { router as fileRoute } from "./routes/file";
import { router as viewRoute } from "./routes/view";

// Init
const app: Express = express();
const port = config.PORT;

// Connect to database
connect(config.MONGO_URI)
  .then(() => {
    console.log("[server]: OK! successfully-connected-to-mongodb");
  })
  .catch((error) => {
    console.error("[server]: ERR! failed-connecting-to-mongo-database", error);
  });

// Middleware
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        scriptSrc: [
          "'self'",
          "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js",
          "https://unpkg.com/aos@2.3.1/dist/aos.js",
        ],
      },
    },
  })
);

app.use(
  session({
    secret: "v4l3n01r5",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(flash());

// Templating Engine
app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// HTTP Routes
app.use("/", viewRoute);
app.use("/file", fileRoute);

// Ping
app.get("/ping", (req: Request, res: Response) => {
  console.log(`[server]: OK! ${req.headers.host} pinging the server`);
  return res.status(200).send({
    success: true,
    status: 200,
    data: {
      message: "valenoirs",
    },
  });
});

// 404
app.use("/", (req: Request, res: Response) => {
  return res.status(404).send({
    error: true,
    status: 404,
    type: "NotFound",
    data: {
      message: "No API endpoint found.",
    },
  });
});

// Server
app.listen(port, (): void => {
  console.log(`[server]: OK! server running at port ${port}`);
});
