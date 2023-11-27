const express = require("express");
const cors = require("cors");
const app = express();

const noAuthRouter = require("./router/noAuthRouter");
const authRouter = require("./router/authRouter");
const userRouter = require("./router/userRouter");
const eventRouter = require("./router/eventRouter");
const googleBucketRouter = require("./router/googleBucketRouter");

const authMiddleware = require("./middlewares/authMiddleware");

app.use(express.json());
app.use(cors());

app.use('/api', authRouter);
app.use('/api', authMiddleware, userRouter)
app.use('/events', eventRouter);
app.use('/bucket', googleBucketRouter);
app.use('/unAuth', noAuthRouter);

app.listen(process.env.PORT_SERVER, async () => {
  console.log(`Listening on port ${process.env.PORT_SERVER}`);
});