import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chatbot Test",
  robots: { index: false, follow: false },
};

export default function ChatbotTestPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="max-w-lg">
        <p className="text-sm font-medium tracking-widest uppercase text-[#5B3FBE] mb-4">
          Internal Test Page
        </p>
        <h1 className="font-serif text-4xl font-semibold text-[#2A1B5C] mb-4">
          MagicFlow AI Chatbot
        </h1>
        <p className="text-[#1A1A22]/60 text-lg leading-relaxed mb-8">
          The chatbot widget is active on this page only. Use this page to test
          conversation flows, greetings, and responses before going live.
        </p>
        <p className="text-sm text-[#1A1A22]/40">
          Look for the chat bubble in the bottom-right corner.
        </p>
      </div>
    </main>
  );
}
