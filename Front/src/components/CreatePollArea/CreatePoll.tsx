import { Button, Container, Paper, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import formUtils from '../../utils/formUtils';
import pollsService from '../../services/pollsService';
import notifyService from '../../services/NotifyService';

export function CreatePoll() {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { creator: '', title: '', choices: ['', ''] },
        validate: {
            creator: (value) => formUtils.validateCreator(value),
            title: (value) => formUtils.validateTitle(value),
            // validate choices on submit
        }
    });

    async function handleSubmit(values: { creator: string, title: string; choices: string[] }) {
        try {
            form.clearErrors();
            const validation = form.validate();
            if (validation.hasErrors) return;

            // remove empty choices
            const cleanChoices = values.choices
                .map(c => c.trim())
                .filter(c => c.length > 0);

            const choicesError = formUtils.validateChoices(cleanChoices);
            if (choicesError) {
                form.setErrors({ choices: choicesError });
                return;
            }

            const pollData = {
                creator: values.creator,
                title: values.title,
                choices: cleanChoices
            };

            setIsLoading(true);
            await pollsService.createPoll(pollData);            
            notifyService.success('Poll created successfully!')
            navigate('/');
            
        } catch (error: any) {
            form.setErrors({ form: error.message });
        } finally {
            setIsLoading(false);
        }
    }

    function addChoice() {
        const currentChoices = form.values.choices || [];
        if (currentChoices.length < 8)
            form.setFieldValue('choices', [...currentChoices, '']);
    }

    return (
        <Container size={420} my={40}>
             <Button onClick={() => navigate('/')} mb={20}> Home</Button>
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
                    {(form.values.choices || []).map((_, i) => (
                        <TextInput
                            label={`option ${i + 1}`}
                            type='text'
                            withAsterisk={i < 2}
                            mt="md"
                            radius="md"
                            key={form.key(`choices.${i}`)}
                            {...form.getInputProps(`choices.${i}`)}
                        />
                    ))}
                    <Button
                        onClick={() => addChoice()}
                        disabled={(form.values.choices?.length || 0) >= 8}>
                        ➕ add option
                    </Button>
                    {form.errors.choices && (
                        <Text c="red" size="sm" mt="sm">
                            {form.errors.choices}
                        </Text>
                    )}
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
                        onClick={() => form.clearErrors()}
                    >
                        Create
                    </Button>
                </Paper>
            </form>
        </Container>
    );
}
