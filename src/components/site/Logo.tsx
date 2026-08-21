export function Logo({
  className = "h-10 w-auto",
  variant = "default",
  showText = true,
}: {
  className?: string;
  variant?: "default" | "light";
  showText?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${variant === "light" ? "text-white" : "text-espresso"}`}>
      <img
        src="/logo.png"
        alt="AYMOXI logo"
        width={40}
        height={40}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className={`${className} object-contain`}
      />
      {showText && (
        <span className="font-display text-lg font-extrabold tracking-tight sm:text-xl">AYMOXI</span>
      )}
    </span>
  );
}
