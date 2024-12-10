# Telegram read Application


## Installation and Setup

1. **Clone the repository:**
    ```bash
    git clone [https://github.com/DmytroDD2/my_telegram_app.git]
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

     # SQLALCHEMY_DATABASE_URL - The URL for connecting to the PostgreSQL database.
     # Format: postgresql://<username>:<password>@<host>:<port>/<database_name>
     # Change 'username' to your username, 'password' to your password,
     # 'host' to the address of your database server, 
     # and 'database_name' to the name of your database.


3**Set up a Virtual Environment:**
    - Before installing the project dependencies, it's recommended to create a virtual environment:
      ```bash
      python -m venv myenv
      source myenv/bin/activate  # On Windows, use: myenv\Scripts\activate
      ```
4**Install backend dependencies:**
    - Make sure you have `requirements.txt` in your backend directory. Install the dependencies using:
      ```bash
      pip install -r requirements.txt
      ```

5**Run backend:**
    ```bash
    uvicorn app.main:app --reload  
    ```


6**Run frontend:**
   cd fronted
    ```bash
    npm start 
    ```
## Documentation

After running the project, you can view the backend documentation at: `http://localhost:8000/docs`.

