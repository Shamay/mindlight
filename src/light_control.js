import NanoleafClient from "./nanoleaf_client";
import { Config } from "./config";
import { CHANNEL_NAMES } from "./eeg";
import { colorFromFrequency } from "./color_service";

const nanoleaf = new NanoleafClient(
  Config.nanoleaf_ip,
  Config.nanoleaf_auth_token,
  Config.nanoleaf_port
);

const channelToPanelMap = async () =>
  await nanoleaf.getElectrodeToPanelMap(CHANNEL_NAMES);

export const updateColor = async (channelPSDs) => {
  let channelPanelMap = nanoleaf.electrodeToPanelMap;
  if (Object.keys(channelPanelMap).length === 0) {
    channelPanelMap = await channelToPanelMap();
  }
  const panelsWithColor = [];

  CHANNEL_NAMES.forEach((channel) => {
    panelsWithColor.push([
      channelPanelMap[channel],
      ...colorFromFrequency(channelPSDs[channel][0]),
    ]);
  });

  const panelColorList = panelsWithColor.concat(extraPanelSettings());
  nanoleaf.setStaticPanels(panelColorList);
};

const extraPanelSettings = () => {
  return nanoleaf.extraPanelIds.map((panelId) => [panelId, 200, 200, 200]);
};
