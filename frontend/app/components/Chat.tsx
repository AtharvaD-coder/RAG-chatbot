import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from './Accordion'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'

const Chat = () => {
  return (
    <Accordion type='single' collapsible className='relative bg-slate-600 z-40 shadow '>
      <AccordionItem value='item-1'>
        <div className='fixed right-8 w-80 bottom-8 bg-blue-300 border-gray-900 rounded-md overflow-hidden '>
          <div className='w-full h-full flex flex-col'> 
            <AccordionTrigger className='px-6 border-b border-zinc-800'>
              <ChatHeader />
            </AccordionTrigger>
            <AccordionContent>
              <div className='flex flex-col h-80'>
                <ChatInput className='px-4' />
              </div>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  )
}

export default Chat



// "use client"
// import React, { useState } from 'react'
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './Accordion'
// import ChatHeader from './ChatHeader'
// import { AiOutlineMessage } from 'react-icons/ai' 

// const Chat = () => {
//   const [isChatOpen, setIsChatOpen] = useState(false)

//   const toggleChat = () => {
//     setIsChatOpen(!isChatOpen)
//     console.log("clicked!")
//   }

//   return (
//     <>

//       {!isChatOpen && (
//         <div
//           onClick={toggleChat}
//           className="fixed right-8 bottom-8 w-16 h-16 bg-slate-600 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer"
//         >
//           <AiOutlineMessage size={30} />
//         </div>
//       )}

//       {isChatOpen && (
//         <div className='fixed right-8 w-80 bottom-8 bg-slate-400 border-gray-900 rounded-md overflow-hidden shadow-lg'>
//           <div className='w-full h-full flex flex-col'>
//             <div className="flex justify-between items-center px-4 py-2 bg-slate-600 border-b border-zinc-800">
//               <ChatHeader />
//               <button onClick={toggleChat} className="text-black">X</button>
//             </div>
//             <Accordion type='single' collapsible className='relative z-40'>
//               <AccordionItem value='item-1'>
//                 <AccordionTrigger className='px-6'>
//                   {/* Additional content or trigger */}
//                 </AccordionTrigger>
//                 <AccordionContent>
//                   {/* Your chat content here */}
//                   asdf
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// export default Chat
