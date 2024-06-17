import React, { useEffect, useState } from 'react'
import CommentShow from './comments/CommentShow'

const Comment = ({ post, theme }) => {

    const [comments, setCommnets] = useState([])
    const [showComments, setShowCommnets] = useState([])


    const [pass, setPass] = useState(2)

    const [repComment, setRepComment] = useState([])

    useEffect(() => {
        const newCmt = post.comments.filter(cmt => !cmt.reply)
        setCommnets(newCmt)
        setShowCommnets(newCmt.slice(newCmt.length - pass))

    }, [post.comments, pass])

    useEffect(() => {
        const newRep = post.comments.filter(cmt => cmt.reply)
        setRepComment(newRep)
    }, [post.comments])



    return (
        <div className='comments'
            style={{
                filter: theme ? 'invert(1)' : 'invert(0)',
                color: theme ? 'while' : '#111',
            }}>

            {
                showComments.map((comment, index) => (
                    <CommentShow key={index} comment={comment} post={post} theme={theme}
                        replyCmt={repComment.filter(item => item.reply === comment._id)}
                    />
                ))

            }
            {
                comments.length - pass > 0
                    ? <div className='p-2 border-top'
                        style={{ cursor: 'pointer', color: "#B20600" }}
                        onClick={() => setPass(pass + 10)}
                    >
                        See more comment....
                    </div>
                    :
                    comments.length > 2 &&
                    <div className='p-2 border-top'
                        style={{ cursor: 'pointer', color: "#B20600" }}
                        onClick={() => setPass(2)}>
                        Hide comment....
                    </div>
            }

        </div>
    )
}

export default Comment