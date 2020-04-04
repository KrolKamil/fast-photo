export const parseJsonAsync = (jsonString: string) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(JSON.parse(jsonString));
      });
    });
};

export const base64ToBuffer = (data: any) => Buffer.from(data, 'base64');