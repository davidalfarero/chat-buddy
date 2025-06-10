import ChatContainer from "../components/ChatContainer";
import Navbar from "../components/Navbar";
import NoChatSelected from "../components/NoChatSelected";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore";


const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-100">
      <Navbar />

      <div className="grid grid-cols-[20%_80%]  lg:grid-cols-[25%_75%] pt-12 lg:pt-15 overflow-hidden">

        <div
          className="bg-base-100 border-b border-base-300 h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)] z-40 w-full"
          style={{ boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="flex h-full overflow-hidden ">
            <Sidebar />
          </div>
        </div>

        <div className="shadow-cl w-full h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)]">
          <div className="flex h-full overflow-hidden">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>

      </div>
    </div>
  );
};
export default HomePage;