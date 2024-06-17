import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../../redux/actions/postAction';
import loadGif from '../../images/load.gif';
import PostCard from '../../components/PostCard'

const Post = () => {
    const [post, setPost] = useState([])
    const { id } = useParams()

    const dispatch = useDispatch()
    const { auth, postDetail } = useSelector(state => state)

    useEffect(() => {
        dispatch(getPosts({ postDetail, id, auth }))
        if (postDetail.length > 0) {
            const newArray = postDetail.filter(post => post._id === id)
            setPost(newArray)
        }
    }, [postDetail, id, auth, dispatch])


    return (
        <div className='post_detail'>
            {
                post.length === 0 &&
                <img src={loadGif} alt='loading' className='d-block mx-auto my-4' />
            }
            {
                post.map(item => (
                    <PostCard key={item._id} post={item} />
                ))

            }
        </div>
    )
}

export default Post