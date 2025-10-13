import { NextFunction, Request, Response } from "express";
import choicesModel from "../models/choicesModel";
import { ResourceNotFoundError } from "../utils/client-errors";
import StatusCode from "../utils/status-code";

export async function getChoices(request: Request, response: Response, next: NextFunction) {
    try {
        const choices = await choicesModel.getChoices()
        response.status(StatusCode.OK).json(choices);
    } catch (error) {
        next(error);
    }
}

export async function getChoiceById(request: Request, response: Response, next: NextFunction) {
    try {
        const choiceId = +request.params.id;
        const choice = await choicesModel.getChoiceById(choiceId);
        if (choice === undefined) throw new ResourceNotFoundError(choiceId);
        response.status(StatusCode.OK).json(choice);
    } catch (error) {
        next(error);
    }
}

export async function getChoicesByPollId(request: Request, response: Response, next: NextFunction) {
    try {
        const pollId = +request.params.pollId;
        const choices = await choicesModel.getChoicesByPollId(pollId);
        if (choices === undefined) throw new ResourceNotFoundError(pollId);
        response.status(StatusCode.OK).json(choices);
    } catch (error) {
        next(error);
    }
}

export async function createMultipleChoices(request: Request, response: Response, next: NextFunction) {
    try {
        const pollId = +request.params.pollId;
        const choices = request.body as string[];
        await choicesModel.createMultipleChoices(pollId, choices);
        response.sendStatus(StatusCode.Created);
    } catch (error) {
        next(error);
    }
}