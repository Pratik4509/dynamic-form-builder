import React from "react";
import type { SubmissionSummary } from "../types";

interface Props {
  summary: SubmissionSummary;
  onBack: () => void;
}

const ConfirmationView: React.FC<Props> = ({ summary, onBack }) => {
  return (
    <div className="p-6 border rounded bg-green-50">
      <div className="mt-6 border p-4 rounded bg-gray-50">
        <h2 className="text-lg font-bold mb-2">Submission Summary</h2>
        <p>
          <strong>Submitted on:</strong>{" "}
          {new Date(summary.timestamp).toLocaleString()}
        </p>
        <div className="mt-2">
          {Object.entries(summary.data).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {String(value)}
            </p>
          ))}
        </div>
      </div>
      <button
        onClick={onBack}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Back
      </button>
    </div>
  );
};

export default ConfirmationView;
