export const parseJsonAsync = (jsonString: string) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(JSON.parse(jsonString));
      });
    });
};