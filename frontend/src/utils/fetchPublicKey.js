const fetchPublicKey = async () => {
  try {
    const response = await fetch("http://localhost:3000/public-key");
    if (!response.ok) {
      throw new Error("Failed to fetch public key");
    }
    return await response.text();
  } catch (error) {
    console.error("Error fetching public key:", error);
    return null;
  }
};

export default fetchPublicKey;
