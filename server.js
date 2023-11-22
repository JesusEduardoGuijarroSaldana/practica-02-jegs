const express = require("express");
const routeLogin = require("./src/routes/auth.route");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/partners/v2/users", routeLogin);

app.listen(port, () => {
  console.log("Servidor corriendo en el puerto: ", port);
});
