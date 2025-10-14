import type { DisplayPoll, FullPoll, NewPoll, Vote } from "../utils/types";
import axios from "axios";

const baseURL = "http://localhost:3000/api/"
const pollRoute = baseURL + "polls";
const voteRoute = baseURL + "votes";

async function getPolls(): Promise<DisplayPoll[]> {
    const response = await axios.get<DisplayPoll[]>(pollRoute);
    const polls = response.data;
    polls.forEach(p => {
        p.link = 'http://localhost:3000/polls/poll-page/' + p.id;
    })
    return polls;
}

async function getFullPoll(pollId: number): Promise<FullPoll> {
    try {
        const response = await axios.get(pollRoute + '/fullPoll/' + pollId);
        const poll: FullPoll = response.data;
        return poll;
    } catch (error: any) {
        const msg = error?.response.status < 500
            ? error.response.data.message
            : 'Some error, please try again later';
        console.error('Error fetching polls:', error);
        throw new Error(msg);
    };
}

async function createPoll(poll: NewPoll): Promise<void> {
    try {
        await axios.post<NewPoll>(pollRoute, poll);
    } catch (error: any) {
        const msg = error?.response.status < 500
            ? error.response.data.message
            : 'Some error, please try again later';
        console.error('Error creating poll:', error);
        throw new Error(msg);
    }
}

async function createVote(vote: Vote): Promise<void> {
    try {
        await axios.post<Vote>(voteRoute, vote);
    } catch (error: any) {
        let msg = error?.response.status < 500
            ? error.response.data.message
            : 'Some error, please try again later';
        throw new Error(msg)
    }
}

export default { getPolls, createPoll, getFullPoll, createVote }