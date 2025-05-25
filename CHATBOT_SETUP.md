# 🤖 DrugForge AI Chatbot Setup Guide

## Current Status
The chatbot is experiencing API rate limit issues. The application now includes enhanced error handling and offline mode functionality.

## 🔧 Setting Up OpenAI API Key

### Step 1: Get an OpenAI API Key
1. Visit [OpenAI API Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Navigate to "API Keys" section
4. Click "Create new secret key"
5. Copy the generated key (starts with `sk-`)

### Step 2: Configure the API Key
Replace the API key in your environment files:

**File: `.env.development`**
```bash
VITE_OPENAI_API_KEY=your_actual_openai_api_key_here
```

**File: `.env`**
```bash
VITE_OPENAI_API_KEY=your_actual_openai_api_key_here
```

### Step 3: Verify API Key Status
- Check your [OpenAI usage dashboard](https://platform.openai.com/usage)
- Ensure you have available credits
- Verify your rate limits

## 🚨 Common Issues & Solutions

### Rate Limit Exceeded
**Cause:** You've reached your API usage limit
**Solutions:**
- Wait 1-5 minutes before trying again
- Check your OpenAI billing and usage
- Consider upgrading to a paid plan
- Use the offline mode features

### API Key Invalid
**Cause:** The API key is incorrect or expired
**Solutions:**
- Generate a new API key
- Check for typos in the key
- Ensure the key has proper permissions

### Connection Errors
**Cause:** Network or server issues
**Solutions:**
- Check your internet connection
- Try again in a few minutes
- Verify OpenAI service status

## 🎯 Offline Mode Features

When the API is unavailable, the chatbot automatically switches to offline mode providing:

- **Feature guidance** for all DrugForge tools
- **SMILES notation help** and examples
- **Quick start tips** for molecular predictions
- **Troubleshooting assistance**
- **Direct links** to prediction tools

## 💡 Tips for Usage

1. **Free Tier Limits:** OpenAI free tier has strict rate limits
2. **Paid Plans:** Consider upgrading for production use
3. **Alternative:** Use the comprehensive prediction tools available in DrugForge
4. **Backup:** All core functionality works without the chatbot

## 🔗 Useful Links

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [OpenAI Pricing](https://openai.com/pricing)
- [Rate Limits Guide](https://platform.openai.com/docs/guides/rate-limits)
- [OpenAI Status Page](https://status.openai.com/)

## 📋 Current Features Working

✅ **All Prediction Tools Available:**
- ACE2 Binding Prediction
- COX-2 Inhibition Analysis  
- CYP3A4 Interaction Prediction
- HEPG2 Cytotoxicity Assessment
- Blood-Brain Barrier Permeability
- Drug Half-Life Estimation
- Toxicity Screening
- Binding Score Calculation
- Virtual Screening

✅ **Enhanced Error Handling**
✅ **Offline Mode with Helpful Responses**
✅ **Dark/Light Theme Support**
✅ **Improved User Experience**
