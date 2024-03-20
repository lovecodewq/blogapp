import service from '../appwrite/service'
import { useState } from 'react'
import { useEffect } from 'react'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'
import { Models } from 'appwrite'

function AllPosts() {
  const [posts, setPosts] = useState<Models.Document[]>([])

  useEffect(() => {
    service.listDocuments().then((posts: Models.DocumentList<Models.Document> | void) => {
      console.log("posts ", posts);
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
