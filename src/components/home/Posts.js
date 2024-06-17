import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../PostCard";

import loadGif from '../../images/load.gif'
import LoadMoreButton from "../LoadMoreButton";
import { getDataAPI } from "../../Utils/fetchData";
import { POST_TYPE } from "../../redux/actions/postAction";


const Posts = () => {
  const { homePosts, auth, theme } = useSelector((state) => state);

  const [load, setLoad] = useState(false)

  const dispatch = useDispatch()

  const handleLoadMore = async () => {
    setLoad(true)

    const res = await getDataAPI(`posts?limit=${homePosts.page * 9}`, auth.token)

    dispatch({
      type: POST_TYPE.SHOW_POSTS,
      payload: { ...res.data, page: homePosts.page + 1 }
    })
    setLoad(false)
  }

  return (
    <div className="posts bg-lig  ht">
      {homePosts.posts.map((post) => (
        <PostCard key={post._id} post={post} theme={theme} />
      ))}
      {

        load && <img src={loadGif} alt='loading' className="d-block mx-auto" />
      }

      <LoadMoreButton result={homePosts.result} page={homePosts.page}
        load={load} handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Posts;
