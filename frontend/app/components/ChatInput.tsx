'use client'
import { cn } from '@/lib/utils'
import { FC, HTMLAttributes, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { useMutation } from '@tanstack/react-query'
import { nanoid } from 'nanoid'
import { Message } from '@/lib/validators/message'

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
  const [input, setInput] = useState<string>('')
  const [response, setResponse] = useState<string | null>(null)

  const { mutate: sendMessage, isLoading } = useMutation({
    mutationFn: async (message: Message) => {
      const response = await fetch('http://localhost:8000/answer_question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: message.text }),
      })
      const result = await response.json()
      return result
    },
    onSuccess: (data) => {
      setResponse(data.error || data.response || 'An unexpected error occurred')
    },
    onError: (error) => {
      setResponse('Error fetching data from the backend.')
    }
  })

  return (
    <div {...props} className={cn('border-t border-zinc-300', className)}>
      <div className='relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none'>
        <ReactTextareaAutosize
          rows={2}
          onKeyDown={(e: any) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()

              const message: Message = {
                id: nanoid(),
                isUserMessage: true,
                text: input,
              }

              sendMessage(message)
            }
          }}
          maxRows={4}
          value={input}
          onChange={(e: any) => setInput(e.target.value)}
          autoFocus
          placeholder='Write a message...'
          className='peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-pink-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6'
        />
      </div>
      <div className='mt-4'>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>{response}</p>
        )}
      </div>
    </div>
  )
}

export default ChatInput










// 'use client'

// import { cn } from '@/lib/utils'
// import { FC, HTMLAttributes, useContext, useRef, useState } from 'react'
// import ReactTextareaAutosize from 'react-textarea-autosize'
// import { useMutation } from '@tanstack/react-query'
// import {nanoid} from 'nanoid'
// import { Message } from '@/lib/validators/message'


// interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}


// const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {

//   const [input, setInput] = useState<String>('')

//   const { mutate: sendMessage, isLoading } = useMutation({
//     mutationFn: async (message:Message) => {
//       const response = await fetch('/api/message',{
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ messages: 'hi' }),
//       })
//       return response.body
//     },
//     onSuccess: () =>{
//       console.log("Success!")
//     }
//   })

//   return (
//     <div {...props} className={cn('border-t border-zinc-300', className)}>
//       <div className='relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none'>
//         <ReactTextareaAutosize 
//          rows={2}
//          onKeyDown={(e:any) => {
//           if (e.key === 'Enter' && !e.shiftKey) {
//             e.preventDefault()

//             const message: Message = {
//               id: nanoid(),
//               isUserMessage: true,
//               text: input,
//             }

//             sendMessage(message)
//           }
//         }}
//          maxRows={4}
//          value={input}
//          onChange={(e:any)=>setInput(e.target.value)}
//          autoFocus
//          placeholder='Write a message...'
//          className='peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6'
//         />
//       </div>
//     </div>
    
//   )
// }

// export default ChatInput