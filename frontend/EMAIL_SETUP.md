# Email Notifications Setup - Resend.com

## ✅ Setup Complete!

Email notifications are now configured and will automatically send when forms are submitted.

## Configuration

- **API Key**: Hardcoded in `lib/email.ts`
- **From Email**: `onboarding@resend.dev` (Resend default - works for testing)
- **Notification Email**: `gaurav@cognixai.com` (receives all form submissions)

## What You'll Receive

### Contact Form Submissions
- Name, Email, Company, Message
- Direct reply button
- Link to admin dashboard

### Consultation Requests
- Full contact information
- For AI Workflow Audit: Industry, Team Size, Challenge details
- Wants Strategy Call indicator
- Direct reply and call buttons

## Update Notification Email

To change where notifications are sent, edit `lib/email.ts`:

```typescript
const NOTIFICATION_EMAIL = "your-email@example.com"
```

## Update From Email (Production)

For production, verify your domain in Resend and update:

1. Go to Resend Dashboard → Domains
2. Add and verify your domain
3. Update `FROM_EMAIL` in `lib/email.ts`:
   ```typescript
   const FROM_EMAIL = "notifications@yourdomain.com"
   ```

## Resend Free Tier

- ✅ **3,000 emails/month** - Perfect for form submissions
- ✅ **No credit card required**
- ✅ **All features included**

## Testing

1. Submit a form on your website
2. Check your email inbox (`gaurav@cognixai.com`)
3. You should receive a beautifully formatted email with all submission details

## Email Features

- 📧 HTML formatted emails
- 🎨 Branded design with your colors
- 🔗 Direct reply links
- 📞 Phone number links (click to call)
- 🔗 Dashboard links
- ✅ Works for both contact and consultation forms

---

**Status**: ✅ Active and ready to receive notifications!

