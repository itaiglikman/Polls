import { useForm } from "@mantine/form";

export function useRegisterForm() {

    const form =  useForm({
        mode: 'uncontrolled',
        initialValues: {
            userName: '',
        },

        validate: {
            userName: (value) => {
                if (!value) return 'Username is required';
                if (value.length < 2) return 'Username must be at least 2 characters long';
                if (value.length > 20) return 'Username must be less than 20 characters';
                if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
                return null;
            },
        },
    })

    return form;

}

