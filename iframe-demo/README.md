# iFrame Demo Pages

This directory contains standalone HTML pages for demonstrating the Next.js + Refine + Chakra UI application.

## 📁 Files

### 1. `index.html` - iFrame Demo Page ⭐
A complete HTML page that embeds the Next.js application in an iframe with:
- ✅ Beautiful gradient header
- ✅ Interactive controls (load, reload, open in new tab)
- ✅ URL input to change iframe source
- ✅ Loading spinner
- ✅ Feature cards
- ✅ Tech stack badges
- ✅ Navigation to other pages
- ✅ Responsive design

### 2. `standalone.html` - Independent Information Page
A standalone HTML page with:
- ✅ Project overview
- ✅ Feature highlights
- ✅ Technical details
- ✅ How to run instructions
- ✅ Links to documentation
- ✅ Beautiful gradient hero section
- ✅ Feature grid
- ✅ Navigation menu

### 3. `about.html` - About Page
Information about the project with:
- ✅ Project overview
- ✅ Technology stack with versions
- ✅ Development timeline
- ✅ Unique features explanation
- ✅ Learning outcomes
- ✅ Navigation menu

### 4. `documentation.html` - Documentation Page
Complete documentation with:
- ✅ Quick start guide
- ✅ Available scripts
- ✅ API endpoints reference
- ✅ Features documentation
- ✅ Code examples
- ✅ Project structure
- ✅ External resources links
- ✅ Navigation menu

## 🎯 Navigation Structure

All pages have a navigation menu at the top:

```
🏠 Home (iFrame) → 📄 Info Page → ℹ️ About → 📚 Documentation
```

**Purpose:** Navigate between pages to test that the app works correctly and see different views of the project.

## 🧪 Testing Modal Persistence

### How to test the minimized modal feature:

1. **Open `index.html`** in your browser
2. **In the iframe**, click Edit on any post
3. **Click Minimize (-)** in the modal header
4. **Navigate away:**
   - Click "About" or "Documentation" in the nav menu
   - The entire page changes
5. **Navigate back:**
   - Click "🏠 Home (iFrame)" in the nav menu
   - The iframe reloads
   - ⚠️ Note: The modal will reset because the entire iframe reloaded

**Important:** The modal persistence works **inside** the Next.js app (when navigating from /posts to /posts/show/:id), not across iframe page reloads.

## 🚀 How to Use

### Option 1: Open Directly in Browser

1. **Make sure Next.js app is running:**
   ```bash
   cd nextjs-refine-chakra-latest
   npm run dev
   ```
   The app should be running on `http://localhost:3010`

2. **Open the HTML files:**
   - Double-click `index.html` in File Explorer
   - Or right-click → Open with → Your Browser
   - Or drag and drop into browser

3. **Access:**
   - **iFrame Demo:** `file:///path/to/iframe-demo/index.html`
   - **Standalone Page:** `file:///path/to/iframe-demo/standalone.html`

### Option 2: Using a Local Server

If you prefer to serve via HTTP:

```bash
# Using Python
cd iframe-demo
python -m http.server 8080

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8080
```

Then visit:
- `http://localhost:8080/index.html`
- `http://localhost:8080/standalone.html`

## 📊 What Each Page Shows

### index.html (iFrame Demo)
```
┌─────────────────────────────────────────┐
│  🚀 Next.js + Refine + Chakra UI Demo  │
│  [Badges: Next.js, Refine, etc.]       │
├─────────────────────────────────────────┤
│  URL: [http://localhost:3010] [Load]   │
├─────────────────────────────────────────┤
│  ┌───────────────────────────────────┐ │
│  │                                   │ │
│  │   Next.js App Running Here        │ │
│  │   (in iframe)                     │ │
│  │                                   │ │
│  └───────────────────────────────────┘ │
├─────────────────────────────────────────┤
│  [Feature cards showing capabilities]   │
└─────────────────────────────────────────┘
```

### standalone.html (Info Page)
```
┌─────────────────────────────────────────┐
│  🎨 Independent Demo Page               │
│  [Beautiful gradient header]            │
├─────────────────────────────────────────┤
│  What's Inside?                         │
│  [Tech stack badges]                    │
├─────────────────────────────────────────┤
│  Key Features                           │
│  [6 feature cards in grid]              │
├─────────────────────────────────────────┤
│  How to Run                             │
│  [Code snippet]                         │
└─────────────────────────────────────────┘
```

## 🎯 Features

### index.html Features:
- **Interactive iFrame controls**
  - Change URL input
  - Load/Reload buttons
  - Open in new tab
- **Loading indicator**
- **Responsive design**
- **Feature showcase**
- **Tech stack display**

### standalone.html Features:
- **Gradient hero section**
- **Feature grid (6 cards)**
- **How to run guide**
- **Technical explanation**
- **Links to resources**
- **Beautiful design**

## 🎨 Styling

Both pages use:
- ✅ No external dependencies (pure CSS)
- ✅ Gradient backgrounds
- ✅ Card-based layouts
- ✅ Responsive grid
- ✅ Hover effects
- ✅ Modern design
- ✅ Mobile-friendly

## 🔧 Customization

### Change iframe URL

Edit `index.html`:
```html
<input 
    type="text" 
    id="iframeUrl" 
    value="http://localhost:YOUR_PORT"
/>
```

### Change colors

Both files use CSS variables you can modify:
```css
/* Primary color */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Change to your colors */
background: linear-gradient(135deg, #4299E1 0%, #3182CE 100%);
```

### Adjust iframe height

In `index.html`:
```css
.iframe-container {
    height: 800px; /* Change this */
}
```

## 📚 Use Cases

### index.html is useful for:
- Demos and presentations
- Embedding in documentation
- Testing iframe compatibility
- Showing clients
- Portfolio showcases

### standalone.html is useful for:
- Project landing page
- Documentation hub
- Quick reference
- Sharing project info
- GitHub Pages

## 🐛 Troubleshooting

### iFrame shows blank page

**Check:**
1. Is Next.js app running on port 3010?
   ```bash
   netstat -ano | findstr :3010
   ```

2. Start the app:
   ```bash
   cd nextjs-refine-chakra-latest
   npm run dev
   ```

### CORS errors in console

This is normal when loading from `file://` protocol. Use a local server instead:
```bash
npx serve
```

### Can't see the minimized modal in iframe

The minimized modal works in the Next.js app itself. When viewing through iframe, test by:
1. Click edit on a post
2. Click minimize (-)
3. Navigate to show page
4. Modal should stay visible

## 📖 Additional Resources

- **Main Project:** `../nextjs-refine-chakra-latest/`
- **Documentation:** `../nextjs-refine-chakra-latest/README.md`
- **Quick Start:** `../nextjs-refine-chakra-latest/QUICK_START.md`
- **Modal Implementation:** `../nextjs-refine-chakra-latest/MODAL_MINIMIZE_FEATURE.md`

## 🎉 Summary

Two beautiful, standalone HTML pages that:
- ✅ Showcase your Next.js application
- ✅ Work independently (no build process)
- ✅ Modern, professional design
- ✅ Fully responsive
- ✅ No external dependencies

Just open in a browser and enjoy! 🚀

