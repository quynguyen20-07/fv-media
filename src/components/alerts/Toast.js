import React from "react";

const Toast = ({ message, handleShow, bgColor }) => {
  return (
    <div
      className={`toast show position-fixed  ${bgColor}`}
      style={{ top: "5px", right: "5px", minWidth: "200px", zIndex: 50 }}
    >
      <div className={`toast-header  ${bgColor}`}>
        <strong className="mr-auto text-light">{message.title}</strong>
        <button
          type="button"
          className="ml-2 mb-1 close"
          data-dismiss="toast"
          onClick={handleShow}
        >
          &times;
        </button>
      </div>
      <div className="toast-body text-light">{message.body}</div>
    </div>
  );
};

export default Toast;
