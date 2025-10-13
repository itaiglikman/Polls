import { NextFunction, Request, Response } from "express";
import StatusCode from "../utils/status-code";
import pollsModel from "../models/pollsModel";
import { ResourceNotFoundError } from "../utils/client-errors";
import votesModel from "../models/votesModel";

export async function getPolls(request: Request, response: Response, next: NextFunction) {
    try {
        const polls = await pollsModel.getPolls()
        response.status(StatusCode.OK).json(polls);
    } catch (error) {
        next(error);
    }
}

export async function getPollById(request: Request, response: Response, next: NextFunction) {
    try {
        const pollId = +request.params.id;
        const poll = await pollsModel.getPollById(pollId);
        if (poll === undefined) throw new ResourceNotFoundError(pollId);
        response.status(StatusCode.OK).json(poll);
    } catch (error) {
        next(error);
    }
}

export async function getPollWithChoicesByPollId(request: Request, response: Response, next: NextFunction) {
    try {
        const pollId = +request.params.id;
        const poll = await pollsModel.getPollWithChoicesByPollId(pollId);
        response.status(StatusCode.OK).json(poll);
    } catch (error) {
        next(error);
    }
}

// no use for now
export async function getPollWithVotesCount(request: Request, response: Response, next: NextFunction) {
    try {
        const pollId = +request.params.id;
        const poll = await pollsModel.getPollWithChoicesByPollId(pollId);
        const votesCount = await votesModel.getVoteCountsByPollId(pollId);
        console.log(votesCount);
        response.status(StatusCode.OK).json(poll);
    } catch (error) {
        next(error);
    }
}

export async function createPoll(request: Request, response: Response, next: NextFunction) {
    try {
        const newPoll = await pollsModel.createPoll(request.body)
        response.status(StatusCode.Created).json(newPoll);
    } catch (error) {
        next(error);
    }
}