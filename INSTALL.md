# Installation Guide: Deploying Next.js on AlmaLinux 9

This guide provides instructions for deploying a Next.js application on AlmaLinux 9.

## Prerequisites

Before you begin, ensure that the following prerequisites are installed on your AlmaLinux 9 server:

*   **Node.js and npm:** Install the latest LTS version of Node.js and npm. You can typically install them using a package manager like `dnf`.
*   **Git:** For cloning your application repository.
*   **PM2:** A process manager for keeping your Node.js application running.
*   **Nginx:** A web server to proxy requests to your Node.js application (assuming Nginx is already installed and running).
## Installation Steps

1.  **Clone the Repository:**
    Clone your Next.js application repository to your server. Replace `<your-repository-url>` with the actual URL of your Git repository.
```
bash
    git clone <your-repository-url>
    cd <your-application-directory>
    
```
Replace `<your-application-directory>` with the name of the directory created by cloning your repository.

2.  **Install Dependencies:**
    Navigate to your application directory and install the necessary dependencies using npm.
```
bash
    npm install
    
```
3.  **Build the Application:**
    Build your Next.js application for production.
```
bash
    npm run build
    
```
This will create a `.next` directory with the production build.

4.  **Start the Application with PM2:**
    Use PM2 to start your Next.js application in production mode. This will keep your application running in the background and handle restarts in case of crashes.
```
bash
    pm2 start npm --name "my-next-app" -- start
    
```
Replace `"my-next-app"` with a desired name for your application process.

    To ensure PM2 starts your application on server boot, save the process list:
```
bash
    pm2 save
    
```
Then, generate the startup script:
```
bash
    pm2 startup systemd
    
```
Follow the instructions provided by the `pm2 startup` command to complete the setup.

5.  **Configure Nginx:**
    **Note:** This guide assumes you are serving the application directly using Node.js's built-in HTTP server via PM2. You can access the application directly on the port it's running on (default is 3000). If you require a production web server with features like SSL, caching, or load balancing, you would typically configure Nginx or Apache to proxy requests to your Node.js application.

## Database Installation and Configuration

This section outlines the steps to install and configure your PostgreSQL database.
Replace `[Your Database Name]` and `[Your Database User]` with your desired names, and `[Your Strong Password]` with a secure password.

## Database Installation and Configuration

This section outlines the steps to install and configure your PostgreSQL database. Replace `[Your Database Name]` and `[Your Database User]` with your desired names, and `[Your Strong Password]` with a secure password.

### Installing the Database Server

1.  **Install PostgreSQL:**
    Use `dnf` to install the PostgreSQL server and client:


bash sudo dnf install postgresql-server postgresql

2.  **Initialize the Database:**
    Initialize the PostgreSQL database:


bash sudo postgresql-setup --initdb

3.  **Start the PostgreSQL Service:**
    Start the PostgreSQL service and enable it to start on boot:


bash sudo systemctl start postgresql sudo systemctl enable postgresql

### Configuring the Database

1.  **Switch to the `postgres` user:**
    The `postgres` user is the default superuser for PostgreSQL.


bash sudo su - postgres

2.  **Create a new database:**
    Create a database for your project. Replace `[Your Database Name]` with your desired database name.


bash createdb [Your Database Name]

3.  **Create a new database user:**
    Create a user for your project's application to connect to the database. Replace `[Your Database User]` and `[Your Strong Password]` with your desired username and a strong password.


bash createuser --interactive --pwprompt [Your Database User]

When prompted, enter the password you want for the user and answer the questions about the user's privileges (usually, you'll want this user to be able to create databases and roles, but grant necessary privileges based on your application's needs).

4.  **Grant privileges to the user:**
    Grant the necessary privileges on your database to the new user. Replace `[Your Database Name]` and `[Your Database User]` accordingly.


sql GRANT ALL PRIVILEGES ON DATABASE [Your Database Name] TO [Your Database User];

5.  **Exit the `postgres` user session:**


bash exit

### Database Schema (Example)

This is an **example** database schema based on the types seen in the project (users, events, donations, group chats, news posts). **You will need to adapt this schema to your project's specific requirements.**


sql -- Example Users Table CREATE TABLE users ( id SERIAL PRIMARY KEY, username VARCHAR(255) UNIQUE NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, password_hash VARCHAR(255) NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP );

-- Example Events Table CREATE TABLE events ( id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT, event_date TIMESTAMP WITH TIME ZONE NOT NULL, location VARCHAR(255), created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, created_by INT REFERENCES users(id) ON DELETE SET NULL );

-- Example Donations Table CREATE TABLE donations ( id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id) ON DELETE SET NULL, amount DECIMAL(10, 2) NOT NULL, donation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP );

-- Example Group Chats Table CREATE TABLE group_chats ( id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP );

-- Example News Posts Table CREATE TABLE news_posts ( id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, content TEXT NOT NULL, published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, author_id INT REFERENCES users(id) ON DELETE SET NULL );

-- Example table for linking users and group chats (many-to-many relationship) CREATE TABLE user_group_chats ( user_id INT REFERENCES users(id) ON DELETE CASCADE, group_chat_id INT REFERENCES group_chats(id) ON DELETE CASCADE, PRIMARY KEY (user_id, group_chat_id) );

-- You will need to add more tables and relationships based on your application's needs. -- Consider tables for messages within group chats, comments on news posts, etc.

### Connecting Your Application

Update your application's configuration to connect to the PostgreSQL database
```
nginx
    server {
        listen 80;
        server_name your_domain_or_ip_address; # Replace with your domain name or server IP

        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    
```
Replace `your_domain_or_ip_address` with your server's domain name or IP address.

    Test the Nginx configuration for syntax errors:
```
bash
    sudo nginx -t
    
```
If the test is successful, reload the Nginx configuration to apply the changes:
```
bash
    sudo systemctl reload nginx
    
```
## Accessing Your Application

Your Next.js application should now be accessible through your domain name or server IP address configured in Nginx.

## Troubleshooting

*   **Firewall:** Ensure that your firewall is configured to allow traffic on port 80 (or the port you configured Nginx to listen on).
*   **PM2 Logs:** Check PM2 logs for any application errors: `pm2 logs my-next-app`.
*   **Nginx Logs:** Check Nginx error logs for any proxying issues.
*   **Permissions:** Ensure that the user running the Node.js process has the necessary permissions to access the application files.

This guide provides a basic setup. Depending on your application's requirements, you might need to configure SSL, set up environment variables, or perform other advanced configurations.