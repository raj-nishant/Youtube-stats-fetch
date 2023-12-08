import React, { useState } from "react";
import SubmissionSuccess from "./SubmissionSuccess";

const CallbackForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [callbackTime, setCallbackTime] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      const response = await fetch("http://localhost:8000", {
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
        // Request successful, set submission success state
        setSubmissionSuccess(true);
      } else {
        // Request failed, handle error
        console.error("Failed to submit callback request");
      }
    } catch (error) {
      console.error("Error submitting callback request:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setName("");
    setContactNumber("");
    setCallbackTime("");
    setAdditionalComments("");
    setSubmissionSuccess(false);
    onClose();
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
        </>
      )}
    </div>
  );
};

export default CallbackForm;
