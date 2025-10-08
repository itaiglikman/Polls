import { Button, Container, Paper, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import classes from './CreatePoll.module.css';

export function validateCreator(value: string) {
    if (!value) return ('Creator is required');
    if (value.trim().length < 2) return ('Creator must be at least 2 chars')
    return null;
}
export function validateTitle(value: string) {
    if (!value) return ('title is required');
    if (value.trim().length < 4) return ('title must be at least 4 chars')
    return null;
}

export function validateChoice(value: string) {
    if (!value) return ('choice is required');
    if (value.trim().length < 2) return ('choice must be at least 2 chars')
    return null;
}

export function CreatePoll() {

    const [isLoading, setIsLoading] = useState(false);
    const [choicesCount, setChoicesCount] = useState<number>(2)
    const navigate = useNavigate();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { creator: '', title: '', choice: '' },
        validate: {
            creator: (value) => validateCreator(value),
            title: (value) => validateTitle(value),
            choice: (value) => validateChoice(value)
        },
    });

    async function handleSubmit(values: { title: string; choice: string }) {
        try {
            form.clearErrors();
            if (form.validate().hasErrors) return;

            setIsLoading(true);

            // Auth logic
            // const data = await loginUser(values.title, values.choice);
            navigate('/');

        } catch (error: any) {
            form.setErrors({ form: error.message });
            console.error('Error logging in: ', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Welcome back!
            </Title>
            <Text className={classes.subtitle}>
                Do not have an account yet? <Link to={'/register'}>Create account</Link>
            </Text>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
                    <TextInput
                        label='creator'
                        type='text'
                        placeholder="username"
                        withAsterisk
                        radius="md"
                        key={form.key('creator')}
                        {...form.getInputProps('creator')}
                        onBlur={() => form.validateField('creator')}
                    />
                    <TextInput
                        label="title"
                        type='text'
                        placeholder="title"
                        withAsterisk
                        radius="md"
                        key={form.key('title')}
                        {...form.getInputProps('title')}
                        onBlur={() => form.validateField('title')}
                    />
                    {Array.from({ length: choicesCount }, (_, i) => (
                        <TextInput
                            label={`option ${i + 1}`}
                            type='text'
                            withAsterisk
                            mt="md"
                            radius="md"
                            key={form.key(`choice${i}`)}
                            {...form.getInputProps(`choice${i}`)}
                            onBlur={() => form.validateField(`choice`)}
                        />
                    ))}
                    <Button onClick={() => setChoicesCount(choicesCount + 1)} disabled={choicesCount >= 8}>
                        ➕ add option
                    </Button>
                    {form.errors.form && (
                        <Text c="red" size="sm" mt="sm">
                            {form.errors.form}
                        </Text>
                    )}
                    <Button
                        type='submit'
                        loading={isLoading}
                        fullWidth
                        mt="xl"
                        radius="md"
                        className={classes.loginButton}
                        onClick={() => form.clearErrors()}
                    >
                        Create
                    </Button>
                </Paper>
            </form>
        </Container>
    );
}
