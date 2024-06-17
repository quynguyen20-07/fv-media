import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "../../redux/actions/profileAction";

const FollowBtn = ({ user }) => {
  const [followed, setFollowed] = useState(false);

  const { auth, profile, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (auth.user.following.find((item) => item._id === user._id)) {
      setFollowed(true);
    }
  }, [auth, user.following, user._id]);

  const handlefollow = async () => {
    if (load) return;
    setFollowed(true);
    setLoad(true);
    await dispatch(follow({ users: profile.users, user, auth, socket }));
    setLoad(false);
  };

  const handleUnfollow = async () => {
    if (load) return;
    setFollowed(false);
    setLoad(true);
    await dispatch(unfollow({ users: profile.users, user, auth, socket }));
    setLoad(false);
  };

  return (
    <>
      {followed ? (
        <button
          className="btn btn-outline-danger h-25"
          onClick={handleUnfollow}
        >
          Unfollow
        </button>
      ) : (
        <button className="btn btn-outline-info h-25" onClick={handlefollow}>
          Follow
        </button>
      )}
    </>
  );
};

export default FollowBtn;
