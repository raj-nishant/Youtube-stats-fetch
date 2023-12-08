import logo from "../assets/logo.svg";
import callingIcon from "../assets/callingIcon.svg";
import CallbackForm from "./CallbackForm";
import { useState } from "react";

const Header = () => {
  const [isCallbackFormVisible, setCallbackFormVisible] = useState(false);

  const toggleCallbackForm = () => {
    setCallbackFormVisible(!isCallbackFormVisible);
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex  ">
          <img src={logo} alt="sdfs" />
          <p className="ml-4 font-[sora] text-[28px] font-[600] text-white">
            anchors
          </p>
        </div>
        <div className="flex rounded-full border px-5">
          <img className="m-auto h-4 w-4" src={callingIcon} alt="" />
          <button className="ml-2 text-white" onClick={toggleCallbackForm}>
            Request a call back
          </button>
        </div>
      </div>
      {isCallbackFormVisible && <CallbackForm onClose={toggleCallbackForm} />}
    </>
  );
};

export default Header;
