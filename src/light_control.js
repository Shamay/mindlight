import NanoleafClient from './nanoleaf_client';
import { CHANNEL_NAMES } from './compute_tools';

const nanoleaf = new NanoleafClient(process.env.LIGHT_IP, process.env.AUTH_TOKEN);

const channelToPanelMap = async () => await nanoleaf.getElectrodeToPanelMap(CHANNEL_NAMES);

export const updateColor = async channelPSDs => {
	let channelPanelMap = nanoleaf.electrodeToPanelMap;
	if(Object.keys(channelPanelMap).length === 0) {
		channelPanelMap = await channelToPanelMap();
	}
	const panelColor = [];

	CHANNEL_NAMES.forEach(channel => {
		panelColor.push([channelPanelMap[channel], ...getColor(channelPSDs[channel][0], channel)]);
	});

	nanoleaf.setStaticPanels(panelColor);
};


const getColor = (val, channel) => {
	if(val > 100) {
		return [255, 0, 0];
	} else if(val > 50) {
		return [255, 165, 0];
	} else if(val > 25) {
		return [150, 75, 0];
	} else if(val > 12) {
		return [255, 255, 0];
	} else if(val > 6) {
		return [0, 255, 0];
	} else if(val > 3) {
		return [128, 0, 128];
	} else if(val > 2) {
		return [255, 0, 0];
	} else if(val > 1) {
		return [220, 220, 220];
	} else {
		return [255, 255, 255];
	}
}
