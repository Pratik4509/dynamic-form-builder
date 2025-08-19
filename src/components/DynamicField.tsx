import type { FieldConfig } from "../types";

interface Props {
    field: FieldConfig;
    value: any;
    handleChange: (id: string, value?: any) => void;
    error?: string;
}

export default function DynamicField({ field, value, handleChange, error }: Props) {
    const requiredClass = field?.required ? `after:ml-0.5 after:text-red-500 after:content-['*']` : '';

    switch (field.type) {
        case "select":
            return (
                <div className="mb-4">
                    <label htmlFor={field.id} className={`block text-sm font-medium mb-1 ${requiredClass}`}>{field.label}</label>
                    <select
                        value={value || ""}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        className="border rounded px-3 py-2 w-full"
                        id={field.id}
                    >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((opt) => (
                            <option key={opt?.value} value={opt?.value}>
                                {opt?.label}
                            </option>
                        ))}
                    </select>
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>
            );

        case "checkbox":
            return (
                <div className="mb-4 flex items-center">
                    <label className="text-sm font-medium" htmlFor={field.id}>{field.label}</label>
                    <input
                        type="checkbox"
                        checked={Boolean(value)}
                        onChange={(e) => handleChange(field.id, e.target.checked)}
                        className={`mr-2 ${requiredClass}`}
                        id={field.id}
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

                </div>
            );

        default:
            return (
                <div className="mb-4">
                    <label htmlFor={field.id} className={`block text-sm font-medium mb-1 ${requiredClass}`}>{field.label}</label>
                    <input
                        type={field.type}
                        name={field.id}
                        id={field.id}
                        value={value ? value : ""}
                        placeholder={field?.placeholder}
                        onChange={(e) => handleChange(field?.id, e.target.value)}
                        className="border rounded px-3 py-2 w-full"
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>
            );
    }
};