declare const window: any;

export const environment = {
  production: true,
  baseUrl: window.__env?.baseUrl || 'http://localhost:3000',
};
