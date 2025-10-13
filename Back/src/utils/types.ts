export type PollBody = {
    creator: string,
    title: string
}

export type Poll = {
    id: number,
    creator: string,
    title: string
}

export type FullPoll = {
    id: number,
    creator: string,
    title: string,
    choices: { id: number, text: string }[]
}

export type ChoiceBody = {
    pollId: number,
    text: string
}

export type Choice = {
    id: number,
    pollId: number,
    text: string
}

export type Vote = {
    pollId: number,
    username: string,
    choiceId: number
}
