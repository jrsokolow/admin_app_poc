# Modal Minimize/Maximize Feature

## ✨ Feature Overview

The Edit Post modal now supports **minimize** and **maximize** functionality!

## 🎯 How It Works

### Minimize
Click the **minus icon (-)** in the modal header to minimize:
- Modal collapses to show only the header
- Form content is hidden
- Modal moves to bottom-right corner of screen
- Small, compact size (400px wide)

### Maximize
Click the **maximize icon (⛶)** to restore:
- Modal expands to show full form
- All fields become visible
- Returns to center of screen
- Original large size (xl)

## 🎨 Visual States

### Maximized (Default)
```
┌─────────────────────────────────────────┐
│  Edit Post #1              [-] [X]      │
├─────────────────────────────────────────┤
│                                          │
│  User ID: [    ]                        │
│  Title:   [                    ]        │
│  Body:    [                    ]        │
│           [                    ]        │
│           [                    ]        │
│                                          │
├─────────────────────────────────────────┤
│              [Cancel] [Update Post]     │
└─────────────────────────────────────────┘
```

### Minimized
```
                    ┌───────────────────────┐
                    │ Edit Post #1  [⛶] [X] │
                    └───────────────────────┘
                    (Bottom-right corner)
```

## 🔧 Implementation Details

### State Management
```typescript
const [isMinimized, setIsMinimized] = useState(false);
```

### Toggle Button
```typescript
<IconButton
    aria-label={isMinimized ? 'Maximize' : 'Minimize'}
    icon={isMinimized ? <IconMaximize /> : <IconMinus />}
    onClick={() => setIsMinimized(!isMinimized)}
/>
```

### Conditional Styling
```typescript
<ModalContent
    position={isMinimized ? 'fixed' : 'relative'}
    bottom={isMinimized ? '20px' : 'auto'}
    right={isMinimized ? '20px' : 'auto'}
    margin={isMinimized ? '0' : 'auto'}
    maxW={isMinimized ? '400px' : undefined}
>
```

### Animated Collapse
```typescript
<Collapse in={!isMinimized} animateOpacity>
    <ModalBody>...</ModalBody>
    <ModalFooter>...</ModalFooter>
</Collapse>
```

## 🎯 User Experience

1. **Open modal** → Click edit on any post
2. **Modal appears** → Full size, center screen
3. **Click minimize (-)** → Smoothly collapses to bottom-right
4. **Click maximize (⛶)** → Expands back to full size
5. **Form state preserved** → Your edits remain intact
6. **Auto-reset** → Returns to maximized when closed and reopened

## 💡 Benefits

### Why This Is Useful:

1. **Multitasking** 
   - Minimize to reference the posts table
   - Keep the modal open while viewing other posts
   - Don't lose your form progress

2. **Better Workflow**
   - Compare data while editing
   - Reference other posts
   - Less clicking back and forth

3. **Professional Feel**
   - Modern UX pattern
   - Smooth animations
   - Intuitive controls

## 🎨 Styling Details

### Minimized State:
- **Position:** Fixed at bottom-right (20px from edges)
- **Size:** 400px max width
- **Content:** Only header visible
- **Animation:** Smooth collapse transition

### Maximized State:
- **Position:** Centered on screen
- **Size:** XL (extra large)
- **Content:** Full form visible
- **Animation:** Smooth expand transition

## 🔍 Try It Out

### Steps to Test:

1. **Start the app:**
   ```bash
   npm run dev
   ```

2. **Go to posts:**
   ```
   http://localhost:3010/posts
   ```

3. **Click edit icon** on any post

4. **Click the minimize button (-)** in the modal header
   - Watch the modal smoothly collapse
   - Notice it moves to bottom-right corner
   - Only the header is visible

5. **Click the maximize button (⛶)**
   - Watch the modal expand
   - Form fields reappear
   - Returns to center

6. **Edit while minimized:**
   - Minimize the modal
   - Browse the posts table
   - Maximize to continue editing
   - Your changes are preserved!

## 🛠️ Customization

### Change Minimized Position

Edit the `position` styles in the modal:

```typescript
<ModalContent
    position={isMinimized ? 'fixed' : 'relative'}
    bottom={isMinimized ? '20px' : 'auto'}  // Change to '50px' for higher
    right={isMinimized ? '20px' : 'auto'}   // Change to 'left' for left side
>
```

### Change Minimized Size

```typescript
maxW={isMinimized ? '300px' : undefined}  // Make smaller
```

### Different Icons

Use any Tabler icons:
```typescript
import { IconArrowsMinimize, IconArrowsMaximize } from '@tabler/icons-react';
```

### Add Transition Duration

```typescript
<Collapse in={!isMinimized} animateOpacity transition={{ duration: 0.3 }}>
```

## 📊 Technical Features

| Feature | Implementation |
|---------|----------------|
| **State Management** | React useState |
| **Animation** | Chakra UI Collapse component |
| **Positioning** | CSS position: fixed |
| **Icons** | Tabler Icons (IconMinus, IconMaximize) |
| **Form Preservation** | Form state maintained during minimize |
| **Auto-reset** | Resets to maximized on close |

## 🎓 Code Breakdown

### What Makes It Work:

1. **`isMinimized` state** - Tracks current state
2. **Conditional styling** - Changes position/size based on state
3. **Collapse component** - Animates show/hide of body
4. **Toggle function** - `setIsMinimized(!isMinimized)`
5. **Reset effect** - Restores to maximized on modal close

### Key Components Used:

- ✅ **Modal** - Base modal from Chakra UI
- ✅ **Collapse** - Animated content show/hide
- ✅ **IconButton** - Minimize/maximize controls
- ✅ **HStack** - Layout for header buttons
- ✅ **useState** - State management
- ✅ **useEffect** - Reset on close

## ✅ What You Get

A fully functional minimize/maximize modal with:
- ✅ Smooth animations
- ✅ Intuitive controls
- ✅ Form state preservation
- ✅ Professional appearance
- ✅ Customizable positioning
- ✅ Auto-reset behavior

## 🚀 Next Steps

### Want to Add More?

**Draggable Modal:**
Install `react-draggable` and make it movable

**Multiple Minimized Modals:**
Support multiple minimized modals at once

**Keyboard Shortcuts:**
Add Ctrl+M to minimize/maximize

**Remember State:**
Save minimized state to localStorage

---

**Enjoy your new minimize/maximize feature!** 🎉

Try it now at http://localhost:3010/posts

