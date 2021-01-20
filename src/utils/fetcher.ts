export const fetcher = async <T = Response>(
  url: string,
  token: string
): Promise<T> => {
  const res = await fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
  });

  return res.json();
};
