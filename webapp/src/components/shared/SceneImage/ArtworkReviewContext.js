import { createContext } from 'react';
// Only the development review fixtures opt in while new artwork awaits approval.
export const ArtworkReviewContext = createContext(false);
