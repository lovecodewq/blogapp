import React from 'react'
import service from '../appwrite/service'
import { useState } from 'react'
import { useEffect } from 'react'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'

function AllPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    service.listDocuments([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post) => (
            <div className='p-2 w-1/4' key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
