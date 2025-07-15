import { CacheEntry } from "../types/cacheTypes";

const inMemoryCache = new Map<string, CacheEntry>();

/**
 * Builds a cache key by combining a base key with optional parameters
 * @param key - Base cache key
 * @param params - Optional parameters to include in the key
 * @returns Generated cache key string
 */
const buildCacheKey = (key: string, params?: Record<string, unknown>) =>
  `${key}-${JSON.stringify(params ?? {})}`;

/**
 * Retrieves cached data from memory or localStorage if not expired
 * @param key - Base cache key
 * @param ttl - Time to live in milliseconds
 * @param params - Optional parameters for cache key generation
 * @returns Cached data or null if not found or expired
 */
export const getCached = <T>(
  key: string,
  ttl: number,
  params?: Record<string, unknown>
): T | null => {
  const cacheKey = buildCacheKey(key, params);
  const now = Date.now();

  const memoryEntry = inMemoryCache.get(cacheKey);
  if (memoryEntry && now - memoryEntry.timestamp < ttl) {
    return memoryEntry.data as T;
  }

  const storageRaw = localStorage.getItem(cacheKey);
  if (storageRaw) {
    try {
      const storageEntry: CacheEntry = JSON.parse(storageRaw);
      if (now - storageEntry.timestamp < ttl) {
        inMemoryCache.set(cacheKey, storageEntry);
        return storageEntry.data as T;
      } else {
        localStorage.removeItem(cacheKey);
      }
    } catch {
      localStorage.removeItem(cacheKey);
    }
  }

  return null;
};

/**
 * Stores data in both memory and localStorage cache
 * @param key - Base cache key
 * @param params - Optional parameters for cache key generation
 * @param data - Data to cache
 */
export const setCached = <T>(
  key: string,
  params: Record<string, unknown> | undefined,
  data: T
) => {
  const cacheKey = buildCacheKey(key, params);
  const entry: CacheEntry<T> = { data, timestamp: Date.now() };

  inMemoryCache.set(cacheKey, entry);
  localStorage.setItem(cacheKey, JSON.stringify(entry));
};
