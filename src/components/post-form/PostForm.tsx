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
import { Models } from 'appwrite'

interface PostFromPros {
  document: Models.Document
}

const PostForm: React.FC<PostFromPros> = ({ document }) => {
  const navigate = useNavigate()
  const userData = useSelector((state: RootState) => state.auth.userData)
  console.log('userData: ', userData)
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm<Models.Document>({
      defaultValues: {
        title: document?.title || '',
        $id: document?.$id || '',
        content: document?.content || '',
        status: document?.status || 'active',
        image: [],
        userId: undefined,
        featuredImageFileId: undefined,
      },
    })

  const submit: SubmitHandler<Models.Document> = async (
    form_data: Models.Document
  ) => {
    console.log('form data', form_data)
    if (document) {
      console.log('update document ', document)
      const file = document.image[0]
        ? await service.createFile(form_data.image[0])
        : null

      if (file && document.featuredImageFileId) {
        service.deleteFile(document.featuredImageFileId)
      }
      if (document.$id) {
        document.tilte = form_data.title
        document.content = form_data.content
        document.featuredImageFileId = file?.$id

        const dbPost = await service.updateDocument(document.$id, document)
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
    } else {
      const file = await service.createFile(form_data.image[0])
      console.log('create file ', file)

      if (file) {
        const fileId = file.$id
        form_data.featuredImageFileId = fileId
        console.log(form_data)
        const post_document = await service.creatDocument({
          ...form_data,
          userId: userData.$id,
        })
        console.log('post_document', post_document)
        if (post_document) {
          navigate(`/post/${post_document.$id}`)
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
