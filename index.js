import express from "express";
import dotenv from "dotenv";
import sequelize from "./database/dbConnection.js";
import userRouter from "./modules/user/user.router.js";
import taskRouter from "./modules/task/task.router.js";
import globalError from "./middleware/globalError.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;


// connect to database and sync schema
sequelize.sync({ force: true });
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", taskRouter);




app.use(globalError);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
