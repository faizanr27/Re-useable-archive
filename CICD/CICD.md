# This files contains ci cd guide
```
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci || npm install
      - name: Run the Typescript compiler
        run: npm run build
```

```
  deploy:
    name: Deploy Node.js Application to vps
    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Deploy Nodejs on hostinger
        uses: appleboy/ssh-action@v1.2.2
        with:
          host: ${{ secrets.VPS_HOST}}
          username: ${{ secrets.VPS_USER}}
          key: ${{ secrets.VPS_SSH_KEY}}
          port: 22
          script: |
             set -e
             PROJECT_DIR="Re-useable-archive"
             # Create project directory if it doesn't exist
             if [ ! -d "$PROJECT_DIR" ]; then
                git clone https://github.com/faizanr27/Re-useable-archive.git
             fi

             cd "$PROJECT_DIR"
             git fetch origin main
             git pull origin main

             # Install dependencies
             npm ci || npm install
             npm run build

             if pm2 list | grep -q "$PROJECT_DIR"; then
                pm2 restart "$PROJECT_DIR"
             else
                pm2 start dist/index.js --name "$PROJECT_DIR"
             fi
```
