// src/store.ts
import { writable } from 'svelte/store';

// Valeur par défaut de pageSize
export const pageSize = writable(8);
export const pageSizeAutre = writable(4);
