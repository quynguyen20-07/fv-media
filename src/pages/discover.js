import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDiscoverPosts, DISCOVER_TYPES } from '../redux/actions/discoverAction'
import loadGif from '../../src/images/load.gif'
import PostThumb from '../components/PostThumb'
import LoadMoreButton from '../components/LoadMoreButton'
import { getDataAPI } from '../Utils/fetchData'

const Discover = () => {


  const { auth, discover } = useSelector(state => state);

  const dispatch = useDispatch();

  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (!discover.firstLoad) {
      dispatch(getDiscoverPosts(auth.token))
    }


  }, [discover.firstLoad, auth.token, dispatch])

  const handleLoadMore = async () => {
    setLoad(true)

    const res = await getDataAPI(`post_discover?num=${discover.page * 9}`, auth.token)
    dispatch({ type: DISCOVER_TYPES.UPDATE_POST, payload: res.data })

    setLoad(false)

  }

  return (
    <div>
      {
        discover.loading
          ? <img src={loadGif} alt='loading' className="d-block my-4 mx-auto" />
          : <PostThumb posts={discover.posts} result={discover.result} />

      }
      {

        load && <img src={loadGif} alt='loading' className="d-block mx-auto" />
      }

      {
        !discover.loading && <LoadMoreButton result={discover.result} page={discover.page}
          load={load} handleLoadMore={handleLoadMore}
        />
      }


    </div>
  )
}

export default Discover
