import service from '../appwrite/service'
import { useState, useEffect } from 'react'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'
import { BlogPost } from '../types/blogTypes'

function AllPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const posts = await service.listBlogPosts()
        if (posts) {
          setPosts(posts.documents)
        }
      } catch (error) {
        console.error('Failed to fetch documents: ', error)
        throw error
      }
    }
    fetchBlogPosts()
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
