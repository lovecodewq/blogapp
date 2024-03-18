import React from 'react'
import { Link } from 'react-router-dom'
import service from '../appwrite/service'

interface PostCardProps {
  $id: string
  title: string
  featuredImage: string
}

function PostCard({ $id, title, featuredImage }: PostCardProps) {
  const image_uri = service.getFilePreview(featuredImage);
  console.log("image_uri: ", image_uri);
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          <img
            className='rounded-xl'
            src={image_uri}
            alt={title}
          />
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard
