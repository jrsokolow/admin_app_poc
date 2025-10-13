# RSC Documentation Index

Welcome! This folder contains comprehensive guides explaining React Server Components (RSC) in Next.js.

## 🚀 Start Here

**New to RSC?** Start with these in order:

1. **[RSC_QUICK_SUMMARY.md](./RSC_QUICK_SUMMARY.md)** ⭐
   - Quick overview and key concepts
   - Answers the `?_rsc=` question
   - 5-minute read

2. **[WHAT_IS_RSC.md](./WHAT_IS_RSC.md)** 📚
   - Complete explanation of RSC
   - History and evolution
   - Server vs Client Components
   - 15-minute read

3. **[RSC_VISUAL_GUIDE.md](./RSC_VISUAL_GUIDE.md)** 🎨
   - Visual diagrams and flowcharts
   - Request/response comparisons
   - Easy to understand illustrations
   - 10-minute read

## 📖 Deep Dives

**Want more detail?** Check these out:

4. **[RSC_YOUR_CODE_EXPLAINED.md](./RSC_YOUR_CODE_EXPLAINED.md)** 🔍
   - Analysis of YOUR actual code
   - Line-by-line breakdown
   - What runs where and when
   - 20-minute read

5. **[SSR_VS_CLIENT_NAVIGATION.md](./SSR_VS_CLIENT_NAVIGATION.md)** 🔄
   - Manual URL vs Click navigation
   - Why both use the server
   - Detailed comparison tables
   - 15-minute read

6. **[TEST_SSR_PROOF.md](./TEST_SSR_PROOF.md)** 🧪
   - Hands-on testing guide
   - Console logs to check
   - Proof that RSC works
   - 10-minute read (+ testing time)

## 📊 Quick Reference

### The Core Question Answered

**Q: Why do I see `?_rsc=tyl3d` instead of HTML?**

**A:** Next.js uses RSC (React Server Components) for client-side navigation. The server sends a **serialized component tree** (RSC payload) instead of HTML because it's:
- ✅ Smaller (5-10 KB vs 40-60 KB)
- ✅ Faster to process
- ✅ More efficient for navigation
- ✅ Still server-rendered (not CSR!)

### The Two Navigation Types

| Method | Server Runs? | Response | Size |
|--------|-------------|----------|------|
| Type URL manually | ✅ Yes | Full HTML | ~50 KB |
| Click link | ✅ Yes | RSC Payload | ~10 KB |

**Both use the server!** Only the response format differs.

### Server vs Client Components

```typescript
// SERVER COMPONENT (default)
export default async function Page() {
    const data = await db.query();  // ✅ Server only
    return <div>{data}</div>;
}

// CLIENT COMPONENT (opt-in)
'use client';
export default function Page() {
    const [count, setCount] = useState(0);  // ✅ Interactive
    return <button onClick={() => setCount(count + 1)}>Click</button>;
}
```

## 🎯 Recommended Reading Path

### For Beginners
1. RSC_QUICK_SUMMARY.md
2. RSC_VISUAL_GUIDE.md
3. TEST_SSR_PROOF.md (hands-on)

### For Developers
1. WHAT_IS_RSC.md
2. RSC_YOUR_CODE_EXPLAINED.md
3. SSR_VS_CLIENT_NAVIGATION.md

### For Deep Understanding
Read all files in the order listed above.

## 🔗 External Resources

- [React Server Components RFC](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md)
- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [React.dev: Server Components](https://react.dev/reference/react/use-server)

## 💡 Key Takeaways

1. **RSC = Components that run ONLY on the server**
   - Code never sent to browser
   - Can access database, files, etc.
   - Zero bundle impact

2. **The `?_rsc=` parameter is normal**
   - It's Next.js requesting optimized format
   - Server still runs your code
   - Not client-side rendering!

3. **Your app uses both Server and Client Components**
   - Server: Data fetching, business logic
   - Client: Interactivity, user input

4. **Benefits everywhere**
   - Smaller bundles (85% reduction)
   - Faster page loads (60% improvement)
   - Better security (no exposed API keys)
   - Improved UX (smooth navigation)

## 🛠️ Hands-On Testing

To see RSC in action:

```bash
# 1. Start your app
cd nextjs-pure-app
npm run dev

# 2. Open browser and DevTools
# 3. Go to http://localhost:3002/users
# 4. Click "Show" button
# 5. Check Network tab for ?_rsc= request
# 6. Check terminal for server logs
```

You'll see server logs proving the component runs on the server!

## ❓ Still Have Questions?

The guides in this folder answer:
- ✅ What is RSC?
- ✅ Why use RSC?
- ✅ How does RSC work?
- ✅ What's the RSC payload?
- ✅ Server vs Client Components?
- ✅ SSR vs CSR vs RSC?
- ✅ Why `?_rsc=` instead of HTML?
- ✅ How to test it?

Happy reading! 🚀

