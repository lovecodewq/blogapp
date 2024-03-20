import { useState } from 'react'
import { useEffect } from 'react'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'
import service from '../appwrite/service'
import { Models } from 'appwrite'

function Home() {
  const [documents, setDocuments] = useState<Models.Document[]>([])

  useEffect(() => {
    const fetchDocumetns = async () => {
      try {
        const response = await service.listDocuments()
        if (response) {
          setDocuments(response.documents)
        }
      } catch (error) {
        console.error('Failed to fetch documents: ', error)
      }
    }
    fetchDocumetns()
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
