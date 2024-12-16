# Telegram read Application


## Installation and Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/DmytroDD2/my_telegram_app.git
    cd my_telegram_app
    cd backend
    ```

2. **Create a `.env` file** with the following content:

    ```env
     # API_ID - A unique identifier for your API, 
     # which is used for configuring the TelegramClient.
     # Obtain it by registering on the Telegram Developer platform.

     # API_HASH - A secret key for your API, 
     # which is used for authenticating requests to the Telegram API.
     # This key is also required for configuring the TelegramClient.

3. **Run using Docker:**
    ```bash
    docker compose up --build
    ```





## Documentation
* **frontend** http://localhost:3000
After running the project, you can view the backend documentation at: `http://localhost:8000/docs`.

