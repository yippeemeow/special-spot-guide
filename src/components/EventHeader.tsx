import { Bell, User } from "lucide-react";

const EventHeader = () => {
  return (
    <div className="relative overflow-hidden rounded-b-3xl px-5 pb-6 pt-10" style={{ background: "var(--gradient-header)" }}>
      {/* Decorative circles */}
      <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary-foreground/5" />
      <div className="absolute -right-5 top-10 h-24 w-24 rounded-full bg-primary-foreground/5" />
      
      <div className="relative flex items-start justify-between">
        <div className="flex gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/15 text-primary-foreground">
            <User className="h-5 w-5" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/15 text-primary-foreground">
            <Bell className="h-5 w-5" />
          </button>
        </div>
        <div className="text-right">
          <h1 className="text-3xl font-bold text-primary-foreground">مسارك</h1>
          <p className="text-sm text-primary-foreground/80">فعالية شركة علم للابتكار الرقمي</p>
          <p className="mt-1 text-xs text-primary-foreground/60">مرحبًا بك في فعالية علم · ٤:٠٠ م – ١١:٠٠ م</p>
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
