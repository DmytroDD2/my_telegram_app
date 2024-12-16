import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import ChatMessages from "../ChatMessages/ChatMessages";

import styles from "./GetChatsApp.module.css";
import { use } from "react";
import AuthForm from "../AuthForm";
import TelegramAuth from "../TelegramAuth";
import { logoutTelegram } from "../logoutTelegram";

const GetChatsApp = ({acess}) => {
    const [error, setError] = useState(false);
    const [chats, setChats] = useState([]);
    const [messageTrue, setMssageTrue] = useState(null)
    

    useEffect(() => {
        const fetchChats = async () => {
            try {
                let tokenStr = localStorage.getItem('access_token');
                
              
                if (!tokenStr) {
                    alert('Токен не знайдено');
                    return;
                }

                const response = await axiosInstance.get('/auth/telegram/chats', {
                    headers: {
                        Authorization: `Bearer ${tokenStr}`,
                    },
                });
                if (response.data.status === "Error" && response.data.message === "Session not found") {
                    setMssageTrue("Session not found")
                    return;
                }
               
                setChats(response.data.chats); 
                
            } catch (error) {
                console.error('Error loading chats:', error);
                setError(true);
               
            }
        };

        fetchChats();
    }, []); 


    const handleChatClick = (chat_id) => {
        setMssageTrue(chat_id)
        
     
    }
    const logout = () => {
        localStorage.removeItem('access_token');
        acess()

         
      };

    return (
            <div>

        {messageTrue === "Session not found"? (
            <div>
            <TelegramAuth />
            <button onClick={logout}>Вийти</button>
        </div>
        ) : (
            <>
                <button className={styles.chat_button} onClick={logout}>Вийти</button>
                <button  className={styles.chat_button} onClick={() => logoutTelegram()}>Вийти з Telegram</button>
                <div className={styles.list_connencts}>
                    <section className={styles.list_of_chats}>
                        {chats.map((chat, index) => (
                            <section 
                                key={index}
                                className={styles.chat_item}
                                onClick={() => handleChatClick(chat.id)}
                            >
                                <strong>{chat.name}</strong> (ID: {chat.id})
                            </section>
                        ))}
                    </section>
                    {messageTrue && <ChatMessages chatId={messageTrue} />}
                  
                </div>
            </>
        )}
    </div>

    );
};

export default GetChatsApp;
