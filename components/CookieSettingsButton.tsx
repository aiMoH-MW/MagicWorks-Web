"use client";

export default function CookieSettingsButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("mw:open-cookie-settings"))}
      className="block text-white/70 text-[13px] py-[6px] hover:text-[#D4A537] hover:pl-1 transition-all text-left w-full"
    >
      Cookie Settings
    </button>
  );
}
