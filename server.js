const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const path = require("path");
const routes = require("./routes")
const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(routes);

app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/fitness',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});