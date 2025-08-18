import axios from 'axios';
import type { FormSchema } from './types';

export const SCHEMA_URL = 'https://gist.githubusercontent.com/parthgharpure10/a150d06ce590d360d6e3182fc14aaf12/raw/dynamic_form.json';

export async function fetchSchema(): Promise<FormSchema> {
    const res = await axios.get<FormSchema>(SCHEMA_URL);
    return res.data;
}

export async function submitForm(endpoint: string | undefined, payload: any) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
        ok: true,
        message: 'Submitted successfully',
        data: payload,
    };
}
