import CryptoJS from "crypto-js";

export const createSecurePayload = (body: unknown, secret: string) => {
  const timestamp = Date.now().toString();
  console.log(secret, "secret");
  console.log(body, "body");
  const encryptedPayload = CryptoJS.AES.encrypt(
    JSON.stringify(body),
    secret,
  ).toString();

  const signature = CryptoJS.HmacSHA256(
    encryptedPayload + timestamp,
    secret,
  ).toString(CryptoJS.enc.Hex);

  console.log("FE sign input:", encryptedPayload + timestamp);
  console.log("FE signature:", signature);

  return { encryptedPayload, signature, timestamp };
};
