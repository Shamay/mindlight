import dotenv from "dotenv";

dotenv.config();

export const Config = {
  device_id: process.env.DEVICE_ID,
  device_username: process.env.DEVICE_USERNAME,
  device_password: process.env.DEVICE_PASSWORD,
  nanoleaf_ip: process.env.NANOLEAF_IP,
  nanoleaf_auth_token: process.env.NANOLEAF_AUTH_TOKEN,
  nanoleaf_port: process.env.NANOLEAF_PORT || 16201,
  nanoleaf_electrode_analog: process.env.NANOLEAF_ELECTRODE_ANALOG,
  nanoleaf_extra_ids: process.env.NANOLEAF_EXTRA_IDS || [],
  environment: {
    isTest: () => process.env.ENVIRONMENT === "test",
  },
};
