/**
 * PROPABRIDGE — Stable API Client
 * Clean fetch wrapper for React Query integration.
 */

import { PUBLIC_API_URL } from './env-public';

const BASE_URL = PUBLIC_API_URL;

/**
 * Generic GET request wrapper.
 * No manual AbortControllers or timeouts — let React Query handle lifecycle.
 */
export async function apiGet<T>(path: string): Promise<T> {
  const url = `${BASE_URL}${path}`;
  
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // Next.js caching behavior
    cache: 'no-store'
  });

  if (!res.ok) {
    let errorMsg = `API Error: ${res.status}`;
    try {
      const errorJson = await res.json();
      if (errorJson.error) errorMsg = errorJson.error;
    } catch {
      // Fallback if not JSON
    }
    throw new Error(errorMsg);
  }

  return res.json();
}

/**
 * Generic POST request wrapper.
 */
export async function apiPost<T>(path: string, body: any): Promise<T> {
  const url = `${BASE_URL}${path}`;
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`API POST Error: ${res.status}`);
  }

  return res.json();
}
