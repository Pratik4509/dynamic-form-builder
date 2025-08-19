import { useEffect, useState } from "react";
import { fetchSchema } from "./apis";
import type { FormSchema } from "./types";
import DynamicField from "./components/DynamicField";
import type { FieldConfig } from "./types";

function App() {
    const [schema, setSchema] = useState<FormSchema | null>(null);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        fetchSchema().then(setSchema);
    }, []);

    if (!schema) {
        return <div className="text-center py-6 text-gray-600">Loading form...</div>;
    }

    const step = schema?.steps[currentStep];

    const handleChange = (id: string, value?: any) => {
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleNext = () => {
        if (currentStep < schema.steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleSubmit = () => {
        console.log("✅ Form submitted:", formData);
        alert("Form submitted successfully!");
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
            {step?.fields.map((field: FieldConfig) => (
                <div key={field.id} className="mb-4">
                    <DynamicField
                        field={field}
                        value={formData[field?.id] ?? ""}
                        handleChange={(id, value) => handleChange(id, value)}
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
