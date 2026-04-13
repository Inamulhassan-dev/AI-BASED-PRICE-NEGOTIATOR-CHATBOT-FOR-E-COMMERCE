# 🚀 GitHub Setup Guide

## 📋 Prerequisites

Before pushing to GitHub, ensure you have:
- ✅ Git installed on your system
- ✅ GitHub account created
- ✅ Git configured with your credentials

---

## 🔧 Step 1: Configure Git (First Time Only)

Open Command Prompt or PowerShell and run:

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email (use your GitHub email)
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

---

## 📦 Step 2: Initialize Git Repository

In your project folder, run:

```bash
# Initialize git repository
git init

# Check status
git status
```

---

## 📝 Step 3: Create GitHub Repository

### Option A: Via GitHub Website

1. Go to https://github.com
2. Click the **"+"** icon (top right)
3. Select **"New repository"**
4. Fill in details:
   - **Repository name**: `ai-price-negotiator`
   - **Description**: `AI-powered e-commerce platform with intelligent price negotiation`
   - **Visibility**: Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have them)
5. Click **"Create repository"**

### Option B: Via GitHub CLI (if installed)

```bash
gh repo create ai-price-negotiator --public --description "AI-powered e-commerce platform with intelligent price negotiation"
```

---

## 🔗 Step 4: Add Remote Repository

After creating the repository on GitHub, you'll see a URL like:
- HTTPS: `https://github.com/YOUR_USERNAME/ai-price-negotiator.git`
- SSH: `git@github.com:YOUR_USERNAME/ai-price-negotiator.git`

Add it as remote:

```bash
# Using HTTPS (recommended for beginners)
git remote add origin https://github.com/YOUR_USERNAME/ai-price-negotiator.git

# OR using SSH (if you have SSH keys set up)
git remote add origin git@github.com:YOUR_USERNAME/ai-price-negotiator.git

# Verify remote
git remote -v
```

---

## 📤 Step 5: Add Files and Commit

```bash
# Add all files
git add .

# Check what will be committed
git status

# Commit with message
git commit -m "Initial commit: AI Price Negotiator - Complete project with automation"

# Verify commit
git log --oneline
```

---

## 🚀 Step 6: Push to GitHub

```bash
# Push to main branch
git push -u origin main

# If you get an error about 'master' branch, try:
git branch -M main
git push -u origin main
```

---

## ✅ Step 7: Verify on GitHub

1. Go to your repository: `https://github.com/YOUR_USERNAME/ai-price-negotiator`
2. You should see all your files
3. README.md will be displayed automatically

---

## 🎨 Step 8: Add Repository Topics (Optional)

On your GitHub repository page:
1. Click **"Add topics"** (near the description)
2. Add relevant topics:
   - `ai`
   - `machine-learning`
   - `ecommerce`
   - `chatbot`
   - `price-negotiation`
   - `fastapi`
   - `react`
   - `python`
   - `javascript`
   - `websocket`
   - `nlp`
   - `sentiment-analysis`

---

## 📋 Step 9: Create GitHub Pages (Optional)

To host documentation:

1. Go to repository **Settings**
2. Scroll to **Pages** section
3. Under **Source**, select **main** branch
4. Select **/ (root)** folder
5. Click **Save**
6. Your docs will be available at: `https://YOUR_USERNAME.github.io/ai-price-negotiator/`

---

## 🔐 Step 10: Add Repository Secrets (For CI/CD)

If you plan to use GitHub Actions:

1. Go to repository **Settings**
2. Click **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add secrets like:
   - `SECRET_KEY` - Your backend secret key
   - `DATABASE_URL` - Production database URL
   - etc.

---

## 📊 Step 11: Enable GitHub Features

### Issues
- Go to **Settings** → **General**
- Check **Issues** to enable issue tracking

### Discussions
- Go to **Settings** → **General**
- Check **Discussions** to enable community discussions

### Wiki
- Go to **Settings** → **General**
- Check **Wiki** to enable project wiki

---

## 🔄 Future Updates

When you make changes:

```bash
# Check what changed
git status

# Add changed files
git add .

# Or add specific files
git add path/to/file

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push
```

---

## 🌿 Working with Branches

### Create a new branch
```bash
# Create and switch to new branch
git checkout -b feature/new-feature

# Make changes, then commit
git add .
git commit -m "Add new feature"

# Push branch to GitHub
git push -u origin feature/new-feature
```

### Merge branch
```bash
# Switch to main branch
git checkout main

# Merge feature branch
git merge feature/new-feature

# Push to GitHub
git push
```

---

## 🔧 Troubleshooting

### Issue: "fatal: not a git repository"
**Solution**: Run `git init` in your project folder

### Issue: "remote origin already exists"
**Solution**: 
```bash
git remote remove origin
git remote add origin YOUR_REPO_URL
```

### Issue: "failed to push some refs"
**Solution**:
```bash
git pull origin main --rebase
git push -u origin main
```

### Issue: "Permission denied (publickey)"
**Solution**: Use HTTPS instead of SSH, or set up SSH keys:
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Add to GitHub: Settings → SSH and GPG keys → New SSH key
```

### Issue: Large files error
**Solution**: Use Git LFS for large files:
```bash
git lfs install
git lfs track "*.db"
git add .gitattributes
git commit -m "Add Git LFS"
```

---

## 📚 Useful Git Commands

```bash
# View commit history
git log --oneline --graph --all

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# View differences
git diff

# View remote repositories
git remote -v

# Update from GitHub
git pull

# Clone repository
git clone https://github.com/YOUR_USERNAME/ai-price-negotiator.git

# Check current branch
git branch

# Switch branch
git checkout branch-name

# Delete branch
git branch -d branch-name

# Stash changes
git stash
git stash pop
```

---

## 🎯 Best Practices

1. **Commit Often**: Make small, focused commits
2. **Write Clear Messages**: Use descriptive commit messages
3. **Use Branches**: Create branches for new features
4. **Pull Before Push**: Always pull latest changes before pushing
5. **Review Changes**: Use `git diff` before committing
6. **Ignore Sensitive Data**: Never commit `.env` files or secrets
7. **Use .gitignore**: Keep repository clean
8. **Tag Releases**: Use tags for version releases

---

## 📖 Additional Resources

- **Git Documentation**: https://git-scm.com/doc
- **GitHub Guides**: https://guides.github.com/
- **Git Cheat Sheet**: https://education.github.com/git-cheat-sheet-education.pdf
- **GitHub CLI**: https://cli.github.com/
- **Git LFS**: https://git-lfs.github.com/

---

## 🎉 Success!

Your project is now on GitHub! 🚀

**Repository URL**: `https://github.com/YOUR_USERNAME/ai-price-negotiator`

**Next Steps**:
1. ✅ Add a nice README badge
2. ✅ Set up GitHub Actions for CI/CD
3. ✅ Add contributing guidelines
4. ✅ Create issue templates
5. ✅ Add a license
6. ✅ Enable GitHub Discussions
7. ✅ Star your own repository! ⭐

---

**Need Help?** Check the troubleshooting section or visit GitHub's help center!
