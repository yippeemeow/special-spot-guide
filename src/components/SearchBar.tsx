import { Search, Mic } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="-mt-5 px-5">
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg">
        <Search className="h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="ابحث عن فعالية، بوث، خدمة، أو موقع..."
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          dir="rtl"
        />
        <button className="text-primary">
          <Mic className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
