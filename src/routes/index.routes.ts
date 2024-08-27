import { createUserController, loginController } from "../modules/users/usersControllers";
import { postPostulationController, getAllPostulationsController } from "../modules/postulations/postulationController";
import { getAllPostulations } from "../modules/postulations/postulationService";

const route = require('express').Router();

route.post("/user", createUserController);
route.post("/postulation", postPostulationController)

route.get("/postulations", getAllPostulations)
route.get("/login", loginController);   

export = route;