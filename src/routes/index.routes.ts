import { createUserController, loginController } from "../modules/users/usersControllers";
import { postPostulationController, getAllPostulationsController } from "../modules/postulations/postulationController";
const route = require('express').Router();

// postulations

route.post("/postulation", postPostulationController)
route.get("/postulations", getAllPostulationsController)


// Users

route.post("/user", createUserController);
route.get("/login", loginController);   

export = route;