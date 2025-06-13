import { useState, useEffect, useRef } from 'react';
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import InfoSidebar from "./InfoSidebar";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/Time';

const ChatContainer = () => {
  const [showInfoSideBar, setShowInfoSideBar] = useState(false);
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { user } = useAuthStore();
  const messageEndRef = useRef(null);

  const handleToggleInfo = () => setShowInfoSideBar(prev => !prev);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (isMessagesLoading) return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  );

  return (
    <div className={`grid w-full h-full gap-3 ${showInfoSideBar ? 'md:grid-cols-[2fr_1fr]' : 'md:grid-cols-1'}`}>

      <div
        className={`flex flex-col w-full overflow-auto ${showInfoSideBar ? 'hidden md:flex' : 'flex'}`}
        style={{ boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)' }}
      >
        <ChatHeader onToggleInfo={handleToggleInfo} />

        <div className="bg-base-200 flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`flex flex-col ${message.senderId === user._id ? 'self-end items-end' : 'self-start items-start'}`}
              ref={messageEndRef}
            >

              <div className={`flex items-center gap-2 mb-1 ${message.senderId !== user._id ? 'flex-row-reverse' : 'flex-row'}`}>
                <div
                  className={`sm:max-w-xs px-4 py-2 text-xs sm:text-base ${message.senderId === user._id
                    ? `bg-primary text-primary-content rounded-2xl rounded-br-none ${message.image ? 'bg-transparent' : ''}`
                    : 'bg-base-100 text-base-content rounded-2xl rounded-bl-none'
                    }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      className="w-20 sm:w-50 rounded-md mb-2"
                      alt="sent image"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>

                <div className='chat-image avatar'>
                  <div className='size-5 sm:size-8 rounded-full' >
                    <img
                      src={message.senderId === user._id ? user.profilePic || '/avatar.png' :
                        selectedUser.profilePic || '/avatar.png'
                      }
                      alt="profile pic"
                    />
                  </div>
                </div>

              </div>

              <div className='chat-header mb-1'>
                <time className='text-[10px] opacity-50 ml-1'>
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

            </div>
          ))}
        </div>

        <MessageInput />
      </div>

      {showInfoSideBar &&
        <div className="bg-base-100 rounded-lg p-4">
          <InfoSidebar onClose={() => setShowInfoSideBar(false)} />
        </div>
      }

    </div>
  );
};
export default ChatContainer;