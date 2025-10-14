function validateCreator(value: string) {
    if (!value) return 'Creator is required';
    if (value.trim().length < 2) return 'Creator must be at least 2 chars';
    return null;
}

function validateTitle(value: string) {
    if (!value) return 'title is required';
    if (value.trim().length < 4) return 'Title must be at least 4 chars';
    return null;
}

function validateChoices(choices: string[]) {
    if (choices.length < 2) return 'At least 2 choices are required';
    if (new Set(choices).size !== choices.length) return 'Choices must be unique';
    return null;
}

export default {
    validateCreator, validateTitle, validateChoices
}