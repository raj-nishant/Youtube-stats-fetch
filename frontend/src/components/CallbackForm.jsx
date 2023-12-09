import React, { useState } from "react";
import SubmissionSuccess from "./SubmissionSuccess";

const CallbackForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [callbackTime, setCallbackTime] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [error, setError] = useState(null);

  const resetForm = () => {
    setName("");
    setContactNumber("");
    setCallbackTime("");
    setAdditionalComments("");
    setSubmissionSuccess(false);
    setError(null);
    onClose();
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const response = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          contactNumber,
          callbackTime,
          additionalComments,
        }),
      });

      if (response.ok) {
        // Submission successful, show success message
        setSubmissionSuccess(true);
      } else {
        const errorText = await response.text();
        throw new Error(
          `Server responded with status ${response.status}: ${errorText}`,
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Error submitting form. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-[#282828] p-8 text-white shadow-md">
      {submissionSuccess ? (
        <SubmissionSuccess onClose={resetForm} />
      ) : (
        <>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-white">
              <input
                type="text"
                className="mt-1 w-full rounded border bg-[#282828] p-2"
                value={name}
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm  text-white">
              <input
                type="text"
                className="mt-1 w-full rounded border bg-[#282828] p-2"
                value={contactNumber}
                placeholder="Mobile Number"
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm  text-white">
              <input
                type="text"
                className="mt-1 w-full rounded border bg-[#282828] p-2"
                value={callbackTime}
                placeholder="Preffered Callback Time"
                onChange={(e) => setCallbackTime(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm  text-white">
              <textarea
                className="mt-1 w-full rounded border bg-[#282828] p-2"
                value={additionalComments}
                placeholder="Any Additional Comments or Questions:"
                onChange={(e) => setAdditionalComments(e.target.value)}
              />
            </label>
          </div>
          <button
            className={`rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ${
              submitting && "opacity-50"
            }`}
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </>
      )}
    </div>
  );
};

export default CallbackForm;
