# Cloudflare Pages Setup Guide

This guide will help you deploy your HLPFL website to Cloudflare Pages.

---

## Prerequisites

- Cloudflare account (free tier works)
- GitHub repository access
- Custom domain (optional, but recommended)

---

## Step 1: Connect GitHub Repository to Cloudflare Pages

1. **Log in to Cloudflare Dashboard**
   - Go to https://dash.cloudflare.com
   - Navigate to "Workers & Pages" in the left sidebar

2. **Create New Pages Project**
   - Click "Create application"
   - Select "Pages" tab
   - Click "Connect to Git"

3. **Connect GitHub**
   - Authorize Cloudflare to access your GitHub account
   - Select the repository: `HLPFLCG/HLPFLCO`
   - Click "Begin setup"

---

## Step 2: Configure Build Settings

### Production Branch
- **Production branch**: `main`

### Build Settings
- **Framework preset**: None (Static HTML)
- **Build command**: (leave empty)
- **Build output directory**: `/`
- **Root directory**: `/`

### Environment Variables
No environment variables needed for static site.

---

## Step 3: Deploy

1. Click "Save and Deploy"
2. Cloudflare will automatically deploy your site
3. You'll get a URL like: `hlpfl.pages.dev`

---

## Step 4: Custom Domain Setup

### Add Custom Domain (hlpfl.org)

1. **In Cloudflare Pages Project**
   - Go to your project
   - Click "Custom domains" tab
   - Click "Set up a custom domain"

2. **Add Domain**
   - Enter: `hlpfl.org`
   - Enter: `www.hlpfl.org`
   - Click "Continue"

3. **DNS Configuration**
   - Cloudflare will automatically configure DNS if domain is on Cloudflare
   - If not, add these DNS records:
     ```
     Type: CNAME
     Name: @
     Target: hlpfl.pages.dev
     
     Type: CNAME
     Name: www
     Target: hlpfl.pages.dev
     ```

4. **SSL/TLS**
   - Cloudflare automatically provisions SSL certificate
   - Enable "Always Use HTTPS" in SSL/TLS settings

---

## Step 5: Configure Caching & Performance

### Caching Rules

1. **Go to Caching > Configuration**
   - Browser Cache TTL: 4 hours
   - Enable "Respect Existing Headers"

2. **Page Rules** (optional)
   - Cache Level: Standard
   - Browser Cache TTL: Respect Existing Headers
   - Edge Cache TTL: 2 hours

### Performance Settings

1. **Speed > Optimization**
   - ✅ Auto Minify: HTML, CSS, JavaScript
   - ✅ Brotli compression
   - ✅ Early Hints
   - ✅ HTTP/2
   - ✅ HTTP/3 (QUIC)

2. **Caching**
   - ✅ Tiered Cache
   - ✅ Cache Reserve (optional, paid feature)

---

## Step 6: Security Settings

### SSL/TLS
- **SSL/TLS encryption mode**: Full (strict)
- ✅ Always Use HTTPS
- ✅ Automatic HTTPS Rewrites
- ✅ Minimum TLS Version: 1.2

### Security Headers
Add these headers in Pages project settings:

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

---

## Step 7: Automatic Deployments

### How It Works
- Every push to `main` branch triggers automatic deployment
- Preview deployments for pull requests
- Instant rollback capability

### Deployment Workflow
1. Push changes to GitHub
2. Cloudflare automatically detects changes
3. Builds and deploys in ~1 minute
4. Site is live with new changes

---

## Step 8: Monitoring & Analytics

### Cloudflare Web Analytics
1. Go to "Analytics & Logs" > "Web Analytics"
2. Enable Web Analytics
3. Add the analytics script to your site (optional, GTM already tracks)

### Performance Monitoring
- Monitor Core Web Vitals
- Track page load times
- View traffic patterns
- Analyze cache hit rates

---

## Comparison: GitHub Pages vs Cloudflare Pages

| Feature | GitHub Pages | Cloudflare Pages |
|---------|--------------|------------------|
| **Speed** | Good | Excellent (Global CDN) |
| **SSL** | Free (Let's Encrypt) | Free (Cloudflare) |
| **Custom Domain** | Yes | Yes |
| **Build Time** | ~2-5 min | ~30-60 sec |
| **CDN** | GitHub CDN | Cloudflare Global Network |
| **Caching** | Basic | Advanced |
| **Analytics** | No | Yes (built-in) |
| **DDoS Protection** | Basic | Advanced |
| **Cost** | Free | Free |

**Recommendation**: Use Cloudflare Pages for better performance and features.

---

## Troubleshooting

### Site Not Updating
1. Check deployment status in Cloudflare dashboard
2. Clear Cloudflare cache: "Caching" > "Purge Everything"
3. Check GitHub webhook is working

### Custom Domain Not Working
1. Verify DNS records are correct
2. Wait 24-48 hours for DNS propagation
3. Check SSL certificate status

### 404 Errors
1. Ensure all file paths are correct
2. Check that index.html is in root directory
3. Verify build output directory is set to `/`

---

## Migration from Vercel

### Steps to Disconnect from Vercel

1. **Remove Vercel Project**
   - Log in to Vercel dashboard
   - Go to project settings
   - Delete project

2. **Update DNS**
   - Remove Vercel DNS records
   - Add Cloudflare DNS records (see Step 4)

3. **Update Documentation**
   - Remove Vercel references
   - Update deployment docs

---

## Performance Optimization

### Cloudflare Settings for Best Performance

1. **Caching**
   - Cache static assets for 1 year
   - Cache HTML for 2 hours
   - Enable Tiered Cache

2. **Compression**
   - Enable Brotli
   - Enable Gzip fallback

3. **HTTP/3**
   - Enable QUIC
   - Enable 0-RTT

4. **Image Optimization**
   - Enable Polish (paid feature)
   - Or use Cloudflare Images (paid)

---

## Support

### Cloudflare Resources
- Documentation: https://developers.cloudflare.com/pages
- Community: https://community.cloudflare.com
- Status: https://www.cloudflarestatus.com

### Common Issues
- **Deployment fails**: Check build logs in Cloudflare dashboard
- **Slow performance**: Enable all performance features
- **SSL errors**: Ensure SSL mode is "Full (strict)"

---

## Next Steps

After deployment:
1. ✅ Test site on Cloudflare URL
2. ✅ Configure custom domain
3. ✅ Enable all performance features
4. ✅ Set up monitoring
5. ✅ Update DNS records
6. ✅ Test from multiple locations

---

**Your site will be live at**: `https://hlpfl.pages.dev` (and `https://hlpfl.org` with custom domain)

**Deployment time**: ~1 minute per update

**Global CDN**: Your site will be served from 275+ locations worldwide! 🌍