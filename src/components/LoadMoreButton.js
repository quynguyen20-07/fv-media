import React from 'react'

const LoadMoreButton = ({ result, load, page, handleLoadMore }) => {
  return (
    <>
      <div className='justify-content-center row mb-2'> {
        result < 9 * (page - 1) ? '' :
          !load && <button className='d-block btn btn-outline-dark mx-auto'
            onClick={handleLoadMore}>
            Read More
          </button>
      }
      </div>
    </>
  )
}

export default LoadMoreButton