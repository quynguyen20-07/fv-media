import React from 'react';
import UserCard from '../UserCard';
import FollowBtn from './FollowBtn';
import { useSelector } from 'react-redux'

const Following = ({ users, setShowFollowing }) => {
  const { auth } = useSelector((state) => state);
  return (
    <div className="followDiv ">
      <div className="fl_box">
        <div className=' p-2 ' >
          <h5 className="text-center">Following</h5>
          <hr />
        </div>

        {users.map((user) => (
          <UserCard key={user._id} user={user} setShowFollowing={setShowFollowing}>
            {auth.user._id !== user._id && <FollowBtn user={user} />}
          </UserCard>
        ))}
        <div style={{ cursor: "pointer" }} className="close" onClick={() => setShowFollowing(false)}>
          &times;
        </div>
      </div>
    </div>
  );
};

export default Following;
