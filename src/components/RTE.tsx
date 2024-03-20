import { Controller, Control } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'
import conf from '../conf/conf'

interface RTEProps {
  name: string
  control: Control
  label: string
  defaultValue: string
}

function RTE({ name, control, label, defaultValue = '' }: RTEProps) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      <Controller
        name={name || 'content'}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={conf.tinymceAPIKey}
            initialValue={defaultValue}
            onEditorChange={onChange}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'code',
                'help',
                'wordcount',
              ],
              toolbar:
                'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
        )}
      />
    </div>
  )
}

export default RTE
