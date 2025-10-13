# RSC Quick Summary

## What is RSC?

**React Server Components (RSC)** = React components that run **ONLY on the server**, never in the browser.

## Your Question Answered

**Q: "Why do I see `?_rsc=tyl3d` instead of HTML?"**

**A:** Because Next.js sends a **serialized component tree** (RSC payload) instead of HTML when you navigate client-side. This is **faster and smaller** than HTML!

## Key Points

### 1. Both Methods Use the Server!

| Method | Server Component Runs? | Data Fetched Where? | Response Type |
|--------|----------------------|---------------------|---------------|
| Type URL manually | ✅ Server | ✅ Server | HTML |
| Click Show button | ✅ Server | ✅ Server | RSC Payload |

**No CSR (Client-Side Rendering) is happening!**

### 2. Your App Architecture

```
Server Component (page.tsx)
├─ Runs ONLY on server
├─ Fetches data from API
├─ Code never sent to browser (0 KB)
└─ Passes data to ↓

Client Component (show-client.tsx)
├─ Runs in browser
├─ Receives data from server
├─ Handles user interactions
└─ Code sent to browser (~20 KB)
```

### 3. The RSC Payload

When you click "Show", the server sends:

```
// NOT HTML, but serialized components + data
1:HL["styles.css"]
2:I{"id":"1","name":"Leanne Graham",...}  ← Your data!
3:["$","div",null,{...}]  ← Component tree!
```

React deserializes this and updates the DOM (no page reload!)

### 4. Benefits

✅ **Smaller bundles** - Server code stays on server
✅ **Faster navigation** - RSC payload < HTML
✅ **Secure** - Database access on server only
✅ **Better UX** - No page reload, smooth transitions

## See It Yourself

### Test 1: Check Terminal Logs
```bash
# Both scenarios show:
🟢 SERVER: UserShowPage running on SERVER for user ID: 1
🟢 SERVER: Data fetched on SERVER, user name: Leanne Graham
```

### Test 2: Check Network Tab

**Manual URL:**
```
Request: /users/1
Response: HTML (40-60 KB)
```

**Click Button:**
```
Request: /users/1?_rsc=tyl3d
Response: RSC Payload (5-10 KB)
```

### Test 3: Check Browser Console
```javascript
🔵 CLIENT: UserShowClient rendering on CLIENT with data from SERVER
// Notice: Data already available! No fetch needed!
```

## Bottom Line

The `?_rsc=` parameter tells Next.js:
> "I'm already a Next.js app, send me the optimized RSC payload instead of full HTML"

Your Server Component still runs on the server in both cases!
The only difference is the response format.

## Further Reading

📚 Detailed guides in this folder:
- `WHAT_IS_RSC.md` - Complete RSC explanation
- `RSC_VISUAL_GUIDE.md` - Visual diagrams
- `RSC_YOUR_CODE_EXPLAINED.md` - Your code analyzed
- `SSR_VS_CLIENT_NAVIGATION.md` - SSR vs CSR explained
- `TEST_SSR_PROOF.md` - How to test it yourself

