import dotenv from "dotenv";

dotenv.config();

export const Config = {
  device_id: process.env.DEVICE_ID,
  device_username: process.env.DEVICE_USERNAME,
  device_password: process.env.DEVICE_PASSWORD,
  environment: {
    isTest: () => process.env.ENVIRONMENT === "test",
  },
};
