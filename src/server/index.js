const express = require('express');
var contactRouter = require("./routes/contact");
const app = express();

require('dotenv').config()

app.use(express.static('dist'));
app.use("/api/contact", contactRouter);
app.get('/*', function (req, res) {

  res.redirect("/");
 });
app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
