"use client";

import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    setLoading(true);
    setResponse("");

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    const cleanAnswer = data.answer.replace(/^As an AI language model,?\\s*/i, "");
    setResponse(cleanAnswer);
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-white text-black">
      <h1 className="text-4xl font-bold mb-2">Let Me Ask AI For You</h1>
      <p className="text-gray-600 mb-6">You could’ve just asked ChatGPT…</p>

      <div className="w-full max-w-xl">
        <input
          type="text"
          placeholder="What did they ask you?"
          className="w-full border rounded px-4 py-2 text-lg mb-4"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          onClick={askAI}
          disabled={!question || loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "Thinking..." : "Ask AI for them"}
        </button>

        {response && (
          <div className="mt-6 p-4 bg-gray-100 border rounded">
            <p className="text-sm text-gray-500">AI says:</p>
            <p className="mt-1 text-lg whitespace-pre-line">{response}</p>
          </div>
        )}
      </div>

      <div className="mt-10 text-sm text-gray-400">
        Passive-aggressive mode coming soon 🙃
      </div>
    </main>
  );
}