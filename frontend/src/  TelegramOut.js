import { useState } from 'react';
import axiosInstance from './axiosInstance'; // Якщо використовуєте axiosInstance для запитів

const TelegramOut = () => {
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const [error, setError] = useState(null);

    const logout = async () => {
        try {
            const tokenStr = localStorage.getItem('access_token');
            if (!tokenStr) {
                alert('Токен не знайдено');
                return;
            }

            // Надсилаємо запит на бекенд для виходу
            const response = await axiosInstance.delete('/auth/telegram/logout', {
                headers: {
                    Authorization: `Bearer ${tokenStr}`,
                },
            });

            if (response.data.status === 'Logged out successfully') {
                setIsLoggedOut(true);
                localStorage.removeItem('access_token'); // Видалення токену з localStorage
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Помилка при виході');
            console.error('Error logging out:', error);
        }
    };

    if (isLoggedOut) {
        return <div>Ви вийшли з Telegram.</div>;
    }

    return (
        <div>
            <button onClick={logout}>Вийти з Telegram</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default TelegramOut;

