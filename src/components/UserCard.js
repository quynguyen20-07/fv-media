import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const UserCard = ({
  children,
  user,
  border,
  handleClose,
  setShowFollowers,
  setShowFollowing,
  msg,
  theme
}) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };


  const showMsg = (user) => {
    return (
      <>
        <div style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}>
          {user.text}
        </div>
        {
          user.media.length > 0 &&
          <div>
            {user.media.length} <i className="fas fa-image" />
          </div>
        }

        {
          user.call &&
          <span className="material-icons">
            {
              user.call.times === 0
                ? user.call.video ? 'videocam_off' : 'phone_disabled'
                : user.call.video ? 'video_camera_front' : 'call'
            }
          </span>
        }
      </>
    )
  }

  return (
    <div
      className={`d-flex p-2 align-item-center justify-content-between ${border}`}
    >
      <div className="mr-4">
        <Link
          to={`/profile/${user._id}`}
          onClick={handleCloseAll}
          className="d-flex align-item-center"
        >
          <Avatar src={user.avatar} size="medium-avatar" />
          <div className="ml-1">
            <span
              className="d-block text-dark"
              style={{ transform: "translateY(-2px)" }}
            >
              {user.fullname}
            </span>
            <small className="text-dark" style={{ opacity: 0.7 }}>
              {msg
                ?
                <i className="text-info"> {showMsg(user)}</i>
                : user.username
              }
            </small>
          </div>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default UserCard;
