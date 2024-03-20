import React from 'react'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { useEffect } from 'react'
import Container from '../components/container/Container'
import PostForm from '../components/post-form/PostForm'
import service from '../appwrite/service'
import { Models } from 'appwrite'

function EditPost() {
  const [document, setDocument] = useState<Models.Document>()
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      service.getDocument(slug).then((document) => {
        if (document) {
          setDocument(document)
        } else {
          navigate('/')
        }
      })
    }
  }, [slug, navigate])
  return (
    <div>
      <Container>
        <PostForm document={document} />
      </Container>
    </div>
  )
}

export default EditPost
