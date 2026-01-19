# 🔐 Hybrid Authentication Architecture: NextAuth + Redux

This project uses a robust, production-grade authentication architecture that leverages the best strengths of both **NextAuth.js** and **Redux Toolkit**.

## 🧠 The Core Philosophy: "Source of Truth vs. Mirror"

Many developers struggle with where to put auth state. We solve this by separating concerns:

| Feature            | NextAuth.js (Server & Security)     | Redux Toolkit (Client UI)                  |
| :----------------- | :---------------------------------- | :----------------------------------------- |
| **Role**           | **Source of Truth**                 | **UI Mirror**                              |
| **Responsibility** | Security, Sessions, Tokens, Cookies | UI State, User Profile, Roles, Theme       |
| **Storage**        | HTTP-Only Cookies (Secure)          | Memory (RAM)                               |
| **Persistence**    | Persists across refreshes           | Resets on refresh (Re-syncs automatically) |
| **Access**         | Server Components, Middleware, API  | Client Components, Selectors               |

> **Golden Rule:** NextAuth secures the app. Redux displays the user.

---

## 🏗️ Architecture Overview

1.  **Login**: User logs in via NextAuth (`signIn`).
2.  **Session**: NextAuth creates a secure HTTP-only cookie.
3.  **Sync**: The `<AuthSync />` component detects the session and dispatches user info to Redux.
4.  **UI**: Components read user data from Redux (`useAppSelector`).
5.  **API**: RTK Query fetches data, dynamically attaching the Bearer token from the NextAuth session with credentials included.

---

## 🚀 Implementation Guide

### 1. NextAuth Setup (The Security Layer)

**File:** [route.ts](file:///c%3A/WEB%20PH%20BATCH%2010/Projects%2025/nextjs-template/app/api/auth/%5B...nextauth%5D/route.ts)

We configure `CredentialsProvider` to authenticate against our backend. The `jwt` and `session` callbacks ensure the `accessToken` and `user` details are passed to the client session securely.

```typescript
// Key Configuration
session: { strategy: "jwt" },
callbacks: {
  async jwt({ token, user }) { ... }, // Persist backend token
  async session({ session, token }) { ... } // Expose to client
}
```

### 2. Redux Slice (The UI Mirror)

**File:** [authSlice.ts](file:///c%3A/WEB%20PH%20BATCH%2010/Projects%2025/nextjs-template/redux/features/slice/authSlice.ts)

The Redux slice **does not store tokens**. It only holds user information needed for the UI (Name, Email, Role).

```typescript
// ✅ Correct: User info only
interface AuthState {
  user: User | null;
  // ❌ No accessToken here!
}
```

### 3. The Bridge: AuthSync Component

**File:** [AuthSync.tsx](file:///c%3A/WEB%20PH%20BATCH%2010/Projects%2025/nextjs-template/components/auth/AuthSync.tsx)

This is the most critical component. It sits inside the `ReduxProvider` and watches the NextAuth session. When the session changes, it updates Redux.

- **Authenticated**: Dispatches `setUser` with session data.
- **Unauthenticated**: Dispatches `clearUser`.

### 4. Global Providers

**File:** [AppProviders.tsx](file:///c%3A/WEB%20PH%20BATCH%2010/Projects%2025/nextjs-template/providers/AppProviders.tsx)

The nesting order is strictly required for the sync to work:

```tsx
<SessionProvider>
  {" "}
  {/* 1. NextAuth Context */}
  <ReduxProvider>
    {" "}
    {/* 2. Redux Store - Uses useMemo for proper initialization */}
    <AuthSync /> {/* 3. The Bridge (Needs both contexts) */}
    {children} {/* 4. Your App */}
  </ReduxProvider>
</SessionProvider>
```

### 5. Secure API Calls (RTK Query)

**File:** [baseApi.ts](file:///c%3A/WEB%20PH%20BATCH%2010/Projects%2025/nextjs-template/redux/features/api/baseApi.ts)

We **do not** read the token from Redux. Instead, we use `getSession()` to dynamically attach the token to every request. This ensures we always use the freshest, secure token managed by NextAuth.

```typescript
prepareHeaders: async (headers) => {
  const session = await getSession(); // Fetch secure session
  if (session?.accessToken) {
    headers.set("authorization", `Bearer ${session.accessToken}`);
  }
  return headers;
};

// Include credentials for cross-origin requests
credentials: "include";
```

### 6. Middleware Protection

**File:** [middleware.ts](file:///c%3A/WEB%20PH%20BATCH%2010/Projects%2025/nextjs-template/middleware.ts)

We use Next.js Middleware to protect routes **before** they render. This prevents the "flash of unauthenticated content."

---

## ❓ FAQ

**Q: Why not store the token in Redux?**
A: Storing tokens in Redux (JavaScript memory) is less secure and requires complex manual hydration logic. NextAuth handles cookie security and persistence automatically.

**Q: What happens when I refresh the page?**
A:

1.  Redux state is wiped (RAM is cleared).
2.  NextAuth reads the HTTP-only cookie.
3.  `useSession` loads the user.
4.  `<AuthSync />` fires and re-populates Redux.
    _Result: The user stays logged in seamlessly._

**Q: Can I access Redux in Server Components?**
A: No. Redux is Client-side only. For Server Components, use `getServerSession(authOptions)`.

---

## ✅ Checklist for New Features

- [ ] Use `useSession()` or `getServerSession()` for Auth checks.
- [ ] Use `useAppSelector(selectCurrentUser)` for UI display (Sidebar, Avatar).
- [ ] **Never** manually set cookies.
- [ ] **Never** manually write to `localStorage` for auth.
