declare global {
  interface Window {
    __STATE: any;
    __STORE?: any;
    store?: any;
  }
  namespace NodeJS {
    interface Global {
      TYPE?: string;
    }
  }
}

export {};
