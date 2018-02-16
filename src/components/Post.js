import React from 'react'
import PropTypes from 'prop-types'
import noImage from './no-image.png'
import './Post.css';


const Post = ({ title, url, img }) => {

  // Whether there is a link to the image (img !== null)
  const imageUrl = img ? (
    img + '?w=350'
  ) : (
    noImage
  )

  return (
    <a className='post' href={ url }>
      <img src={ imageUrl } alt={ title } />
      <div className='title'>
        <span>{ title }</span>
      </div>
    </a>
  )
}

Post.PropTypes = {
  title: PropTypes.string.isRequired,
  url:   PropTypes.string.isRequired,
  img:   PropTypes.string.isRequired
}

export default Post