# Set Up Nginx Reverse Proxy
Since your backend runs on a port like 3000, we need to configure Nginx to forward traffic from http://shortsy.xyz to your backend.

## Step 1: Create an Nginx Config File
Run:
```
sudo nano /etc/nginx/sites-available/shortsy
Paste this config (replace 3000 with your backend port):

server {
    listen 80;
    server_name shortsy.xyz www.shortsy.xyz;

    location / {
        proxy_pass http://localhost:3000;  # Change port if your backend is running on a different one
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Save and exit (CTRL + X, then Y, then Enter).

Step 2: Enable the Config
Run:
```
sudo ln -s /etc/nginx/sites-available/shortsy /etc/nginx/sites-enabled/
```
Step 3: Test and Restart Nginx
```
sudo nginx -t  # Check for errors
sudo systemctl restart nginx  # Restart Nginx
3️⃣ Open Your Domain in a Browser
Now, go to:
👉 http://shortsy.xyz
```
Your backend should now be accessible without needing the port. 🎉

4️⃣ (Optional) Enable HTTPS (SSL)
If you want HTTPS, run:

```
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d shortsy.xyz -d www.shortsy.xyz
```
This will automatically get an SSL certificate and set up HTTPS.
