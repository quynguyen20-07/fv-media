import React from "react";
import loadingImg from "../../images/loading.gif";

const Loading = () => {
  return (
    <div
      className="position-fixed w-100 h-100 text-center loading"
      style={{
        background: "#F5F5F5",
        color: "white",
        top: '50%',
        left: 0,
        zIndex: 50,
      }}
    >
      <div className="loading-div">
        <img src={loadingImg} alt="" className="loadingImg" />
      </div>
      <div className="text-loading">
        Loading
      </div>
    </div>
  );
};

export default Loading;
