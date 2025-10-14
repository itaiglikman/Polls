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

