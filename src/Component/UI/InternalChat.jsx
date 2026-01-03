import React from "react";
import { useState, useEffect, useRef } from "react";
import { dataBase, auth } from "../../../Firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";

function InternalChat({ fundingId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [fundedUserId, setFundedUserId] = useState(null);
  const scrollRef = useRef();

  const currentUserId = auth.currentUser?.uid;

  // 1. Get the recipient (the person who posted the request)
  useEffect(() => {
    const fetchRecipient = async () => {
      const docRef = doc(dataBase, "fundingRequests", fundingId);
      const snap = await getDoc(docRef);
      if (snap.exists()) setFundedUserId(snap.data().userId);
    };
    if (fundingId) fetchRecipient();
  }, [fundingId]);

  // 2. Listen for messages in real-time
  useEffect(() => {
    if (!currentUserId || !fundedUserId) return;

    // Create a unique ID for this specific pair of users
    const chatId = [currentUserId, fundedUserId].sort().join("_");
    const q = query(
      collection(dataBase, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      // Scroll to bottom when new message arrives
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => unsubscribe();
  }, [fundedUserId, currentUserId]);

  // 3. Send Message function
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const chatId = [currentUserId, fundedUserId].sort().join("_");
    await addDoc(collection(dataBase, "chats", chatId, "messages"), {
      text: newMessage,
      senderId: currentUserId,
      createdAt: serverTimestamp(),
    });

    setNewMessage("");
  };

  //   if (!fundedUserId) return <p>Loading chat...</p>;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        width: "400px",
        height: "500px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Messages Window */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              textAlign: msg.senderId === currentUserId ? "right" : "left",
              margin: "5px",
            }}
          >
            <span
              style={{
                background:
                  msg.senderId === currentUserId ? "#007bff" : "#e9e9eb",
                color: msg.senderId === currentUserId ? "white" : "black",
                padding: "8px",
                borderRadius: "10px",
                display: "inline-block",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={sendMessage}
        style={{
          display: "flex",
          padding: "10px",
          borderTop: "1px solid #eee",
        }}
      >
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: "8px" }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default InternalChat;
