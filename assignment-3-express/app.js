const path = require("path");

const express = require("express");

const adminRoutes = require("./routes/admin");
const appRoutes = require("./routes/app");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(adminRoutes);
app.use(appRoutes);

app.listen(3200);
