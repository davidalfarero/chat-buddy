import { Info, Send } from "lucide-react";

const ThemeChatPreview = () => {
  return (
    <section className="lg:w-full">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-base-content">Preview</h2>
        <p className="text-sm text-base-content/70">This is how your chat will look.</p>
      </div>

      <div className="p-4 border border-neutral-500/50 rounded-xl shadow-md w-full max-w-md">

        <div className="flex flex-col gap-2 text-base-content">
          <div className="flex items-center justify-between gap-2">
            <div className="avatar">
              <div className="size-7 rounded-full relative">
                <img src="/logo.png" />
              </div>
            </div>
            <h1 className="flex-1 font-semibold">Juan Dela Cruz</h1>
            <Info size={25} />
          </div>

          <hr className="border-neutral-300" />

          <div className="rounded-lg p-5 bg-base-300" >
            <div className="chat chat-start">
              <div className="chat-bubble bg-base-200">Hey there! 👋</div>
            </div>

            <div className="chat chat-end">
              <div className="chat-bubble bg-primary text-primary-content">Hey! Testing themes 😄</div>
            </div>

            <div className="chat chat-start">
              <div className="chat-bubble bg-base-200">Looking slick in this theme!</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full bg-base-200 rounded-3xl py-2 pl-10 focus:outline-none"
              readOnly
            />
            <button
              className="btn btn-md btn-circle">
              <Send size={22} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThemeChatPreview;
