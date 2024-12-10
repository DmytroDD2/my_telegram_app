import { useState } from "react";
import axiosInstance from "./axiosInstance";

const TelegramAuth = () => {
    const [phone, setPhone] = useState('+380');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('phone'); // phone -> otp -> chats



    const handleSendOtp = async (e) => {
        e.preventDefault(); 
        try {
            const response = await axiosInstance.post('/auth/telegram/start', {
                phone: phone.trim(),
            });

            const data = response.data;
            console.log(data);
            if (data.status === 'OTP Sent') {
                setStep('otp');
            } else {
                alert('Помилка при відправці OTP.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            alert('Сталася помилка. Перевірте номер телефону.');
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await axiosInstance.post('/auth/telegram/verify', {
                phone: phone.trim(),
                code: otp.trim(),
            });

            const data = response.data;
         
            if (data.status === 'Success') {
                setStep('chats');
                window.location.reload();
            } else {
                alert('Невірний код OTP.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            alert('Сталася помилка. Перевірте правильність введення коду.');
        }
    };



    return (
        <div>
            {step === 'phone' && (
                <div>
                    <h2>Авторизація через Telegram</h2>
                    <form onSubmit={handleSendOtp}>
                        <input
                            maxLength={13}
                            type="text"
                            placeholder="Введіть номер телефону"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)
                            }
                        />
                        <button type="Submit">Отримати код</button>
                    </form>
                </div>
            )}
            {step === 'otp' && (
                <div>
                    <h2>Введіть код OTP</h2>
                    <input
                        type="text"
                        placeholder="Код OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button onClick={handleVerifyOtp}>Підтвердити</button>
                </div>
            )}
        </div>
    );
};

export default TelegramAuth;