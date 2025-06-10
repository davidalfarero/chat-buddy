import { X } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeSelector from "../components/ThemeSelector";
import ThemeChatPreview from "../components/ThemeChatPreview";
import Navbar from "../components/Navbar";

const SettingsPage = () => {
  return (
    <div className=" h-screen bg-base-100 mt-10 md:py-5 md:pr-5 ">
      <Navbar />

      <div className="relative max-w-5xl mx-auto h-[calc(100%-4rem)] lg:rounded-lg p-5 grid md:grid-cols-2 gap-5 place-items-center">

        <Link to="/" className="absolute top-2 right-2 p-1 rounded-full bg-neutral-content/20 hover:bg-neutral-content/40 transition-colors duration-300">
          <X className="size-5" />
        </Link>

        <ThemeSelector />
        <ThemeChatPreview />
      </div>
    </div>
  );
};
export default SettingsPage;