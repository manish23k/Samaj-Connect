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

### Installing the Database Server

1.  **Install PostgreSQL:**
    Use `dnf` to install the PostgreSQL server and client:


1.  **Install the database server:**
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