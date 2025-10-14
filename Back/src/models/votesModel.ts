import { QueryTypes } from "sequelize";
import { sequelize } from "../../app";
import { Vote } from "../utils/types";

async function getVotesByPollId(pollId: number): Promise<Vote[]> {
    const query = 'SELECT * FROM votes WHERE pollId = ?';
    const result = await sequelize.query(query, { replacements: [pollId], type: QueryTypes.SELECT });
    const votes = result as Vote[];
    return votes;
}

async function getVoteCountsByPollId(pollId: number): Promise<{ choiceId: number, count: number }[]> {
    const query = `
        SELECT 
            choiceId,
            COUNT(*) as count
        FROM votes 
        WHERE pollId = ?
        GROUP BY choiceId
        ORDER BY choiceId ASC
    `;
    const result = await sequelize.query(query, { replacements: [pollId], type: QueryTypes.SELECT });
    return result as { choiceId: number, count: number }[];
}

async function addVote(vote: Vote): Promise<void> {
    const query = `INSERT into votes (pollId, username, choiceId) Values (:pollId, :username, :choiceId)`;
    await sequelize.query(query, { replacements: vote, type: QueryTypes.INSERT });
}

export default {
    getVotesByPollId, getVoteCountsByPollId, addVote
}