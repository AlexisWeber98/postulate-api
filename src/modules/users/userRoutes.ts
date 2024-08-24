import { createUserController, loginController } from "./usersControllers";

const route = require('express').Route();

route.post("/user", createUserController);
route.get("/login", loginController);