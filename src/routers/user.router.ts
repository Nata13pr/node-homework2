import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getList);
router.post("/", userController.create);

router.get("/:userId", userController.getById);
router.delete("/:userId", userController.delete);
router.put("/:userId", userController.put);

export const userRouter = router;
