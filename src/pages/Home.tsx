import { useState, useEffect } from 'react'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'
import service from '../appwrite/service'
import { BlogPost } from '../types/blogTypes'

function Home() {
  const [documents, setDocuments] = useState<BlogPost[]>([])

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await service.listBlogPosts()
        if (response) {
          setDocuments(response.documents)
        }
      } catch (error) {
        console.error('Failed to fetch documents: ', error)
      }
    }
    fetchBlogPosts()
  }, [])

  if (documents.length === 0) {
    return (
      <div className='w-full py-8'>
        <Container>
          <div className='flex flex-wrap'>
            <h1>No posts found!</h1>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {documents.map((document) => (
            <div className='p-2 w-1/4' key={document.$id}>
              <PostCard {...document} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
