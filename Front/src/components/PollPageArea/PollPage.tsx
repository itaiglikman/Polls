import { Button, Container, Group, Loader, Paper, Radio, Text, TextInput, Title } from "@mantine/core";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router";
import notifyService from "../../services/NotifyService";
import pollsService from "../../services/pollsService";
import { addVoteToPoll } from "../../utils/tableUtils";
import type { FullPoll, Vote } from "../../utils/types";
import "./PollPage.css";

export function PollPage() {

    const [poll, setPoll] = useState<FullPoll | null>(null);
    const [username, setUsername] = useState<string>('');
    const [selected, setSelected] = useState<string>(''); // transform to number on submit because of mantine requirements
    const [validUsername, setValidUsername] = useState<boolean>(false);
    const [displayVotes, setDisplayVotes] = useState<boolean>(false);

    const navigate = useNavigate();
    const params = useParams();
    let pollId: number;

    useEffect(() => {
        if (!params.pollId || +params.pollId < 0 || isNaN(+params.pollId)) {
            notifyService.error('Could not access the wanted poll');
            navigate('/');
        } else {
            pollId = +params.pollId;
            getPoll();
        }
    }, [])

    async function getPoll() {
        try {
            const poll = await pollsService.getFullPoll(pollId);
            setPoll(poll);
        }
        catch (error: any) {
            notifyService.error(error.message);
            navigate('/');
        };
    }

    async function sendVote() {
        try {
            const selectChoiceId = Number(selected)
            const vote: Vote = { pollId: poll?.id!, username, choiceId: selectChoiceId }
            await pollsService.createVote(vote);
            notifyService.success('Thanks for voting');
            setPoll(addVoteToPoll(poll,selectChoiceId))
            setDisplayVotes(true);
        } catch (error: any) {
            notifyService.error(error.message)
        }
    }

    if (!poll) return <Loader size={"xl"} color="indigo" type="oval" />

    return (
        <Container size={420} my={40}>
            <Button onClick={() => navigate('/')} mb={20}> Home</Button>
            <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
                <Title ta="center" className='title'>
                    Title: {poll.title}
                </Title>
                <Text className='subtitle'>
                    Creator: {poll.creator}
                </Text>

                <Group gap={5} visibleFrom="xs" align="flex-end">
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

                    <Button
                        onClick={() => setValidUsername(true)}
                        disabled={username.length < 2}>
                        save
                    </Button>
                </Group>

                <Radio.Group
                    value={selected}
                    onChange={(value) => setSelected(String(value))}
                    label={'Options'}
                    mt="md"
                    withAsterisk
                >
                    {poll.choices.map(choice =>
                        <Radio
                            value={String(choice.id)}
                            key={choice.id}
                            label={
                                displayVotes ?
                                    `${choice.text}` + ` | vote: ${choice.voteCount}`
                                    : `${choice.text}`
                            }
                            disabled={!validUsername} mb="xs"
                        />
                    )}
                </Radio.Group>

                <Group>
                    <Button
                        disabled={!selected || !validUsername}
                        onClick={sendVote}>
                        Vote
                    </Button>
                    <Button
                        onClick={() => setDisplayVotes(!displayVotes)}>
                        Display Votes
                    </Button>
                </Group>
            </Paper>
        </Container>
    );
}
