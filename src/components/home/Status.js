import React from "react";
import Avatar from "../Avatar";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Status = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="status my-3 d-flex">
      <Avatar src={auth.user.avatar} size="big-avatar" />
      <button
        className="sttBtn ml-4 p-auto"
        onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
      >
        <p className="text mt-3 ml-2">
          <em>
            {auth.user.fullname} Share your status.
          </em>
        </p>
      </button>
    </div>
  );
};

export default Status;
