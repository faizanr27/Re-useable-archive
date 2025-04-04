```
sudo nano /etc/nginx/sites-available/<projectname>
```
---------------------------------------------------
```
server {
    listen 80;
    server_name <domain name>; // domain name

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
------------------------------------------------
```
sudo ln -s /etc/nginx/sites-available/<projectname> /etc/nginx/sites-enabled/
sudo nginx -t  # Test the configuration
sudo systemctl reload nginx
```


------------------------------------------
```
sudo apt install certbot python3-certbot-nginx -y

sudo certbot --nginx -d <domain-name>
```

