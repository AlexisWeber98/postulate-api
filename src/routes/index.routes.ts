import {
  createUserController,
  loginController,
  userUpdateController,
  deleteUserController,
} from "../modules/users/usersControllers.js";
import {
  postPostulationController,
  getAllPostulationsController,
  getPostulationByIdController,
  updatePostulationController,
  deletePostulationController,
} from "../modules/postulations/postulationController.js";

import express from "express";
const route = express.Router();

// { ------------- Postulations --------------- } \\

route.post("/postulation", postPostulationController);
route.get("/postulations/:id", getAllPostulationsController);
route.get("/postulation/:id", getPostulationByIdController);
route.patch("/postulation", updatePostulationController);
route.delete("/postulation/:id", deletePostulationController);

// { ------------- Users --------------- } \\

route.post("/user", createUserController);
route.get("/login", loginController);
route.patch("/user/:id", userUpdateController);
route.delete("/usrer/:id", deleteUserController);

export default route;
