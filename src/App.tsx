import { useEffect, useState } from "react";
import { fetchSchema } from "./apis";
import type { FormSchema } from "./types";
import DynamicField from "./components/DynamicField";
import type { FieldConfig } from "./types";


function App() {
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    fetchSchema()
      .then(setSchema);
  }, []);

  if (!schema) {
    return <div>Loading form...</div>;
  }

  console.log(formData);

  const handleChange = (id: string, value?: any) => {
    console.log(id, value);


    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{schema?.title}</h1>
      <h2>{schema?.description}</h2>

      {schema?.steps?.[0].fields.map((field: FieldConfig) => (
        <div key={field.label}>
          <DynamicField
            field={field}
            value={formData[field?.id] ? formData[field?.id] : ""}
            handleChange={(id, value) => handleChange(id, value)}
          />
        </div>
      ))}
    </div>
  );
};

export default App;