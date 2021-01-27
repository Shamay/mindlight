import NanoleafClient from "./nanoleaf_client";
import { Config } from "./config";
import { CHANNEL_NAMES } from "./compute_tools";

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
      ...getColor(channelPSDs[channel][0]),
    ]);
  });

  const panelColorList = panelsWithColor.concat(extraPanelSettings());
  nanoleaf.setStaticPanels(panelColorList);
};

const extraPanelSettings = () => {
  return nanoleaf.extraPanelIds.map((panelId) => [panelId, 0, 0, 0]);
};

const getColor = val => {
  if (val > 100) {
    return [255, 0, 0];
  } else if (val > 50) {
    return [255, 165, 0];
  } else if (val > 25) {
    return [150, 75, 0];
  } else if (val > 12) {
    return [255, 255, 0];
  } else if (val > 6) {
    return [0, 255, 0];
  } else if (val > 3) {
    return [128, 0, 128];
  } else if (val > 2) {
    return [255, 0, 0];
  } else if (val > 1) {
    return [120, 120, 120];
  } else {
    return [155, 255, 155];
  }
};
