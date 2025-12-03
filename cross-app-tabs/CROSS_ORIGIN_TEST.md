# 🌐 Cross-Origin Tab Navigation Testing

Testing cross-app tab navigation between different domains/origins.

## 🎯 What We're Testing

The original demo works perfectly for **same-origin** scenarios (both apps on same domain).
Now we'll test **cross-origin** scenarios (apps on different domains/ports).

## 🔒 Cross-Origin: What Works and What Doesn't

### What Still Works ✅
1. **Named window opening**: `window.open(url, name)` still creates/reuses tabs
2. **Window focus**: `window.focus()` still works
3. **Tab switching**: Browser will still switch to existing named tabs
4. **URL parameters**: Can still pass data via query strings

### What Breaks ❌
1. **localStorage events**: Don't fire across different origins
2. **Window property access**: Can't read `window.opener.location` across origins
3. **Direct window communication**: Blocked by Same-Origin Policy

## ✨ The Good News

**Tab switching works perfectly cross-origin!** You don't need any special code beyond `window.open(url, name)`.

```javascript
// This works cross-origin!
window.open('http://other-domain.com/app', 'myAppName', 'width=1200,height=800');
```

## 📝 Note on postMessage

If you need real-time **communication** between tabs (not just switching), you can use `window.postMessage()`.
But for basic tab switching, it's **not required**.

## 🧪 Test Setup

### Option 1: Using Different Ports (Recommended)
- App A: `http://localhost:8080`
- App B: `http://localhost:8081`

### Option 2: Using Different Domains
- App A: `http://localhost:8080`
- App B: `http://127.0.0.1:8080`

### Option 3: Using Subdomain (if available)
- App A: `http://app-a.example.com`
- App B: `http://app-b.example.com`

## 🚀 Running the Test

### Method 1: Using Python HTTP Server

**Terminal 1 (App A):**
```bash
cd cross-app-tabs/appA-cross-origin
python -m http.server 8080
```

**Terminal 2 (App B):**
```bash
cd cross-app-tabs/appB-cross-origin
python -m http.server 8081
```

### Method 2: Using Node.js http-server

**Terminal 1:**
```bash
npx http-server cross-app-tabs/appA-cross-origin -p 8080 --cors
```

**Terminal 2:**
```bash
npx http-server cross-app-tabs/appB-cross-origin -p 8081 --cors
```

### Method 3: Using PHP

**Terminal 1:**
```bash
cd cross-app-tabs/appA-cross-origin
php -S localhost:8080
```

**Terminal 2:**
```bash
cd cross-app-tabs/appB-cross-origin
php -S localhost:8081
```

## 📋 Test Checklist

- [ ] Test 1: Open App A on port 8080
- [ ] Test 2: Navigate to App B (should open on port 8081)
- [ ] Test 3: Navigate back to App A (should switch tabs)
- [ ] Test 4: Check if postMessage communication works
- [ ] Test 5: Verify localStorage events DON'T work across origins
- [ ] Test 6: Test with browser console to see security errors

## 🔍 Expected Results

### Same-Origin (Current Demo)
- ✅ Tab reuse works
- ✅ localStorage events work
- ✅ Can access window.opener
- ✅ Full communication

### Cross-Origin (This Test)
- ✅ Tab reuse works
- ❌ localStorage events don't work
- ❌ Can't access window.opener.location
- ✅ postMessage works (with proper origin verification)
- ⚠️ Some security warnings in console

## 🛡️ Security Considerations

1. **Always verify `event.origin`** in postMessage handlers
2. **Never trust data** from cross-origin sources without validation
3. **Use HTTPS** in production
4. **Set proper CORS headers** if needed
5. **Be aware of popup blockers**

## 📝 Notes

- Cross-origin tab naming still works because window names are global per browser
- The browser maintains the named window reference but restricts what you can access
- postMessage is the standard way to communicate across origins
- Some browsers may have slightly different behaviors

