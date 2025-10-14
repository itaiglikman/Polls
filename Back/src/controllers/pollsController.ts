import { NextFunction, Request, Response } from "express";
import StatusCode from "../utils/status-code";
import pollsModel from "../models/pollsModel";
import { ResourceNotFoundError } from "../utils/client-errors";
import votesModel from "../models/votesModel";
import choicesModel from "../models/choicesModel";

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

export async function getPollWithVotesCount(request: Request, response: Response, next: NextFunction) {
    try {
        const pollId = +request.params.id;
        const poll = await pollsModel.getPollWithChoicesByPollId(pollId);
        const votesCount = await votesModel.getVoteCountsByPollId(pollId);
        
        const votesMap = new Map(votesCount.map(vote => [vote.choiceId, vote.count]));
        
        // Add vote count to each choice (default to 0 if no votes)
        const choicesWithVotes = poll.choices.map(choice => ({
            ...choice,
            voteCount: votesMap.get(choice.id) || 0
        }));
        
        const pollWithVotes = {
            ...poll,
            choices: choicesWithVotes
        };
        
        response.status(StatusCode.OK).json(pollWithVotes);
    } catch (error) {
        next(error);
    }
}

export async function createPoll(request: Request, response: Response, next: NextFunction) {
    try {
        const { creator, title, choices } = { ...request.body }
        const newPoll = await pollsModel.createPoll({ creator, title })
        await choicesModel.createMultipleChoices(newPoll.id, choices);
        response.status(StatusCode.Created).json(newPoll);
    } catch (error) {
        next(error);
    }
}