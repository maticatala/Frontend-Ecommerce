declare const window: any;

export const environment = {
  baseUrl: window.__env?.baseUrl || 'http://localhost:3000',
};
