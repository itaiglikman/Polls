import { NextFunction, Request, Response } from "express";
import StatusCode from "../utils/status-code";
import pollsModel from "../models/pollsModel";
import { ResourceNotFoundError } from "../utils/client-errors";
import votesModel from "../models/votesModel";
import choicesModel from "../models/choicesModel";
import { PollBody } from "../utils/types";

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
        console.log('createPoll body',request.body);
        const { creator, title, choices } = { ...request.body }
        // const poll: PollBody = { creator: request.body.creator, title: request.body.creator }
        const newPoll = await pollsModel.createPoll({ creator, title })
        console.log('createPoll newPoll',newPoll);
        await choicesModel.createMultipleChoices(newPoll.id, choices);
        response.status(StatusCode.Created).json(newPoll);
    } catch (error) {
        next(error);
    }
}