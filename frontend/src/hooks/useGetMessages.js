// import { useEffect, useState } from "react";
// import useConversation from "../zustand/useConversation";
// import toast from "react-hot-toast";

// const useGetMessages = () => {
// 	const [loading, setLoading] = useState(false);
// 	const { messages, setMessages, selectedConversation } = useConversation();

// 	useEffect(() => {
// 		const getMessages = async () => {
// 			setLoading(true);
// 			try {
// 				const res = await fetch(`/api/messages/${selectedConversation._id}`);
// 				const data = await res.json();
// 				if (data.error) throw new Error(data.error);
// 				setMessages(data);
// 			} catch (error) {
// 				toast.error(error.message);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		if (selectedConversation?._id) getMessages();
// 	}, [selectedConversation?._id, setMessages]);

// 	return { messages, loading };
// };
// export default useGetMessages;

// import { useEffect, useState } from "react";
// import useConversation from "../zustand/useConversation";
// import toast from "react-hot-toast";

// const useGetMessages = () => {
// 	const [loading, setLoading] = useState(false);
// 	const { messages, setMessages, selectedConversation } = useConversation();

// 	useEffect(() => {
// 		const getMessages = async () => {
// 			setLoading(true);
// 			try {  //         /api/messages/6761ac5ac188e5936d0d3acb
// 				const res = await fetch(`/api/messages/${selectedConversation._id}`);
// 				const data = await res.json();
// 				if (data.error) throw new Error(data.error);
// 				setMessages(data);
// 			} catch (error) {
// 				toast.error(error.message);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		if (selectedConversation?._id||setMessages) getMessages();
// 	}, [selectedConversation?._id, setMessages]);
 
// 	return { messages, loading };
// };
// export default useGetMessages;

import { useEffect, useCallback } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const { messages, setMessages, selectedConversation } = useConversation();

	const fetchMessages = useCallback(async () => {
		if (!selectedConversation?._id) return;

		try {
			const res = await fetch(`/api/messages/${selectedConversation._id}`);
			const data = await res.json();
			if (data.error) throw new Error(data.error);
			setMessages(data);
		} catch (error) {
			toast.error(error.message);
		}
	}, [selectedConversation?._id, setMessages]);

	useEffect(() => {
		fetchMessages();
	}, [fetchMessages,1000]);

	return { messages, fetchMessages };
};

export default useGetMessages;



