import crypto from "crypto";
import fs from "fs";
import { buffer } from "stream/consumers";

const algorithm: string = "aes-256-ctr";
let key: any = "v4l3n01r5";
key = crypto
  .createHash("sha256")
  .update(String(key))
  .digest("base64")
  .substring(0, 32);

export const encrypt = (buffer: any): any => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);

  return result;
};

export const decrypt = (encrypted: any): any => {
  const iv = encrypted.slice(0, 16);

  const buffer = encrypted.slice(16);

  const dechiper = crypto.createDecipheriv(algorithm, key, iv);

  const result = Buffer.concat([dechiper.update(buffer), dechiper.final()]);

  return result;
};
