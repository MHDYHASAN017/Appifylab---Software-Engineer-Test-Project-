const express = require("express");
const cors = require("cors");
const ConnectDB = require("./config/db");
const path = require("path");
const { errorHandler, notFound } = require("./middlewares/errorHandler");

//init main app
const app = express();

///connect database
ConnectDB();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

///Routes

const adminRoutes = require("./routers/adminRoutes");
const userRoutes = require("./routers/userRoutes");
const paymentRoutes = require("./routers/paymentRoutes");

// app.use('/api/post' , createPost)
app.use("/api/admin", adminRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/payment", paymentRoutes);

// error handler middlewares
app.use(notFound);
app.use(errorHandler);

///deployment

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api Running");
  });
}

///port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
