import {
  createUserController,
  loginController,
  userUpdateController,
  deleteUserController,
} from "../modules/users/usersControllers";
import {
  postPostulationController,
  getAllPostulationsController,
  getPostulationByIdController,
  updatePostulationController,
  deletePostulationController,
} from "../modules/postulations/postulationController";

const route = require("express").Router();

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

export = route;
