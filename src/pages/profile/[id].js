import React, { useEffect, useState } from "react";
import Posts from "../../components/profile/Posts";
import UserInfo from "../../components/profile/userInfo";
import { useSelector, useDispatch } from "react-redux";
import loadIcon from "../../images/load.gif";
import { getProfileUsers } from "../../redux/actions/profileAction";
import { useParams } from "react-router-dom";
import Saved from "../../components/profile/Saved";


const Profile = () => {
  const { profile, auth } = useSelector((state) => state);
  const [savedTab, setSavedTab] = useState(false);

  const { id } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    if (profile.ids.every(item => item !== id)) {
      dispatch(getProfileUsers({ id, auth }));
    }
  }, [id, dispatch, auth, profile.ids])


  return (
    <div className="profile">

      <UserInfo profile={profile} dispatch={dispatch} auth={auth} id={id} />

      {
        auth.user._id === id &&
        <div className="profile_tab">
          <button className={savedTab ? '' : 'active'} onClick={() => setSavedTab(false)}>Posts</button>
          <button className={savedTab ? 'active' : ''} onClick={() => setSavedTab(true)}>Saved</button>
        </div>
      }


      {
        profile.loading
          ? <img className="d-block mx-auto my-4 " src={loadIcon} alt="loading" />
          : <>
            {
              savedTab ?
                <Saved profile={profile} dispatch={dispatch} auth={auth} id={id} />
                :
                <Posts profile={profile} dispatch={dispatch} auth={auth} id={id} />


            }
          </>


      }

    </div>
  );
};

export default Profile;
