import type { FieldConfig } from "../types";

interface Props {
    field: FieldConfig;
    value: any;
    handleChange: (id: string, value?: any) => void;
}

export default function DynamicField({ field, value, handleChange }: Props) {
    switch (field.type) {
        case "select":
            return (
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">{field.label}</label>
                    <select
                        value={value || ""}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        className="border rounded px-3 py-2 w-full"
                    >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((opt) => (
                            <option key={opt?.value} value={opt?.value}>
                                {opt?.label}
                            </option>
                        ))}
                    </select>
                </div>
            );

        case "checkbox":
            return (
                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        checked={Boolean(value)}
                        onChange={(e) => handleChange(field.id, e.target.checked)}
                        className="mr-2"
                    />
                    <label className="text-sm font-medium">{field.label}</label>
                </div>
            );

        default:
            return (
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">{field.label}</label>
                    <input
                        type={field.type}
                        name={field.id}
                        value={value ? value : ""}
                        onChange={(e) => handleChange(field?.id, e.target.value)}
                        className="border rounded px-3 py-2 w-full"
                    />
                </div>
            );
    }
};