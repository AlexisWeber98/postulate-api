import { createUserController, loginController } from "../modules/users/usersControllers";
import { postPostulationController, getAllPostulationsController, getAllPostulationByIdController } from "../modules/postulations/postulationController";

const route = require('express').Router();

// postulations

route.post("/postulation", postPostulationController)
route.get("/postulations", getAllPostulationsController)
route.get("/postulation/:id", getAllPostulationByIdController)


// Users

route.post("/user", createUserController);
route.get("/login", loginController);   

export = route;