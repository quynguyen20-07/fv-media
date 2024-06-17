import React, { useState, useEffect } from "react";
import PostThumb from "../PostThumb";
import loadGif from '../../images/load.gif'
import LoadMoreButton from "../LoadMoreButton";
import { getDataAPI } from "../../Utils/fetchData";
import { PROFILE_TYPE } from '../../redux/actions/profileAction'


const Posts = ({ auth, id, dispatch, profile }) => {

  const [posts, setPosts] = useState([])
  const [result, setResult] = useState(9)
  const [page, setPage] = useState(0)
  const [load, setLoad] = useState(false)



  useEffect(() => {
    profile.posts.forEach(data => {
      if (data._id === id) {
        setPosts(data.posts)
        setResult(data.result)
        setPage(data.page)
      }
    });
  }, [profile.posts, id])

  const handleLoadMore = async () => {
    setLoad(true)

    const res = await getDataAPI(`user_posts/${id}?limit=${page * 9}`, auth.token)
    const newData = { ...res.data, page: page + 1, _id: id }
    dispatch({ type: PROFILE_TYPE.UPDATE_POST, payload: newData })
    setLoad(false)
  }

  return (
    <div>
      <PostThumb posts={posts} result={result} />
      {

        load && <img src={loadGif} alt='loading' className="d-block mx-auto" />
      }

      <LoadMoreButton result={result} page={page}
        load={load} handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Posts;
