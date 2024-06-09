export const getData = async (url?: string) => {
  if (url === undefined) {
    console.error("URL is undefined");
    return;
  }

  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error(`HTTP error! Status: ${res.status}`);
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};

export const getAPI = async (
  url: string | undefined,
  username: string,
  password: string
) => {
  const credentials = btoa(`${username}:${password}`);
  if (url === undefined) {
    console.error("URL is undefined");
    return;
  }
  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data. Status: ${res.status}`);
  }

  return res;
};

// Helper function to encode to Base64 (optional, as btoa is built-in)
const toBase64 = (str: string) => Buffer.from(str).toString("base64");
