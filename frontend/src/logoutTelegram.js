import axiosInstance from './axiosInstance'; // Імпортуємо ваш налаштований axiosInstance

export const logoutTelegram = async () => {
    try {
        const tokenStr = localStorage.getItem('access_token');
        if (!tokenStr) {
            alert('Токен не знайдено');
            return;
        }

       
        const response = await axiosInstance.delete('/auth/telegram/logout', {
            headers: {
                Authorization: `Bearer ${tokenStr}`,
            },

        });

        if (response.data.status === 'Logged out successfully') {
            alert('Вихід з Telegram успішний.');
            window.location.reload();
           
        } else {
            alert('Не вдалося виконати вихід.');
        }
    } catch (error) {
        console.error('Помилка при виході з Telegram:', error);
        alert('Сталася помилка: ' + (error.response?.data?.message || 'невідома'));
    }
};
