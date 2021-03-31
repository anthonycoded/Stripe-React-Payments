let express = require("express");
let cors = require("cors");

// Express Route
const payRoute = require("./routes/payments.route");

const app = express();
app.use(cors())
app.use(express.json());
app.use("/checkout", payRoute);

//start server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`server is running on ${port}`));
