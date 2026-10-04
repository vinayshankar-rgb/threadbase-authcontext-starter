// auth/AuthContext.jsx
// ────────────────────────────────────────────────────────────
// YOUR TASK: build the app's auth-state home. Implement all five pieces:
//   1. const AuthContext = createContext(null)   — keep it PRIVATE to this file
//   2. const initialState = { user: null, accessToken: null }
//   3. authReducer(state, action)  — handle:
//        LOGIN            → set BOTH user and accessToken from action.payload
//        LOGOUT           → clear BOTH back to null
//        TOKEN_REFRESHED  → update accessToken ONLY, keep user
//        default          → return state unchanged
//   4. export function AuthProvider({ children }) — useReducer(authReducer, initialState),
//        provide value={{ ...state, dispatch }} to <AuthContext.Provider>
//   5. export function useAuth() — wrap useContext(AuthContext); throw a clear error
//        if it is null (used outside the provider)
//
// Export AuthProvider and useAuth. Do NOT export AuthContext itself.
// The full walkthrough is in the lesson.
// ────────────────────────────────────────────────────────────
//import { createContext, useContext, useReducer } from "react";

// TODO: implement the five pieces above, then wrap <App /> with <AuthProvider>
//       in main.jsx and wire the login mutation in pages/LoginPage.jsx.

// auth/AuthContext.jsx

import { createContext, useContext, useReducer } from "react";

// 1. Create the context.
// Keep AuthContext private to this file.
const AuthContext = createContext(null);

// 2. Initial authentication state.
const initialState = {
  user: null,
  accessToken: null,
};

// 3. Reducer to manage authentication state.
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };

    case "LOGOUT":
      return {
        user: null,
        accessToken: null,
      };

    case "TOKEN_REFRESHED":
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };

    default:
      return state;
  }
}

// 4. AuthProvider makes authentication state available
//    to all components inside it.
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

// 5. Custom hook for accessing authentication state.
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
