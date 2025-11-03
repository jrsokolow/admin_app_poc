# Enhanced Table Features

## 🎯 New Features Added

Your posts table now has advanced features:
- ✅ **Resizable Columns** - Drag column edges to resize
- ✅ **Draggable Columns** - Drag and drop to reorder columns
- ✅ **Persistent State** - Column widths and order are maintained

## 🛠️ Technologies Used

| Package | Version | Purpose |
|---------|---------|---------|
| @tanstack/react-table | 8.20.5 | Advanced table management |
| @dnd-kit/core | 6.3.1 | Drag and drop core |
| @dnd-kit/sortable | 9.0.0 | Sortable items for column reordering |

## 🎨 How to Use

### Resize Columns

1. **Hover over column edge** - Cursor changes to `col-resize` (↔)
2. **Click and drag** - Column width adjusts in real-time
3. **Release** - New width is applied

**Visual indicator:**
- Edge turns **blue** when hovering
- Edge stays **blue** while resizing

### Reorder Columns

1. **Grab the grip icon** (☰) on the left side of column header
2. **Drag left or right** - Column moves with your cursor
3. **Drop** - Column is reordered

**Visual feedback:**
- Cursor changes to `grab` when hovering grip
- Column becomes semi-transparent (50%) while dragging

## 📊 Column Configuration

### Default Column Order
```
1. ID
2. User ID
3. Title
4. Body
5. Actions
```

### Column Sizes

| Column | Default | Min | Max | Resizable |
|--------|---------|-----|-----|-----------|
| ID | 80px | 50px | 150px | ✅ Yes |
| User ID | 100px | 70px | 150px | ✅ Yes |
| Title | 300px | 150px | 600px | ✅ Yes |
| Body | 400px | 200px | 800px | ✅ Yes |
| Actions | 150px | 120px | 200px | ❌ No |

**Note:** Actions column is locked and cannot be resized.

## 🎭 User Experience

### Resize Interaction

```
Hover on column edge
    ↓
Edge highlights in blue
    ↓
Cursor changes to ↔
    ↓
Click and drag
    ↓
Column width changes in real-time
    ↓
Release mouse
    ↓
New width is saved
```

### Reorder Interaction

```
Hover on grip icon (☰)
    ↓
Cursor changes to grab hand
    ↓
Click and drag
    ↓
Column becomes semi-transparent
    ↓
Drag to new position
    ↓
Release
    ↓
Columns reorder instantly
```

## 🔧 Implementation Details

### Table Component
**File:** `src/app/posts/components/EnhancedTable.tsx`

Uses:
- `@tanstack/react-table` for table state management
- `@dnd-kit` for drag and drop functionality
- Chakra UI for styling

### Key Features

#### Column Resizing
```typescript
columnResizeMode: 'onChange'  // Real-time resize
```

#### Column Ordering
```typescript
const [columnOrder, setColumnOrder] = useState([...]);
```

#### Drag Handle
Each column header has a grip icon (☰) for dragging.

#### Resize Handle
Each resizable column has an invisible handle on the right edge.

## 💡 Tips

### Resize Tips
- **Double-click edge** - Not implemented, but you can drag to resize
- **Minimum widths** - Columns won't go below their minimum size
- **Maximum widths** - Columns won't exceed their maximum size

### Reorder Tips
- **Grab the grip** - Use the ☰ icon, not the column text
- **Smooth dragging** - Drag smoothly for best visual feedback
- **Drop anywhere** - Drop between any two columns

## 🎨 Visual Indicators

### Resizing
- **Hover:** Blue highlight on edge
- **Active:** Blue bar on edge
- **Cursor:** ↔ col-resize

### Dragging
- **Hover:** Cursor changes to grab hand
- **Dragging:** Column opacity 50%
- **Active:** Cursor changes to grabbing hand

## 📝 Code Example

### Using the Enhanced Table

```typescript
<EnhancedTable
    posts={posts}
    onView={(id) => show('posts', id)}
    onEdit={(id) => openEditModal(id)}
    onDelete={(id) => handleDelete(id)}  // Optional
/>
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| posts | Post[] | ✅ Yes | Array of posts to display |
| onView | (id: number) => void | ✅ Yes | View button callback |
| onEdit | (id: number) => void | ✅ Yes | Edit button callback |
| onDelete | (id: number) => void | ❌ No | Delete button callback |

## 🚀 Try It Out

1. **Start the app:**
   ```bash
   cd nextjs-refine-chakra-latest
   npm run dev
   ```

2. **Navigate to posts:**
   ```
   http://localhost:3010/posts
   ```

3. **Try resizing:**
   - Hover over the edge between "Title" and "Body" columns
   - Drag to resize

4. **Try reordering:**
   - Grab the ☰ icon on "User ID" column
   - Drag it to the right of "Title"
   - Drop to reorder

## 🎓 Learning Points

### Why TanStack Table?
- Industry standard for advanced tables
- Built-in column resizing
- Flexible and powerful
- TypeScript support
- Works with any UI library

### Why @dnd-kit?
- Modern drag and drop library
- Better performance than react-beautiful-dnd
- Accessibility built-in
- Flexible and extensible
- Active maintenance

### Column Resizing Implementation
- Uses pointer events to track drag
- Calculates new width based on mouse position
- Updates table state in real-time
- Respects min/max constraints

### Column Reordering Implementation
- Uses @dnd-kit sortable
- Tracks column order in state
- Reorders array on drop
- Smooth animations

## 🔍 Browser Compatibility

| Browser | Resize | Reorder |
|---------|--------|---------|
| Chrome | ✅ Yes | ✅ Yes |
| Firefox | ✅ Yes | ✅ Yes |
| Safari | ✅ Yes | ✅ Yes |
| Edge | ✅ Yes | ✅ Yes |

## 📚 Further Reading

- [TanStack Table Docs](https://tanstack.com/table/latest)
- [dnd-kit Documentation](https://docs.dndkit.com/)
- [Column Resizing Guide](https://tanstack.com/table/latest/docs/guide/column-sizing)

---

**Enjoy your enhanced table with resizable and draggable columns!** 🎉

