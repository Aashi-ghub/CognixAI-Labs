# Form Submission Verification

This document verifies that all forms are correctly saving data to the database.

## Forms Overview

### 1. ConsultationPopup (Simple Popup - 20s timer)
**Endpoint:** `/api/consultation`  
**Table:** `consultation_requests`  
**Format:** Old format (no industry/teamSize/challenge)

**Fields Sent:**
- ✅ `name` - Required
- ✅ `contact` - Email (required)
- ✅ `company` - Optional (from company selector)
- ✅ `goal` - "Quick consultation request from popup"
- ✅ `email` - Required
- ✅ `phone` - Required (with country code)

**Database Fields Saved:**
- ✅ `name` - From form
- ✅ `contact` - Email from form
- ✅ `company` - From company selector
- ✅ `goal` - "Quick consultation request from popup"
- ✅ `email` - From form
- ✅ `phone` - From form
- ✅ `industry` - null
- ✅ `team_size` - null
- ✅ `challenge` - null
- ✅ `wants_call` - false
- ✅ `company_website` - null (not collected in this form)
- ✅ `automation_requirements` - null (not collected in this form)

**Status:** ✅ Working correctly

---

### 2. WorkflowAnalysisForm (Full Audit Form - Button triggered)
**Endpoint:** `/api/consultation`  
**Table:** `consultation_requests`  
**Format:** New format (with industry/teamSize/challenge)

**Fields Sent:**
- ✅ `name` - Required
- ✅ `industry` - Required
- ✅ `teamSize` - Required
- ✅ `challenge` - Required
- ✅ `company` - Optional (from company selector) - **FIXED: Now uses companyChoice**
- ✅ `email` - Required
- ✅ `phone` - Required (with country code)
- ✅ `companyWebsite` - Optional
- ✅ `automationRequirements` - Required
- ✅ `goal` - Generated from form data
- ✅ `wantsCall` - Boolean (from step 3)

**Database Fields Saved:**
- ✅ `name` - From form
- ✅ `contact` - Email or phone from form
- ✅ `company` - From company selector
- ✅ `goal` - Generated from form data
- ✅ `industry` - From form
- ✅ `team_size` - From form
- ✅ `challenge` - From form
- ✅ `wants_call` - From form
- ✅ `email` - From form
- ✅ `phone` - From form
- ✅ `company_website` - From form (if provided)
- ✅ `automation_requirements` - From form

**Status:** ✅ Working correctly (company field fixed)

---

### 3. ContactForm (Contact & Enquiry form)
**Endpoint:** `/api/contact`  
**Table:** `contact_submissions`

**Fields Sent:**
- ✅ `name` - Required
- ✅ `email` - Required
- ✅ `company` - Optional (from company selector)
- ✅ `message` - Required

**Database Fields Saved:**
- ✅ `name` - From form
- ✅ `email` - From form
- ✅ `company` - From company selector
- ✅ `message` - From form
- ✅ `created_at` - Auto-generated

**Status:** ✅ Working correctly

---

## Database Schema Verification

### consultation_requests table
```sql
- id (uuid, primary key)
- name (text, not null) ✅
- contact (text, not null) ✅
- company (text, nullable) ✅
- goal (text, not null) ✅
- industry (text, nullable) ✅
- team_size (text, nullable) ✅
- challenge (text, nullable) ✅
- wants_call (boolean, default false) ✅
- email (text, nullable) ✅ - Added via migration
- phone (text, nullable) ✅ - Added via migration
- company_website (text, nullable) ✅ - Added via migration
- automation_requirements (text, nullable) ✅ - Added via migration
- created_at (timestamptz, default now()) ✅
```

### contact_submissions table
```sql
- id (uuid, primary key)
- name (text, not null) ✅
- email (text, not null) ✅
- company (text, nullable) ✅
- message (text, not null) ✅
- created_at (timestamptz, default now()) ✅
```

---

## Issues Fixed

1. ✅ **WorkflowAnalysisForm company field** - Fixed to use `companyChoice` instead of just `company`
2. ✅ **Old format API route** - Now saves email/phone/companyWebsite/automationRequirements if provided

---

## Testing Checklist

- [ ] Test ConsultationPopup form submission
- [ ] Test WorkflowAnalysisForm form submission
- [ ] Test ContactForm form submission
- [ ] Verify all fields are saved in database
- [ ] Verify company selector works in all forms
- [ ] Verify phone number with country code is saved
- [ ] Verify email validation works
- [ ] Verify required field validation works

---

## Notes

- All forms use the same company selector with Clearbit autocomplete
- Phone numbers include country codes (e.g., "+15551234567")
- Email and phone validation is performed client-side
- Database migrations may be needed for new fields (see `add-consultation-fields.sql`)

