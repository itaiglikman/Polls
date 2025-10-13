import { NextFunction, Request, Response } from "express";
import votesModel from "../models/votesModel";
import { ForbiddenError } from "../utils/client-errors";
import StatusCode from "../utils/status-code";
import { Vote } from "../utils/types";


export async function getVotesByPollId(request: Request, response: Response, next: NextFunction) {
    try {
        const pollId = +request.params.pollId;
        const votes = await votesModel.getVotesByPollId(pollId);
        response.status(StatusCode.OK).json(votes);
    } catch (error) {
        next(error);
    }
}

export async function getVoteCountsByPollId(request: Request, response: Response, next: NextFunction) {
    try {
        const pollId = +request.params.pollId;
        const votes = await votesModel.getVoteCountsByPollId(pollId);
        response.status(StatusCode.OK).json(votes);
    } catch (error) {
        next(error);
    }
}

export async function addVote(request: Request, response: Response, next: NextFunction) {
    try {
        const vote = request.body as Vote;
        await votesModel.addVote(vote);
        response.sendStatus(StatusCode.Created);
    } catch (error) {
        // handle double voting by the same user
        if (error.name === 'SequelizeUniqueConstraintError')
            throw new ForbiddenError('User already voted for this poll')
        next(error);
    }
}