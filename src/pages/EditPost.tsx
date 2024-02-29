import React from 'react'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { useEffect } from 'react'
import Container from '../components/container/Container'
import PostForm from '../components/post-form/PostForm'
import service from '../appwrite/service'

function EditPost() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      service.getDocument(slug).then((post) => {
        if (post) {
          setPost(post)
        } else {
          navigate('/')
        }
      })
    }
  }, [slug, navigate])
  return (
    <div>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  )
}

export default EditPost
