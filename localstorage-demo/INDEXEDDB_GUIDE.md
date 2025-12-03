# 🗄️ IndexedDB vs LocalStorage Guide

## 📊 Quick Comparison

| Feature | LocalStorage | IndexedDB |
|---------|-------------|-----------|
| **Storage Limit** | ~5-10 MB | ~50% of disk (GBs) |
| **Data Type** | Strings only | Any JavaScript object |
| **API Style** | Synchronous | Asynchronous |
| **Indexing** | ❌ No | ✅ Yes |
| **Transactions** | ❌ No | ✅ Yes |
| **Large Files** | ❌ No | ✅ Yes (Blobs) |
| **Complex Queries** | ❌ No | ✅ Yes |
| **Learning Curve** | Easy | Moderate |
| **Cleared When?** | ✅ Same | ✅ Same |

## 🎯 When to Use Each

### ✅ Use LocalStorage When:
- **Small data** (< 5 MB)
- **Simple key-value pairs**
- **User preferences** (theme, language)
- **Simple caching**
- **Quick implementation needed**

### ✅ Use IndexedDB When:
- **Large data** (> 5 MB)
- **Complex data structures**
- **Need indexing/queries**
- **Storing files/blobs**
- **Offline-first apps** (PWAs)
- **Need transactions** (ACID-like)

## ⚠️ Critical: Both Get Cleared!

**Important:** IndexedDB is cleared in the **SAME scenarios** as localStorage:

- 🧹 User clears browsing data
- 👻 Incognito/private mode closes
- 🔒 Browser reset/reinstall
- 🌐 Different domain/subdomain
- 💾 Storage quota exceeded
- 🔧 Programmatic clearing

**Key Point:** IndexedDB gives you MORE storage and BETTER features, but it's still client-side storage that can be cleared. **Always have server-side backup for critical data!**

## 💻 Code Examples

### LocalStorage (Simple)

```javascript
// Save
localStorage.setItem('key', JSON.stringify({name: 'John', age: 30}));

// Read
const data = JSON.parse(localStorage.getItem('key'));

// Delete
localStorage.removeItem('key');

// Clear all
localStorage.clear();
```

### IndexedDB (More Powerful)

```javascript
// Open database
const request = indexedDB.open('MyDB', 1);

// Create schema
request.onupgradeneeded = (e) => {
    const db = e.target.result;
    const store = db.createObjectStore('users', {keyPath: 'id'});
    store.createIndex('name', 'name', {unique: false});
};

// Use database
request.onsuccess = (e) => {
    const db = e.target.result;
    const tx = db.transaction('users', 'readwrite');
    const store = tx.objectStore('users');
    
    // Save
    store.add({id: 1, name: 'John', age: 30});
    
    // Read
    const getReq = store.get(1);
    getReq.onsuccess = () => {
        console.log(getReq.result);
    };
    
    // Query with index
    const index = store.index('name');
    const query = index.getAll('John');
    query.onsuccess = () => {
        console.log(query.result);
    };
};
```

### Modern IndexedDB with Promises

```javascript
// Using a wrapper library like idb
import { openDB } from 'idb';

const db = await openDB('MyDB', 1, {
    upgrade(db) {
        const store = db.createObjectStore('users', {keyPath: 'id'});
        store.createIndex('name', 'name');
    }
});

// Save
await db.add('users', {id: 1, name: 'John', age: 30});

// Read
const user = await db.get('users', 1);

// Query
const users = await db.getAllFromIndex('users', 'name', 'John');
```

## 📦 Storage Quota

### Check Available Quota

```javascript
if ('storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    console.log('Usage:', estimate.usage);      // Bytes used
    console.log('Quota:', estimate.quota);      // Total quota
    console.log('Available:', estimate.quota - estimate.usage);
}
```

### Typical Quotas

- **Chrome/Edge**: ~60% of disk space
- **Firefox**: ~50% of disk space
- **Safari**: ~1 GB (more restrictive)

## 🔍 Advanced IndexedDB Features

### 1. Indexes for Fast Queries

```javascript
// Create index
store.createIndex('email', 'email', {unique: true});

// Query by index
const index = store.index('email');
const user = await index.get('john@example.com');
```

### 2. Cursors for Large Datasets

```javascript
const tx = db.transaction('users', 'readonly');
const store = tx.objectStore('users');
const cursor = store.openCursor();

cursor.onsuccess = (e) => {
    const cursor = e.target.result;
    if (cursor) {
        console.log(cursor.value);
        cursor.continue(); // Move to next
    }
};
```

### 3. Ranges

```javascript
// Get users with age between 20 and 30
const index = store.index('age');
const range = IDBKeyRange.bound(20, 30);
const users = await index.getAll(range);
```

### 4. Transactions

```javascript
// Atomic operations
const tx = db.transaction(['users', 'orders'], 'readwrite');
const userStore = tx.objectStore('users');
const orderStore = tx.objectStore('orders');

// Both succeed or both fail
userStore.add(user);
orderStore.add(order);

tx.oncomplete = () => {
    console.log('Transaction completed');
};

tx.onerror = () => {
    console.log('Transaction failed - both rolled back');
};
```

## 🚀 Real-World Use Cases

### LocalStorage Use Cases

1. **User Preferences**
   ```javascript
   localStorage.setItem('theme', 'dark');
   localStorage.setItem('language', 'en');
   ```

2. **Simple Cache**
   ```javascript
   localStorage.setItem('api_cache', JSON.stringify(data));
   ```

3. **Form Drafts**
   ```javascript
   localStorage.setItem('draft', formData);
   ```

### IndexedDB Use Cases

1. **Offline-First PWA**
   ```javascript
   // Store large datasets for offline use
   await db.add('products', productData);
   ```

2. **File Storage**
   ```javascript
   // Store images, videos, documents
   const file = event.target.files[0];
   await db.add('files', {id: 1, file: file, name: file.name});
   ```

3. **Complex Data with Relationships**
   ```javascript
   // Store users, orders, products with relationships
   await db.add('users', user);
   await db.add('orders', order);
   ```

4. **Large Datasets with Queries**
   ```javascript
   // Query thousands of records efficiently
   const results = await db.getAllFromIndex('products', 'category', 'electronics');
   ```

## ⚡ Performance Tips

### LocalStorage
- ✅ Fast for small data
- ❌ Slow for large data (blocks main thread)
- ❌ No indexing (manual filtering)

### IndexedDB
- ✅ Fast for large data (async, non-blocking)
- ✅ Indexed queries are fast
- ✅ Can handle GBs of data
- ⚠️ More complex API

## 🛡️ Best Practices

### 1. Choose the Right Tool
- Small, simple data → LocalStorage
- Large, complex data → IndexedDB

### 2. Both Can Be Cleared
- Never rely solely on client storage
- Always have server-side backup
- Sync important data regularly

### 3. Handle Errors Gracefully
```javascript
try {
    localStorage.setItem('key', 'value');
} catch (e) {
    if (e.name === 'QuotaExceededError') {
        // Handle quota exceeded
    }
}
```

### 4. Check Availability
```javascript
function isStorageAvailable() {
    try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}
```

### 5. Use IndexedDB for Offline Apps
- Perfect for Progressive Web Apps (PWAs)
- Store data for offline access
- Sync when online

## 📚 Recommended Libraries

### For IndexedDB

1. **idb** (by Jake Archibald)
   ```bash
   npm install idb
   ```
   - Modern Promise-based API
   - TypeScript support
   - Small bundle size

2. **Dexie.js**
   ```bash
   npm install dexie
   ```
   - Full-featured ORM
   - TypeScript support
   - Great documentation

3. **localForage**
   ```bash
   npm install localforage
   ```
   - Unified API for localStorage/IndexedDB
   - Automatically chooses best storage
   - Simple API

## 🎓 Learning Resources

- [MDN: IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [MDN: LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [idb Library](https://github.com/jakearchibald/idb)
- [Dexie.js Documentation](https://dexie.org/)

## 🧪 Test in Demo

Open `indexeddb-demo.html` to:
- See side-by-side comparison
- Test both storages
- See when both get cleared
- Test large data storage
- Check storage quota

---

**Remember**: IndexedDB is more powerful than localStorage, but both are client-side storage that can be cleared. Always design your applications to handle storage loss gracefully! 🛡️



