# 🚀 Deployment Guide

## Production Deployment Options

### Option 1: Traditional VPS (DigitalOcean, AWS EC2, Linode)

#### Backend Deployment

1. **Setup Server**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python
sudo apt install python3.11 python3-pip -y

# Install nginx
sudo apt install nginx -y
```

2. **Clone & Setup**
```bash
git clone <your-repo>
cd ai-negotiator/backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
pip install gunicorn
```

3. **Configure Environment**
```bash
nano .env
```
```env
DATABASE_URL=sqlite:///./negotiator.db
SECRET_KEY=<generate-strong-key>
ALLOWED_ORIGINS=https://yourdomain.com
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

4. **Create Systemd Service**
```bash
sudo nano /etc/systemd/system/negotiator.service
```
```ini
[Unit]
Description=AI Negotiator Backend
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/ai-negotiator/backend
Environment="PATH=/home/ubuntu/ai-negotiator/backend/venv/bin"
ExecStart=/home/ubuntu/ai-negotiator/backend/venv/bin/gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000

[Install]
WantedBy=multi-user.target
```

5. **Start Service**
```bash
sudo systemctl daemon-reload
sudo systemctl start negotiator
sudo systemctl enable negotiator
sudo systemctl status negotiator
```

6. **Configure Nginx**
```bash
sudo nano /etc/nginx/sites-available/negotiator
```
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /ws {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/negotiator /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

7. **SSL Certificate**
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d api.yourdomain.com
```

#### Frontend Deployment

1. **Build Frontend**
```bash
cd frontend
npm install
npm run build
```

2. **Configure Nginx for Frontend**
```bash
sudo nano /etc/nginx/sites-available/negotiator-frontend
```
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/negotiator/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://api.yourdomain.com;
    }
}
```

3. **Deploy Files**
```bash
sudo mkdir -p /var/www/negotiator
sudo cp -r dist/* /var/www/negotiator/
sudo chown -R www-data:www-data /var/www/negotiator
```

4. **Enable & SSL**
```bash
sudo ln -s /etc/nginx/sites-available/negotiator-frontend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

### Option 2: Docker Deployment

1. **Build & Run**
```bash
docker-compose up -d
```

2. **Production Docker Compose**
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    restart: always
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/negotiator
      - SECRET_KEY=${SECRET_KEY}
    depends_on:
      - db

  frontend:
    build: ./frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend

  db:
    image: postgres:15
    restart: always
    environment:
      - POSTGRES_DB=negotiator
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

---

### Option 3: Vercel (Frontend) + Railway (Backend)

#### Backend on Railway

1. Create account at railway.app
2. New Project → Deploy from GitHub
3. Select backend folder
4. Add environment variables
5. Deploy!

#### Frontend on Vercel

1. Create account at vercel.com
2. Import Git Repository
3. Framework: Vite
4. Root Directory: frontend
5. Environment Variables:
   - `VITE_API_URL=https://your-backend.railway.app`
6. Deploy!

---

### Option 4: AWS (Full Stack)

#### Backend on Elastic Beanstalk

1. **Install EB CLI**
```bash
pip install awsebcli
```

2. **Initialize**
```bash
cd backend
eb init -p python-3.11 negotiator-backend
```

3. **Create Environment**
```bash
eb create negotiator-prod
```

4. **Deploy**
```bash
eb deploy
```

#### Frontend on S3 + CloudFront

1. **Build**
```bash
cd frontend
npm run build
```

2. **Upload to S3**
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

3. **Configure CloudFront**
- Create distribution
- Origin: S3 bucket
- Enable HTTPS
- Custom error pages: 404 → /index.html

---

### Option 5: Heroku

#### Backend

1. **Create Heroku App**
```bash
heroku create negotiator-backend
```

2. **Add Procfile**
```
web: gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

3. **Deploy**
```bash
git subtree push --prefix backend heroku main
```

#### Frontend

1. **Create App**
```bash
heroku create negotiator-frontend
```

2. **Add Buildpack**
```bash
heroku buildpacks:set heroku/nodejs
```

3. **Deploy**
```bash
git subtree push --prefix frontend heroku main
```

---

## Database Migration (SQLite → PostgreSQL)

1. **Install PostgreSQL**
```bash
sudo apt install postgresql postgresql-contrib -y
```

2. **Create Database**
```bash
sudo -u postgres psql
CREATE DATABASE negotiator;
CREATE USER negotiator_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE negotiator TO negotiator_user;
\q
```

3. **Update .env**
```env
DATABASE_URL=postgresql://negotiator_user:secure_password@localhost:5432/negotiator
```

4. **Install psycopg2**
```bash
pip install psycopg2-binary
```

5. **Restart Backend**
```bash
sudo systemctl restart negotiator
```

---

## Environment Variables Checklist

### Backend
- [ ] `DATABASE_URL` - Database connection string
- [ ] `SECRET_KEY` - JWT secret (generate with `openssl rand -hex 32`)
- [ ] `ALLOWED_ORIGINS` - Frontend URL(s)
- [ ] `JWT_ALGORITHM` - HS256
- [ ] `ACCESS_TOKEN_EXPIRE_MINUTES` - 30

### Frontend
- [ ] `VITE_API_URL` - Backend API URL

---

## Security Checklist

- [ ] Change default SECRET_KEY
- [ ] Enable HTTPS (SSL certificates)
- [ ] Configure CORS properly
- [ ] Use strong database passwords
- [ ] Enable firewall (ufw)
- [ ] Regular security updates
- [ ] Rate limiting
- [ ] Input validation
- [ ] SQL injection protection (SQLAlchemy handles this)
- [ ] XSS protection (React handles this)
- [ ] CSRF tokens for forms
- [ ] Secure headers (nginx)

---

## Performance Optimization

### Backend
- [ ] Use PostgreSQL instead of SQLite
- [ ] Enable database connection pooling
- [ ] Add Redis for caching
- [ ] Use CDN for static files
- [ ] Enable GZip compression
- [ ] Optimize database queries
- [ ] Add database indexes

### Frontend
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Image optimization
- [ ] Bundle size optimization
- [ ] Service worker for PWA
- [ ] CDN for assets

---

## Monitoring & Logging

### Backend Logging
```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)
```

### Tools
- **Sentry** - Error tracking
- **New Relic** - Performance monitoring
- **Datadog** - Infrastructure monitoring
- **LogRocket** - Frontend monitoring
- **Google Analytics** - User analytics

---

## Backup Strategy

### Database Backup
```bash
# Daily backup cron job
0 2 * * * pg_dump negotiator > /backups/negotiator_$(date +\%Y\%m\%d).sql
```

### Automated Backups
- AWS RDS automated backups
- Railway automatic backups
- Manual S3 uploads

---

## CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy Backend
        run: |
          ssh user@server 'cd /app && git pull && systemctl restart negotiator'
      
      - name: Deploy Frontend
        run: |
          cd frontend
          npm install
          npm run build
          scp -r dist/* user@server:/var/www/negotiator/
```

---

## Cost Estimation

### Small Scale (< 1000 users)
- **VPS**: $5-10/month (DigitalOcean, Linode)
- **Domain**: $10-15/year
- **SSL**: Free (Let's Encrypt)
- **Total**: ~$10/month

### Medium Scale (1000-10000 users)
- **VPS**: $20-40/month
- **Database**: $15/month (managed PostgreSQL)
- **CDN**: $5-10/month
- **Total**: ~$50/month

### Large Scale (10000+ users)
- **AWS/GCP**: $200-500/month
- **Database**: $50-100/month
- **CDN**: $20-50/month
- **Monitoring**: $20/month
- **Total**: ~$300-700/month

---

## Post-Deployment Checklist

- [ ] Test all API endpoints
- [ ] Test WebSocket connection
- [ ] Verify authentication works
- [ ] Test negotiation flow
- [ ] Check admin dashboard
- [ ] Verify email notifications (if enabled)
- [ ] Test on mobile devices
- [ ] Check page load times
- [ ] Verify SSL certificate
- [ ] Test error handling
- [ ] Monitor logs for errors
- [ ] Set up alerts
- [ ] Document API for users
- [ ] Create user guide

---

## Rollback Plan

If deployment fails:

1. **Backend**
```bash
sudo systemctl stop negotiator
git checkout <previous-commit>
sudo systemctl start negotiator
```

2. **Frontend**
```bash
git checkout <previous-commit>
npm run build
sudo cp -r dist/* /var/www/negotiator/
```

3. **Database**
```bash
psql negotiator < /backups/negotiator_backup.sql
```

---

## Support & Maintenance

### Regular Tasks
- Weekly: Check logs for errors
- Monthly: Update dependencies
- Quarterly: Security audit
- Yearly: Performance review

### Update Dependencies
```bash
# Backend
pip list --outdated
pip install --upgrade <package>

# Frontend
npm outdated
npm update
```

---

**Need help?** Check the README.md or create an issue on GitHub!
