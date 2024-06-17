import React, { useEffect, useState } from "react";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";
import EditProfile from "./EditProfile";
import FollowBtn from "./FollowBtn";
import Followers from "./Followers";
import Following from "./Following";

const UserInfo = ({ id, dispatch, auth, profile }) => {
  const [userInfo, setUserInfo] = useState([]);
  const [edit, setEdit] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserInfo([auth.user]);
    } else {

      const newUserInf = profile.users.filter((user) => user._id === id);
      setUserInfo(newUserInf);
    }
  }, [id, auth, dispatch, profile.users]);

  useEffect(() => {
    if (showFollowers || showFollowing || edit) {
      dispatch({
        type: GLOBALTYPES.MODAL, payload: true
      })
    } else {
      dispatch({
        type: GLOBALTYPES.MODAL, payload: false
      })
    }

  }, [showFollowers, showFollowing, edit, dispatch])


  return (
    <div className="info border-bottom">
      {userInfo.map((user) => (
        <div className="info_container" key={user._id}>
          <Avatar src={user.avatar} size="huge-avatar" />

          <div className="info_content">
            <div className="title">
              <h2>{user.username}</h2>
              {user._id === auth.user._id ? (
                <button
                  className="btn btn-outline-info"
                  onClick={() => setEdit(true)}
                >
                  Edit profile
                </button>
              ) : (
                <FollowBtn user={user} />
              )}
            </div>
            <div className="follower_btn">
              <span
                className="mr-4"
                style={{ cursor: "pointer" }}
                onClick={() => setShowFollowers(true)}
              >
                {user.followers.length} Followers
              </span>
              <span
                className="ml-4"
                style={{ cursor: "pointer" }}
                onClick={() => setShowFollowing(true)}
              >
                {user.following.length} Following
              </span>
            </div>
            <h6>
              {user.fullname}
              <span className="text-info m-4">{user.number}</span>
            </h6>
            <p className="m-0">{user.address}</p>
            <h6 className="m-0">{user.email}</h6>
            <a href={user.website} target="_black" rel="noreferre">
              {user.website}
            </a>
            <p>{user.status}</p>
          </div>
          {edit && <EditProfile setEdit={setEdit} />}
          {showFollowers && (
            <Followers users={user.followers} setShowFollowers={setShowFollowers} />
          )}
          {showFollowing && (
            <Following users={user.following} setShowFollowing={setShowFollowing} />
          )}
        </div>
      ))}
    </div>
  );
};

export default UserInfo;
