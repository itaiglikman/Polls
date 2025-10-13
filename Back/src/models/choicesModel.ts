import { QueryTypes } from "sequelize";
import { sequelize } from "../../app";
import { Choice } from "../utils/types";

async function getChoices(): Promise<Choice[]> {
    const query = 'SELECT * FROM choices';
    const choices = await sequelize.query(query, { type: QueryTypes.SELECT }) as Choice[];
    return choices;
}

async function getChoiceById(id: number): Promise<Choice> {
    const query = 'SELECT * FROM choices WHERE id = ?';
    const [result] = await sequelize.query(query, { replacements: [id], type: QueryTypes.SELECT });
    const choice = result as Choice;
    return choice;
}

async function getChoicesByPollId(pollId: number): Promise<{id:number,text:string}[]> {
    const query = 'SELECT id, text FROM choices WHERE pollId = ?';
    const result = await sequelize.query(query, { replacements: [pollId], type: QueryTypes.SELECT });
    const choices = result as {id:number,text:string}[];
    return choices;
}

async function createMultipleChoices(pollId: number, choices: string[]): Promise<void> {
    const placeholders = choices.map(() => '(?, ?)').join(', ');
    const values = choices.flatMap(choice => [pollId, choice]);
    const query = `INSERT into choices (pollId,text) Values ${placeholders}`;
    await sequelize.query(query, { replacements: values, type: QueryTypes.INSERT });
}

export default {
    getChoices, getChoiceById, getChoicesByPollId, createMultipleChoices
}