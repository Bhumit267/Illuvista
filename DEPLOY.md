# How to Deploy IlluVista to Railway

Since your code is already on GitHub, deploying to Railway is straightforward.

## Prerequisites
- A GitHub account (you already have this).
- A [Railway](https://railway.app/) account (Sign up using GitHub).

## Deployment Steps

1. **Login to Railway**
   - Go to [railway.app](https://railway.app/).
   - Click "Login" and continue with GitHub.

2. **Create a New Project**
   - Click the **+ New Project** button on your dashboard.
   - Select **Deploy from GitHub repo**.

3. **Select Your Repository**
   - Search for **Illuvista**.
   - Select `Bhumit267/Illuvista`.
   - Click **Deploy Now**.

4. **Wait for Build**
   - Railway will automatically detect this is a Next.js project.
   - It will run `npm install` and `npm run build`.
   - You can view the logs in the "Deployments" tab.

5. **Access Your Live Site**
   - Once the build finishes (shows a green checkmark), Railway will generate a domain for you.
   - Click on the generated URL (e.g., `illuvista-production.up.railway.app`) to view your live SaaS platform!

## Troubleshooting
- **Build Fails?** Check the "Build Logs". Ensure `npm run build` works locally (we verified this).
- **Environment Variables**: Currently, we use a mock database, so no special variables are needed. In the future, you would add database URLs in the "Settings" > "Variables" tab.
