import express from "express";
import { createMultipleChoices, getChoices, getChoicesByPollId } from "../controllers/choicesController";

const router = express.Router();

router.get('/', getChoices);
router.get('/:pollId', getChoicesByPollId);
// check choices are array
router.post('/multipleChoices/:pollId', createMultipleChoices);

export default router;