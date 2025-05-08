import { useState } from 'react';


function ChatBox({ insights }) {
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
  
    const handleAsk = async () => {
      if (!question.trim()) return;
      setLoading(true);
      setResponse("");
  
      try {
        const res = await fetch("http://localhost:8000/ask-gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question, insights }),
        });
  
        const data = await res.json();
        setResponse(data.answer);
      } catch (err) {
        console.error("❌ Gemini fetch error:", err);
        setResponse("❌ Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div style={{ marginTop: "2rem", maxWidth: "600px" }}>
        <h3>Ask Udyam AI 🤖</h3>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about market potential..."
          style={{ padding: "0.5rem", width: "100%", marginBottom: "0.5rem" }}
        />
        <button onClick={handleAsk}>Ask</button>
  
        {loading && <p>💬 Generating response...</p>}
  
        {!loading && response && (
          <div style={{ marginTop: "1rem", backgroundColor: "#f4f4f4", padding: "1rem" }}>
            <strong>Udyam AI says:</strong>
            <p>{response}</p>
          </div>
        )}
      </div>
    );
  }
  

export default ChatBox;