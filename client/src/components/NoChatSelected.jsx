
const NoChatSelected = () => {
  return (
    <div className="bg-base-300 w-full flex flex-col items-center justify-center p-16">
      <div className="max-w-md text-center space-y-6">

        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl flex items-center
             justify-center animate-bounce"
            >
              <img src="/logo.png" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to Chat <span className="text-accent">Buddy</span>!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;