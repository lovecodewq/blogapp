import React from 'react'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { useEffect } from 'react'
import Container from '../components/container/Container'
import PostForm from '../components/post-form/PostForm'
import service from '../appwrite/service'
import { Models } from 'appwrite'
import { BlogPost } from '../types/blogTypes'
function EditPost() {
  const [post, setPost] = useState<BlogPost>()
  const { postId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (postId) {
      service.getBlogPost(postId).then((post) => {
        if (post) {
          setPost(post)
        } else {
          navigate('/')
        }
      })
    }
  }, [postId, navigate])
  return (
    <div>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  )
}

export default EditPost
