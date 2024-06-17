import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSuggestions } from '../../redux/actions/suggestionAction';

import UserCard from '../UserCard';
import FollowBtn from '../../components/profile/FollowBtn';

import loadGif from '../../images/load.gif';

const RightSideBar = () => {

  const { auth, suggestions } = useSelector(state => state)
  const dispatch = useDispatch();


  return (
    <div className='position-fixed'>
      <div className='my-4 border-bottom'>
        <UserCard user={auth.user} />
      </div>
      <div className='d-flex justify-content-between align-content-center my-2'>
        <h5 className='text-danger m-2'>Suggestions for you</h5>
        {
          !suggestions.loadiing &&
          <i className='fa fa-redo p-3'
            style={{ cursor: 'pointer' }}
            onClick={() => dispatch(getSuggestions(auth.token))}
          />
        }

      </div>
      {
        suggestions.loading
          ? <img src={loadGif} alt='load' className='d-block mx-auto my-4' style={{ width: '150px', height: '150px' }} />
          :
          <div className='suggestions'>
            {
              suggestions.users.map(user => (
                <UserCard key={user._id} user={user}>
                  <FollowBtn user={user} />
                </UserCard>
              ))
            }
          </div>
      }
      <>

      </>
    </div>
  )
}

export default RightSideBar