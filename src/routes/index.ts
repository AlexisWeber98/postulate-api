import login from "../controllers/get/getLogin";
import postPostulations from "../controllers/post/postPostulation";
import postUser from "../controllers/post/postUser";
import getPostlations from "./../controllers/get/getPostulations";

    import { Router } from "express";
const router = Router();

router.get("/postulations", getPostlations);
router.get("/login", login);
router.post("/postulations", postPostulations);
router.post("/user", postUser);

export = router;
