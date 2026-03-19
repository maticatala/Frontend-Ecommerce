declare const window: any;

export const environment = {
  baseUrl:
    window.__env?.baseUrl || 'http://beyondlimitsbackend.matiascatala.com',
};
