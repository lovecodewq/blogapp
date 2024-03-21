import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/service'
import Button from '../components/Button'
import Container from '../components/container/Container'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { BlogPost } from '../types/blogTypes'

function Post() {
  const { postId } = useParams()
  const [post, setPost] = useState<BlogPost>()
  const navigate = useNavigate()
  const userData = useSelector((state: RootState) => state.auth.userData)
  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        try {
          const post = await service.getBlogPost(postId)
          if (post) {
            console.log('cureent post ', post)
            setPost(post)
          } else {
            navigate('/')
          }
        } catch (error) {
          console.log('Failed to fetch post: ', error)
          navigate('/')
        }
      }
    }
    fetchPost()
  }, [postId, navigate])

  const deletePost = async () => {
    if (post && post.$id) {
      try {
        const status = await service.deleteDocument(post.$id)
        if (status) {
          service.deleteFile(post.featuredImageFileId)
          navigate('/')
        }
      } catch (error) {
        console.log('Failed to delete post: ', error)
        navigate('/')
      }
    }
  }

  return post ? (
    <div className='py-8'>
      <Container>
        {isAuthor && (
          <div className='items-center mb-4   text-right'>
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgColor='bg-green-500' className='mr-3'>
                Edit
              </Button>
            </Link>
            <Button bgColor='bg-red-500' onClick={deletePost}>
              Delete
            </Button>
          </div>
        )}
        <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
          <img
            src={service.getFilePreview(post.featuredImageFileId)}
            alt={post.title}
            className='rounded-xl'
          />
        </div>
        <div className='w-full mb=6'>
          <h1 className='text-2xl font-bold'>{post.title}</h1>
          <div className='browser-css'>{parse(post.content)}</div>
        </div>
      </Container>
    </div>
  ) : null
}

export default Post
