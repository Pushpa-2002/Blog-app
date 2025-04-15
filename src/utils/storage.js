export const getItem = (key) => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem(key));
    }
    return null;
  };
  
  export const setItem = (key, value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };
  
  export const removeItem = (key) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  };