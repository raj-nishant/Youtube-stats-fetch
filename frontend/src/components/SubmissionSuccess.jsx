import submissionImg from "../assets/submission.svg";

const SubmissionSuccess = ({ onClose }) => {
  return (
    <div className="mb-4">
      <img className="m-auto mb-3" src={submissionImg} alt="" />
      <p className="mb-3 font-bold">Request a call back</p>
      <p className="mb-1">Our Team will call you shortly in 12-24 hrs</p>
      <p>Can’t you wait for call?</p>
      <button
        className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-white"
        onClick={onClose}
      >
        Check another video
      </button>
    </div>
  );
};
export default SubmissionSuccess;
