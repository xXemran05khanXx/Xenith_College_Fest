const express = require('express');
const app = express();
const mongoose = require("mongoose");
const { mongoUrl } = require("./keys");
const cors = require("cors");
const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB models
require('./models/model');
require('./models/post');

// API routes
app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));
app.use(require("./routes/user"));
app.use(require("./routes/category"));
app.use("/api/ml", require("./routes/mlRoutes"));

// MongoDB connection
mongoose.set('strictQuery', true); // Suppress warning
mongoose.connect(mongoUrl);
mongoose.connection.on("connected", () => {
    console.log("successfully connected to mongo");
});
mongoose.connection.on("error", () => {
    console.log("not connected to mongodb");
});

// ✅ Serve React frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("server is running on port " + port);
});
