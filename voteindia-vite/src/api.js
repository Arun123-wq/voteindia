/**
 * api.js — Centralized API helper for VoteIndia frontend.
 * Automatically attaches the JWT Bearer token to every request.
 */

// BASE URL detects environment automatically. 
// On Render (unified deployment), it defaults to '/api'. 
// For local development, it can be overridden by VITE_API_URL in .env if needed.
const BASE = (import.meta.env.VITE_API_URL || '') + '/api';

/** Retrieve the stored JWT token */
export const getToken = () => localStorage.getItem('vi_token');

/** Store token + user after login/register */
export const saveSession = (token, user) => {
  localStorage.setItem('vi_token', token);
  localStorage.setItem('vi_user', JSON.stringify(user));
};

/** Clear token + user on logout */
export const clearSession = () => {
  localStorage.removeItem('vi_token');
  localStorage.removeItem('vi_user');
};

/** Restore user from localStorage (for page refresh persistence) */
export const getSavedUser = () => {
  try {
    const raw = localStorage.getItem('vi_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

/**
 * Core fetch wrapper — injects Authorization header when a token exists.
 * @param {string} path    - API path e.g. '/auth/login'
 * @param {object} options - fetch options (method, body, etc.)
 */
export const apiFetch = async (path, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  return res;
};

/** POST /auth/login */
export const loginUser = (aadhaar, password) =>
  apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ aadhaar, password }),
  });

/** POST /auth/register */
export const registerUser = (formData) =>
  apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(formData),
  });

/** GET /auth/me — validate stored token & refresh user data */
export const fetchMe = () => apiFetch('/auth/me');

/** POST /vote — cast a vote (protected) */
export const castVote = (candidateId) =>
  apiFetch('/vote', {
    method: 'POST',
    body: JSON.stringify({ candidateId }),
  });

/** GET /vote/status — check if user has voted (protected) */
export const fetchVoteStatus = () => apiFetch('/vote/status');
