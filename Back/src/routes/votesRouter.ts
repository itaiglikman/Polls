import express from "express";
import { addVote, getVoteCountsByPollId, getVotesByPollId } from "../controllers/votesController";

const router = express.Router();

router.get('/:pollId', getVotesByPollId);
router.get('/count/:pollId', getVoteCountsByPollId);
router.post('/', addVote);

export default router;