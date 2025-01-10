import { createUserController, loginController, userUpdateController, deleteUserController } from "../modules/users/usersControllers";
import { postPostulationController, getAllPostulationsController, getPostulationByIdController, updatePostulationController, deletePostulationController } from "../modules/postulations/postulationController";

const route = require('express').Router();

// postulations

route.post("/postulation", postPostulationController)
route.get("/postulations", getAllPostulationsController)
route.get("/postulation/:id", getPostulationByIdController)
route.put("/postulation/:id", updatePostulationController)
route.delete('/postulation/:id', deletePostulationController)


// Users

route.post("/user", createUserController);
route.get("/login", loginController);   
route.put('/user/:id', userUpdateController)
route.delete('/usrer/:id', deleteUserController)

export = route;