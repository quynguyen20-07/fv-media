import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FavoriteBorder, Favorite, Comment } from '@material-ui/icons'

const PostThumb = ({ posts, result }) => {
	const { theme } = useSelector(state => state)

	if (result === 0) return <h2 className='text-center text-danger' style={{ marginTop: '10%' }}>No Post</h2>


	return (
		<div className='post_thumb'>
			{
				posts.map(post => (
					<Link key={post._id} to={`/post/${post._id}`}>
						<div className='post_thumb_display'>


							{
								post.images[0].url.match(/video/i)
									? <video controls src={post.images[0].url} alt={post.images[0].url}
										style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />

									: <img src={post.images[0].url} alt={post.images[0].url}
										style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
							}

							<div className='post_thumb_menu'>
								<span className='text-light mr-3'>
									<Favorite className='text-danger' style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
									{post.likes.length}
								</span>
								<span className='text-light ml-3'>
									<Comment className='text-dark' style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
									{post.comments.length}
								</span>
							</div>
						</div>
					</Link>
				))
			}
		</div>
	)
}

export default PostThumb