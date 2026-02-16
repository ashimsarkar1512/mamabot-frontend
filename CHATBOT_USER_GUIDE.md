# Chatbot Usage Guide

## Quick Start

### 1. **Starting a Chat**

- Navigate to `/chatBot`
- Type your message in the input box
- Click "Generate" or press Enter

### 2. **Attaching Files**

#### Image Upload:

- Click the **Camera** icon 📷
- Select an image from your device
- The image name will appear as a pink badge
- Click × to remove if needed

#### Document Upload:

- Click the **Paperclip** icon 📎
- Select a file from your device
- The file name will appear as a blue badge
- Click × to remove if needed

### 3. **Sending Messages**

- Type your message
- Optionally attach files/images
- Click "Generate" button
- Wait for AI response (you'll see "Typing..." indicator)

## Features

### ✅ Real-time AI Responses

- Messages are sent to the backend API
- AI responses appear in real-time
- Loading indicator shows when AI is thinking

### ✅ File Attachments

- Support for images (PNG, JPG, etc.)
- Support for documents (PDF, DOCX, etc.)
- Multiple files can be attached per message

### ✅ Smart Notifications

- **Success**: File attached successfully
- **Warning**: Approaching daily query limit
- **Error**: API errors or authentication issues
- **Emergency**: Urgent medical attention needed

### ✅ Quota Management

- Daily query limit tracking
- Warnings when approaching limit
- Clear indication when limit is reached

### ✅ Emergency Detection

- Backend detects emergency situations
- Urgent alert displayed to user
- Recommendation to call 112

## User Interface

### Landing Page (No Active Chat)

```
┌─────────────────────────────────────┐
│         🤖 Mamabot AI Logo          │
│                                     │
│   Command Your Health Journey      │
│   With Mamabot AI Studios          │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Write here your command...  │   │
│  │                             │   │
│  │ 📎 📷        🎤 [Generate]  │   │
│  └─────────────────────────────┘   │
│                                     │
│         History                     │
│  ┌──────────┐  ┌──────────┐       │
│  │ Chat 1   │  │ Chat 2   │       │
│  └──────────┘  └──────────┘       │
└─────────────────────────────────────┘
```

### Active Chat

```
┌─────────────────────────────────────┐
│  🤖 Hi! How can I help you?        │
│                                     │
│              Hello! I need help 👤 │
│                                     │
│  🤖 Typing...                      │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Type your message...        │   │
│  │ 📎 📷              ↑        │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

## API Integration Details

### Request Format

```javascript
{
  chat_id: "unique-chat-id",
  message: "Your message here",
  language: "en",
  country: "bd",
  mode: "pregnancy",
  pregnancy_week: "3",
  // ... other parameters
  image: File (optional),
  file: File (optional)
}
```

### Response Format

```javascript
{
  success: true,
  message: "AI chat generated & saved successfully",
  data: {
    ai_response: "AI's response text",
    is_emergency: false,
    quota_exceeded: false,
    used_today: 5,
    daily_query_limit: 10,
    // ... other metadata
  }
}
```

## Troubleshooting

### "Authentication required. Please log in."

- **Cause**: No auth token in cookies
- **Solution**: Log in to the application first

### "No active chat. Please create a chat first."

- **Cause**: Trying to send message without active chat
- **Solution**: This shouldn't happen in normal flow, but refresh the page

### "Failed to send message"

- **Cause**: Network error or API issue
- **Solution**: Check internet connection and try again

### Loading indicator stuck

- **Cause**: API timeout or network issue
- **Solution**: Refresh the page and try again

## Best Practices

1. **Be Specific**: Provide detailed information in your messages
2. **Use Files**: Attach relevant images or documents when needed
3. **Monitor Quota**: Keep an eye on daily query limits
4. **Emergency**: For urgent medical issues, call 112 immediately

## Keyboard Shortcuts

- **Enter**: Send message (in landing page)
- **Shift + Enter**: New line (in active chat)
- **Escape**: Close file preview (future feature)

## Current Limitations

- Chat history is stored locally (not synced with backend yet)
- Projects feature uses mock data (API not ready)
- Default user settings are hardcoded (will be dynamic later)

## Future Features

- 🔄 Chat history sync with backend
- 📁 Project/folder organization
- ⚙️ Customizable AI settings
- 🔊 Voice input support
- 📊 Chat analytics
- 🌙 Dark mode
