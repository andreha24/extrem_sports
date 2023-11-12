const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const userRouter = require("./router/authRouter");
const coachRouter = require("./router/coachRouter");

app.use("/api", userRouter);

app.listen(process.env.PORT_SERVER, async () => {
  console.log(`Listening on port ${process.env.PORT_SERVER}`);
});
