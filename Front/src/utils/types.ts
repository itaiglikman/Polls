export type DisplayPoll = {
    id: number,
    creator: string,
    title: string,
    link?: string
}

export type NewPoll = {
    creator: string,
    title: string,
    choices: string[]
}

export type FullPoll = {
    id: number,
    creator: string,
    title: string,
    choices: Choice[],
}

export type Choice = {
    id: number,
    text: string,
    voteCount: number
}

export type VoteCount = {
    id: number,
    count: number
}

export type Vote = {
    pollId: number,
    username: string,
    choiceId: number
}

