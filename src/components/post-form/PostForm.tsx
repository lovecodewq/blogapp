import React, { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '../Button'
import Input from '../Input'
import RTE from '../RTE'
import Select from '../Select'
import service from '../../appwrite/service'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { Document } from '../../appwrite/service'
import { RootState } from '../../store/store'

const PostForm: React.FC<Document> = (post) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || '',
        slug: post?.slug || '',
        content: post?.content || '',
        status: post?.status || 'active',
        image: [],
        $id: undefined,
        id: undefined,
        userId: undefined,
        featuredImage: undefined,
      },
    })
  const navigate = useNavigate()
  const userData = useSelector((state: RootState) => state.auth.userData)
  const submit: SubmitHandler<Document> = async (data: Document) => {
    if (post) {
      const file = data.image[0]
        ? await service.createFile(data.image[0])
        : null

      if (file && post.featuredImage) {
        service.deleteFile(post.featuredImage)
      }
      if (post.$id) {
        const dbPost = await service.updateDocument(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        })
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
    } else {
      const file = await service.createFile(data.image[0])
      if (file) {
        const fileId = file.$id
        data.featuredImage = fileId
        const dbPost = await service.creatDocument({
          ...data,
          userId: userData.$id,
        })

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
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
          {...register('slug', { required: true })}
          onInput={(e) => {
            const slug = slugTransform(e.currentTarget.value)
            slug &&
              setValue('slug', slug, {
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
          {...register('image', { required: !post })}
        />
        {post && post.featuredImage && (
          <div className='w-full mb-4'>
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
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
          bgColor={post ? 'bg-green-500' : undefined}
          className='w-full'
        >
          {post ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  )
}
export default PostForm
