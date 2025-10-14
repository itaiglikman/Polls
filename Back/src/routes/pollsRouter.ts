import express from "express";
import { createPoll, getPollById, getPolls, getPollWithChoicesByPollId, getPollWithVotesCount } from "../controllers/pollsController";

const router = express.Router();

router.get('/', getPolls);
router.get('/:id', getPollById);
router.get('/fullPoll/:id', getPollWithChoicesByPollId);
// router.get('/fullPoll/:id', getPollWithVotesCount);

// type NewPoll = {
//     creator: string;
//     title: string;
//     choices: string[];
// }
router.post('/', createPoll);

export default router;