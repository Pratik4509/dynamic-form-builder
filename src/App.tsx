import { useEffect, useState } from "react";
import { fetchSchema } from "./apis";
import type { FormSchema, FieldConfig } from "./types";
import DynamicField from "./components/DynamicField";

function App() {
    const [schema, setSchema] = useState<FormSchema | null>(null);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [currentStep, setCurrentStep] = useState(0);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        fetchSchema().then(setSchema);
    }, []);

    if (!schema) {
        return <div>Loading form...</div>;
    }

    const step = schema.steps[currentStep];

    const getVisibleFields = (fields: FieldConfig[]) => {
        return fields.filter((field) => {
            if (!field.visibleWhen) return true;
            const dependentValue = formData[field.visibleWhen.field];
            return dependentValue === field.visibleWhen.value;
        });
    };

    const visibleFields = getVisibleFields(step.fields);

    const handleChange = (id: string, value?: any) => {
        setFormData((prev) => ({ ...prev, [id]: value }));
        setErrors((prev) => ({ ...prev, [id]: "" }));
    };

    const validateStep = (): boolean => {
        const newErrors: Record<string, string> = {};

        const visibleFields = getVisibleFields(step.fields);

        visibleFields.forEach((field: FieldConfig) => {
            const value = formData[field.id];

            // 1. Required check
            if (field.required && (!value || value === "")) {
                newErrors[field.id] = field?.validation?.message || `${field.label} is required`;
                return;
            }

            if (typeof value === "number") {
                if (field.validation?.min !== undefined && value < field.validation.min) {
                    newErrors[field.id] = field.validation.message || `${field.label} is too small`;
                }
                if (field.validation?.max !== undefined && value > field.validation.max) {
                    newErrors[field.id] = field.validation.message || `${field.label} is too large`;
                }
            }

            if (typeof value === "string") {
                if (field.validation?.minLength !== undefined && value.length < field.validation.minLength) {
                    newErrors[field.id] = field.validation.message || `${field.label} is too short`;
                }
                if (field.validation?.maxLength !== undefined && value.length > field.validation.maxLength) {
                    newErrors[field.id] = field.validation.message || `${field.label} is too long`;
                }
            }

            if (field.validation?.minAge && field.type === "date" && value) {
                const today = new Date();
                const dob = new Date(value);
                let age = today.getFullYear() - dob.getFullYear();
                const monthDiff = today.getMonth() - dob.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                    age--;
                }

                if (age < field.validation.minAge) {
                    newErrors[field.id] = field.validation.message || `${field.label} is invalid`;
                }
            }

            if (field.validation?.pattern) {
                const regex = new RegExp(field.validation.pattern);

                if (value && !regex.test(value)) {
                    newErrors[field.id] = field.validation.message || `${field.label} format is invalid`;
                }
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleNext = () => {
        if (validateStep()) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleSubmit = () => {
        if (validateStep()) {
            console.log("✅ Form submitted:", formData);
            alert("Form submitted successfully!");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-3xl font-bold mb-2 text-center text-indigo-600">
                {schema?.title}
            </h1>
            <p className="text-gray-500 mb-6 text-center">{schema?.description}</p>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {`Step ${currentStep + 1} : ${step?.title}`}
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${((currentStep + 1) / schema.steps.length) * 100}%` }}
                />
            </div>
            {visibleFields.map((field) => (
                <div key={field.id} className="mb-4">
                    <DynamicField
                        field={field}
                        value={formData[field.id] ?? ""}
                        handleChange={handleChange}
                        error={errors[field.id]}
                    />
                </div>
            ))}

            <div className="flex justify-between mt-6">
                {currentStep > 0 && (
                    <button
                        onClick={handleBack}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
                    >
                        Back
                    </button>
                )}
                {currentStep < schema?.steps.length - 1 ? (
                    <button
                        onClick={handleNext}
                        className="ml-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md"
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        className="ml-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md"
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
}

export default App;
