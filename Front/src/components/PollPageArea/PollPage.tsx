import { Button, Radio, TextInput } from "@mantine/core";
import { useEffect, useState } from 'react';
import "./PollPage.css";

interface PollPageProps {
    pollId: number,
    creator: string,
    title: string,
    choices: [string]
}

export function PollPage() {
    const [username, setUsername] = useState<string>('');
    const [choice, setChoice] = useState('');
    const [validUsername, setValidUsername] = useState<boolean>(false);

    useEffect(()=>{
        getPoll()
    },[])

    async function getPoll() {

    }

    async function sendVote() {
        
    }

    async function saveUsername() {
        // check if username already voted for this pollId
        console.log(username);
        setValidUsername(true);
    }

    return (
        <div className="PollPage">

            <TextInput
                label='Insert Username'
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value)
                    setValidUsername(false)
                }}
                minLength={2}
                withAsterisk
            />

            <Button onClick={saveUsername} disabled={username.length < 2}>save</Button>

            <Radio.Group
                value={choice}
                onChange={setChoice}
                name="favoriteFramework"
                label="Select your favorite framework/library"
            >
                <Radio value="react" label="React" disabled={!validUsername} />
                <Radio value="svelte" label="Svelte" disabled={!validUsername} />
                <Radio value="ng" label="Angular" disabled={!validUsername} />
                <Radio value="vue" label="Vue" disabled={!validUsername} />
            </Radio.Group>

            <Button disabled={!choice || !validUsername} onClick={sendVote}>Vote</Button>
        </div>
    );
}
