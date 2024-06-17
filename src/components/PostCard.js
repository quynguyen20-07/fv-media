import React from 'react';
import CardHeader from "./home/post_components/CardHeader";
import CardBody from "./home/post_components/CardBody";
import CardFooter from "./home/post_components/CardFooter";

import Comment from './home/Comment';
import CommentInput from './home/CommentInput';




const PostCard = ({ post, theme }) => {
    return (
        <div className="card my-3">
            <CardHeader post={post} theme={theme}/>
            <CardBody post={post} theme={theme} />
            <CardFooter post={post}  theme={theme}/>

            <Comment post={post} theme={theme}/>
            <CommentInput post={post} theme={theme}/>

        </div>
    )
}

export default PostCard