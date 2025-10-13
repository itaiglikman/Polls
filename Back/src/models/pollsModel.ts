import { QueryTypes } from "sequelize";
import { sequelize } from "../../app";
import { FullPoll, Poll, PollBody } from "../utils/types";
import { ResourceNotFoundError } from "../utils/client-errors";
import choicesModel from "./choicesModel";

async function getPolls(): Promise<Poll[]> {
    const query = 'SELECT * FROM polls';
    const polls = await sequelize.query(query, { type: QueryTypes.SELECT }) as Poll[];
    return polls;
}

async function getPollById(id: number): Promise<Poll> {
    const query = 'SELECT * FROM polls WHERE id = ?';
    const [result] = await sequelize.query(query, { replacements: [id], type: QueryTypes.SELECT });
    if (result === undefined) throw new ResourceNotFoundError(id);
    const poll = result as Poll;
    return poll;
}

async function createPoll(pollBody: PollBody): Promise<Poll> {
    const query = 'INSERT into polls (creator,title) Values (:creator,:title)';
    const result = await sequelize.query(query, { replacements: pollBody, type: QueryTypes.INSERT });
    console.log('result ', result);
    const id = result[0];
    return { id, ...pollBody }
}

async function getPollWithChoicesByPollId(pollId: number): Promise<FullPoll> {
    const poll = await getPollById(pollId);
    const choices = await choicesModel.getChoicesByPollId(pollId);
    const fullPoll: FullPoll = { ...poll, choices };
    return fullPoll;
}


export default {
    getPolls, createPoll, getPollById, getPollWithChoicesByPollId
}