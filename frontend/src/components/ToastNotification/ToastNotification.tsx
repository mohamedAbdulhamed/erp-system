import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastNotification = () => {
  return (
    <div className="notification">
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ToastNotification;
