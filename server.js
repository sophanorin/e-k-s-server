import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import path from "path";
import categoryRouter from "./routers/categoryRouter.js";
import cors from "cors";
import SGMail from "@sendgrid/mail";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

SGMail.setApiKey(process.env.SENDGRID_API_KEY);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    process.env.CONNECTION_STRING || "mongodb://localhost/storeRobotics",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("MongoBD connected..."))
  .catch((err) => console.log(err));

app.use("/api/category", categoryRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

//app.use("/api/uploads", uploadRouter);

//const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/num__store/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "/num__store/build/index.html"));
//   });
// }
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server at http://localhost:${PORT}`);
});
