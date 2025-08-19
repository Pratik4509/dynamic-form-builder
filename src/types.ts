export type FieldType = 'text' | 'email' | 'number' | 'date' | 'select' | 'checkbox';

export interface VisibleWhenConfig {
    field: string;
    value: any;
}

export interface FieldConfig {
    id: string
    label?: string;
    type?: FieldType;
    placeholder?: string;
    required?: boolean;
    options?: { label: string; value: string }[];
    validation?: {
        message?: string;
        pattern?: string;
        min?: number;
        max?: number;
        minAge?: number;
        minLength?: number;
        maxLength?: number;
    };
    visibleWhen?: VisibleWhenConfig;
}

export interface StepConfig {
    stepId?: string
    title?: string;
    fields: FieldConfig[];
}

export interface FormSchema {
    formId: string
    title?: string;
    description?: string;
    steps: StepConfig[];
    submit?: {
        label?: string
        successMessage?: string
        errorMessage?: string
        postSubmitAction?: string
    }
}
