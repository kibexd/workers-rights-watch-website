# VERCEL DEPLOYMENT GUIDE
## Workers' Rights Watch Website - Next.js to Vercel

---

## OVERVIEW

This guide outlines the steps to deploy the Workers Rights Watch Next.js website to Vercel and migrate the domain from cPanel to Vercel hosting.

---

## PRE-DEPLOYMENT CHECKLIST

Before deploying, ensure:

- ☐ Client approval received for Vercel hosting
- ☐ Handover Agreement signed
- ☐ Payment received as per contract
- ☐ GitHub repository is up to date
- ☐ All environment variables documented
- ☐ Old WordPress site backed up

---

## STEP 1: PREPARE GITHUB REPOSITORY

### 1.1 Push Latest Code to GitHub

```bash
# Ensure all changes are committed
git add .
git commit -m "Final production build - ready for deployment"
git push origin main
```

### 1.2 Verify Repository

- Confirm all files are pushed
- Check that `.env.example` is present (NOT `.env` with actual secrets)
- Verify `package.json` and `next.config.js` are correct

---

## STEP 2: CREATE VERCEL ACCOUNT

### 2.1 Sign Up for Vercel

1. Go to: https://vercel.com/signup
2. Sign up with GitHub account (recommended) or email
3. Use email: **kibeenock7390@gmail.com** or designated account
4. Connect GitHub account if not signed up via GitHub

### 2.2 Install Vercel CLI (Optional but Recommended)

```bash
npm install -g vercel
vercel login
```

---

## STEP 3: DEPLOY TO VERCEL

### 3.1 Import Project from GitHub

1. Log into Vercel Dashboard: https://vercel.com/dashboard
2. Click **"New Project"**
3. Click **"Import Git Repository"**
4. Select the Workers Rights Watch repository
5. Click **"Import"**

### 3.2 Configure Project Settings

**Framework Preset:** Next.js (auto-detected)

**Root Directory:** `./` (leave default)

**Build Command:** `npm run build` (default)

**Output Directory:** `.next` (default)

**Install Command:** `npm install` (default)

**Node.js Version:** 18.x or 20.x (recommended)

### 3.3 Add Environment Variables

If the project requires environment variables (contact forms, analytics, etc.):

1. Click **"Environment Variables"**
2. Add each variable:
   - `NEXT_PUBLIC_SITE_URL` = `https://www.workersrightswatch.org`
   - `CONTACT_EMAIL` = `info@workersrightswatch.org`
   - Add any other required variables

3. Click **"Deploy"**

---

## STEP 4: VERIFY DEPLOYMENT

### 4.1 Check Deployment Status

- Vercel will build and deploy (usually takes 2-5 minutes)
- Monitor build logs for any errors
- Once complete, Vercel provides a preview URL (e.g., `workers-rights-watch-website.vercel.app`)

### 4.2 Test Preview Site

Visit the Vercel preview URL and verify:

- ☐ All pages load correctly
- ☐ Images display properly
- ☐ Contact form works
- ☐ Navigation functions
- ☐ Mobile responsive design
- ☐ PDFs download correctly
- ☐ No broken links

---

## STEP 5: CONFIGURE CUSTOM DOMAIN

### 5.1 Add Domain in Vercel

1. In Vercel Dashboard, go to project **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `workersrightswatch.org`
4. Click **"Add"**
5. Also add: `www.workersrightswatch.org`

### 5.2 Get DNS Configuration Details

Vercel will provide DNS records to add. Typically:

**For Root Domain (workersrightswatch.org):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For WWW Subdomain (www.workersrightswatch.org):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Note:** DNS records may vary. Use the exact values Vercel provides.

---

## STEP 6: UPDATE DNS SETTINGS

### 6.1 Access Domain Registrar

1. Log into the domain registrar where `workersrightswatch.org` is registered
2. Go to **DNS Management** or **DNS Settings**

### 6.2 Update DNS Records

**Option A: If using cPanel DNS (Current Setup)**

1. Log into cPanel
2. Go to **Zone Editor** or **DNS Zone Editor**
3. Find `workersrightswatch.org`
4. Update or add the A record:
   - Type: `A`
   - Name: `@` or leave blank
   - Points to: `76.76.21.21` (or Vercel's provided IP)
   - TTL: `3600` (1 hour)

5. Update or add the CNAME record:
   - Type: `CNAME`
   - Name: `www`
   - Points to: `cname.vercel-dns.com` (or Vercel's provided value)
   - TTL: `3600`

**Option B: If using Domain Registrar's DNS**

1. Log into domain registrar (e.g., GoDaddy, Namecheap, Kenya Domain Registrar)
2. Go to DNS management
3. Delete or update old A records pointing to cPanel IP (`192.185.184.214`)
4. Add new A and CNAME records as provided by Vercel

### 6.3 Save DNS Changes

- Click **"Save"** or **"Update"**
- DNS propagation takes **15 minutes to 48 hours** (usually 1-2 hours)

---

## STEP 7: VERIFY DOMAIN CONNECTION

### 7.1 Check DNS Propagation

Use online tools to check DNS propagation:
- https://www.whatsmydns.net
- Enter: `workersrightswatch.org`
- Should show Vercel's IP address globally

### 7.2 Verify in Vercel

1. Go to Vercel Dashboard → **Domains**
2. Check that `workersrightswatch.org` shows **"Valid Configuration"**
3. SSL certificate should auto-generate (takes 1-5 minutes after DNS propagates)

### 7.3 Test Live Site

Visit:
- https://workersrightswatch.org
- https://www.workersrightswatch.org

Both should load the new Next.js website with HTTPS (secure padlock icon).

---

## STEP 8: POST-DEPLOYMENT TASKS

### 8.1 Update Google Search Console (if applicable)

1. Add new Vercel URL as a property
2. Submit new sitemap: `https://workersrightswatch.org/sitemap.xml`

### 8.2 Update Google Analytics (if applicable)

- Verify tracking code is working on the new site
- Check real-time reports

### 8.3 Set Up Redirects (if needed)

If old WordPress URLs differ from new Next.js URLs, configure redirects in `next.config.js`:

```javascript
async redirects() {
  return [
    {
      source: '/old-about-page',
      destination: '/about',
      permanent: true,
    },
  ]
}
```

### 8.4 Monitor for 48 Hours

- Check website uptime
- Monitor Vercel dashboard for errors
- Test all functionality thoroughly
- Check email notifications (contact forms)

---

## STEP 9: BACKUP OLD WORDPRESS SITE

### 9.1 Backup via cPanel

1. Log into cPanel
2. Go to **File Manager**
3. Navigate to `public_html` or WordPress directory
4. Select all files → **Compress** → Download ZIP
5. Go to **phpMyAdmin** → Export database

### 9.2 Store Backup Securely

- Save backup files to external storage (Google Drive, Dropbox, etc.)
- Label: `WRW_WordPress_Backup_[DATE]`
- Keep for at least 6 months

---

## STEP 10: HANDOVER TO CLIENT

### 10.1 Provide Credentials

Send to Mrs. Eunice Waweru:

**Vercel Account:**
- Email: [account email]
- Password: [secure password]
- Dashboard: https://vercel.com/dashboard

**GitHub Repository:**
- URL: https://github.com/[username]/workers-rights-watch-website
- Access: Invite as collaborator with Read access

### 10.2 Provide Documentation

- Vercel Dashboard Guide
- Content Update Request Process
- Contact information for support

### 10.3 Schedule Training

- 2-hour training session (included in contract)
- Cover: Vercel dashboard navigation, requesting updates, monitoring performance

---

## TROUBLESHOOTING

### Issue: DNS Not Propagating

**Solution:**
- Wait 24-48 hours
- Clear browser cache
- Try different devices/networks
- Check DNS records are correct

### Issue: SSL Certificate Not Generating

**Solution:**
- Ensure DNS is fully propagated
- In Vercel, go to Domains → Click "Refresh" next to domain
- Contact Vercel support if issue persists

### Issue: Build Errors on Vercel

**Solution:**
- Check build logs in Vercel dashboard
- Ensure all dependencies in `package.json`
- Verify Node.js version compatibility
- Test build locally: `npm run build`

### Issue: Images Not Loading

**Solution:**
- Check image paths (use relative paths)
- Verify images are in `public/` directory
- Check `next.config.js` image configuration

---

## ROLLBACK PLAN (If Needed)

If critical issues arise and rollback is necessary:

1. Log into domain DNS management
2. Change A record back to cPanel IP: `192.185.184.214`
3. Remove or disable CNAME record for `www`
4. Wait for DNS to propagate (1-2 hours)
5. Old WordPress site will be live again
6. Fix issues with Next.js site
7. Redeploy when ready

---

## MAINTENANCE & UPDATES

### Deploying Updates After Initial Launch

**Automatic Deployments:**
- Push code to GitHub `main` branch
- Vercel auto-detects and deploys
- Usually takes 1-2 minutes

**Manual Deployments:**
```bash
# From project directory
vercel --prod
```

### Monitoring

- Vercel Dashboard: Monitor uptime, performance, errors
- Set up email alerts for deployment failures
- Check analytics regularly

---

## CONTACT & SUPPORT

**Developer Support:**
- Enock Kibe Ngunyi
- Email: kibeenock7390@gmail.com
- Phone/WhatsApp: 0735663656

**Vercel Support:**
- Help Center: https://vercel.com/support
- Documentation: https://vercel.com/docs

---

**Deployment Completed:** ☐  
**Date:** ______________  
**Deployed By:** Enock Kibe Ngunyi

