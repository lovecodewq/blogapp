import React, { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '../Button'
import Input from '../Input'
import RTE from '../RTE'
import Select from '../Select'
import service from '../../appwrite/service'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store/store'
import { BlogPost } from '../../types/blogTypes'

interface PostFromPros {
  post: BlogPost
}

const PostForm: React.FC<PostFromPros> = ({ post }) => {
  const navigate = useNavigate()
  const userData = useSelector((state: RootState) => state.auth.userData)
  console.log('userData: ', userData)
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm<BlogPost>({
      defaultValues: {
        $id: post?.$id || '',
        title: post?.title || '',
        content: post?.content || '',
        status: post?.status || 'active',
        userId: undefined,
        featuredImageFileId: undefined,
        image: [],
        slug: post?.$id || '',
      },
    })

  const submit: SubmitHandler<BlogPost> = async (
    data: BlogPost
  ) => {
    console.log('form data', data)
    if (post) {
      console.log('try update post ', post)
      const file = data.image[0]
        ? await service.createFile(data.image[0])
        : null

      // upate featured image file
      if (file && post.featuredImageFileId) {
        service.deleteFile(post.featuredImageFileId)
        post.featuredImageFileId = file.$id
      }
    
      if (post.$id) {
        post.tilte = data.title
        post.content = data.content
        const dbPost = await service.updateDocument(post.$id, post)
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
    } else {
      // upload image file
      const file = await service.createFile(data.image[0]);
      if (file) {
        const fileId = file.$id
        data.featuredImageFileId = fileId
      }
      const post = await service.creatPost({
        ...data,
        userId: userData.$id,
      })
      console.log('created post ', post)
      if (post) {
        navigate(`/post/${post.$id}`)
      }
    }
  }
  const slugTransform = useCallback((value?: string) => {
    if (value && typeof value === 'string')
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-')
  }, [])
  React.useEffect(() => {
    watch((value, { name }) => {
      if (name === 'title' && value.title) {
        const slug = slugTransform(value.title)
        if (slug) {
          setValue('slug', slug, { shouldValidate: true })
        }
      }
    })
  }, [watch, slugTransform, setValue])
  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
      <div className='w-2/3 px-2'>
        <Input
          label='Title'
          placeholder='Title'
          className='mb-4'
          {...register('title', { required: true })}
        />
        <Input
          label='Slug :'
          placeholder='Slug'
          className='mb-4'
          {...register('$id', { required: true })}
          onInput={(e) => {
            const slug = slugTransform(e.currentTarget.value)
            slug &&
              setValue('$id', slug, {
                shouldValidate: true,
              })
          }}
        />
        <RTE
          label='Content: '
          name='content'
          control={control}
          defaultValue={getValues('content')}
        />
      </div>
      <div className='1/3 px-2'>
        <Input
          label='Featured Image'
          type='file'
          className='mb-4'
          accept='image/png, image/jpg, image/jpeg'
          {...register('image', { required: !document })}
        />
        {document && document.featuredImageFileId && (
          <div className='w-full mb-4'>
            <img
              src={service.getFilePreview(document.featuredImageFileId)}
              alt={document.title}
              className='rounded-lg'
            />
          </div>
        )}
        <Select
          options={['active', 'inactive']}
          label='Status'
          className='mb-4'
          {...register('status', { required: true })}
        />
        <Button
          type='submit'
          bgColor={document ? 'bg-green-500' : undefined}
          className='w-full'
        >
          {document ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  )
}
export default PostForm
