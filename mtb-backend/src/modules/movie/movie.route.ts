import express from "express";
import * as MovieController from "./movie.controller";
import { validate } from "../../middlewares/validate";
import { createMovieZodSchema } from "./movie.validation";


const router = express.Router();

router.post("/", validate(createMovieZodSchema), MovieController.createMovieController);
router.get("/", MovieController.getAllMoviesController);
router.get("/recommended", MovieController.getTopMovieByVotesController);
router.get("/:id", MovieController.getMovieByIdController);

export default router;