/// <reference types="vite/client" />

declare module '*.json' {
  const value: import('./types').Product[];
  export default value;
}
