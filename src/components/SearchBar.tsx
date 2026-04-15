import { Search, Mic, Loader2 } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch?.(value);
  };

  const handleASR = async () => {
    try {
      setIsRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const formData = new FormData();
        formData.append("file", audioBlob);
        formData.append("model", "whisper-1");

        try {
          const res = await fetch("https://elmodels.ngrok.app/audio/transcriptions", {
            method: "POST",
            headers: {
              Authorization: "Bearer sk-FEAw1F9QdZbtn3RJnR5yfA",
              "ngrok-skip-browser-warning": "69420",
            },
            body: formData,
          });

          const data = await res.json();
          if (data.text) {
            setQuery(data.text);
            onSearch?.(data.text);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsRecording(false);
        }
      };

      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 3000);
    } catch (err) {
      console.error(err);
      setIsRecording(false);
    }
  };

  return (
    <div className="-mt-5 px-5">
      <div className="flex items-center gap-3 rounded-2xl border border-secondary/20 bg-card/80 px-4 py-3 shadow-lg backdrop-blur-md">
        <Search className="h-5 w-5 text-muted-foreground" />

        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="ابحث عن فعاليات..."
          className="flex-1 bg-transparent text-sm text-foreground focus:outline-none"
        />

        {/* أيقونة المايك المطلوبة */}
        <button
          onClick={handleASR}
          disabled={isRecording}
          className={`transition-all ${isRecording ? "text-red-500 animate-pulse" : "text-secondary"}`}
        >
          {isRecording ? <Loader2 className="h-5 w-5 animate-spin" /> : <Mic className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
