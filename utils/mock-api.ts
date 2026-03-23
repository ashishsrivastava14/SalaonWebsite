export const delay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));

export const withDelay = async <T>(data: T, ms = 800): Promise<T> => {
  await delay(ms);
  return data;
};
