import {postPostulationController, getAllPostulationsController} from "./postulationController";

const router = require("express").Router();

router.post("/postulation", postPostulationController);
router.get("/postulations", getAllPostulationsController);