// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { fileURLToPath } from "url";


// Utiles
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors(
  {
    origin:[""],
    methods: ["GET", "POST"],
    credentials:true
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'./client/dist')))

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});


app.use("/uploads", express.static(path.join(__dirname + "/uploads")));


app.use('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/dist/index.html'))
})
app.listen(port, () => console.log(`Server running on port: ${port}`));
