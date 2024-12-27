// import React from 'react'

// import Message from "./Message";
// import useGetMessages from '../../hooks/useGetMessages';
// import MessageSkeleton from '../skeletons/MessageSkeleton';

// const Messages = () => {
// 	const{messages,loading} = useGetMessages();
// 	console.log(messages);
// 	return (
// 		<div className='px-4 flex-1 overflow-auto'>
// 		{!loading && messages.lenght>0 && messages.map((message)=>(
// 		<Message key={message._id} message={message} />
// 		))}
// 		{loading && [...Array(3)].map((_,idx)=> <MessageSkeleton key={idx} />)}
// 		{!loading && messages.lenght==0&&(
// 		<p className='text-gray-500 text-center'>Send a Message to start conversation</p>)}
		
// 		</div>
// 	);
// };
// export default Messages;




import React, { useEffect,useRef } from 'react'
import Message from "./Message";
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import { use } from 'react';
import { set } from 'mongoose';

const Messages = () => {
	const { messages, loading } = useGetMessages();
	// console.log(messages);
	const lastMessageRef = useRef();
  useEffect(()=>{
	setTimeout(()=>{
		lastMessageRef.current?.scrollIntoView({behavior:'smooth'});
	},100)
  },[messages])
	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading && messages.length > 0 && messages.map((message) => (
				<div key={message._id} ref={lastMessageRef}>
					<Message message={message} />
				</div>
			))}
			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={`skeleton-${idx}`} />)}
			{!loading && messages.length === 0 && (
				<p className='text-gray-500 text-center'>Send a message to start conversation</p>
			)}
		</div>
	);
};

export default Messages;






