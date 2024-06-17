import React from 'react'
import { FavoriteBorder, Favorite } from '@material-ui/icons'
import { useSelector } from "react-redux";




const LikeButton = ({ like, handleLike, handleDisLike }) => {
    const { theme } = useSelector(state => state)

    return (
        <>
            {
                like
                    ?
                    <Favorite className='text-danger' onClick={handleDisLike} style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
                    :
                    <FavoriteBorder onClick={handleLike}  />
            }

        </>
    )
}

export default LikeButton