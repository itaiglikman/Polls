import type { DisplayPoll, NewPoll } from "../utils/types";
import axios from "axios";

const baseURL = "http://localhost:3000/api/"

export async function getPolls(): Promise<DisplayPoll[]> {
    const response = await axios.get<DisplayPoll[]>(baseURL + 'polls');
    console.log('getPolls response', response);
    const polls = response.data;
    return polls;
}

export async function createPoll(poll: NewPoll): Promise<void> {
    try {
        await axios.post<NewPoll>(baseURL + 'polls', poll);
    } catch (error) {
        throw new Error('Some error, please try again later')
    }
}

export default { getPolls, createPoll }