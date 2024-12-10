import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance"; // Ваш настроєний axios
import "./ChatMessages.css"
const ChatMessages = ({ chatId }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
           
            try {
                const response = await axiosInstance.get(`/chats/messages`, {
                    params: { chat_id: chatId },
                });
                

                if (response.data.status === "Success") {
                    setMessages(response.data.messages);
                } else {
                    setError(response.data.message || "Не вдалося завантажити повідомлення.");
                }
            } catch (err) {
                console.error("Error fetching messages:", err);
                setError("Помилка завантаження повідомлень.");
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [chatId]);

    if (loading) return <div>Завантаження повідомлень...</div>;

    if (error) return <div>Помилка: {error}</div>;

    const renderTextWithLinks = (text) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g; // Регулярний вираз для знаходження URL
        return text.split(urlRegex).map((part, index) => 
          urlRegex.test(part) ? 
            <a key={index} href={part} target="_blank" rel="noopener noreferrer">{part}</a> : 
            part
        );
      };
      const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        const formattedDate = new Date(date).toLocaleString('uk-UA', options).replace(',', '');
        return formattedDate;
      };

   
    return (
        <div className="chat-messages">
    <h3>Повідомлення чату</h3>
    {messages.length > 0 ? (
        
        <ul className="message-list">
        {messages.map((message) => (
            
            <li key={message.id} className="message-item">
                <div className="message-content">
                    <p className="time">{formatDate(message.date) || "Дата невідома"}</p>
                    <p>{renderTextWithLinks(message.text || "Текст відсутній")}</p>
                
                    {/* {message.media && (
                        <p><strong>Медіа:</strong> {message.media}</p>
                    )} */}
                </div>
            </li>
        ))}
    </ul>
    ) : (
        <div className="no-messages">Повідомлення відсутні.</div>
    )}
</div>
    );
};

export default ChatMessages;
