import axios from 'axios';

export default class NanoleafClient {

	constructor(host, token) {
		const port = process.env.LIGHT_PORT || 16021;
		this.req = axios.create({
			baseURL: `http://${host}:${port}/api/v1/${token}`
		});
		this.electrodeToPanelMap = {};
	}

	async info() {
		const response = await this.req.get('/');
		return response.data;
	}

	async getElectrodeToPanelMap(channels) {
		if(Object.keys(this.electrodeToPanelMap).length === 0) {
			const response = await this.info();
			const panelIds = response.panelLayout.layout.positionData.map(panel => panel.panelId);
			channels.forEach((channel, index) => {
				this.electrodeToPanelMap[channel] = panelIds[index];
			});
		}

		return this.electrodeToPanelMap;
	}

	async setStaticPanels(panelList) {
		const serializedPanels = panelList.map(panel => (new Panel(...panel)).serialize());

		const effect = new Effect(serializedPanels);
		const write = Object.assign({
				command: 'display'
			}, effect.serializeToDisplay(panelList.length)
		);

		await this.req.put('/effects', { write });
	}
}

class Effect {
	constructor(serializedPanelData) {
		this.loop = false;
		this.animType = 'static';
		this.version = '1.0';
		this.animData = serializedPanelData;
	}

	serializeToDisplay(numPanels) {
		return {
			loop: this.loop,
			animType: this.animType,
			version: this.version,
			animData: `${numPanels} ${this.animData.join(' ')}`,
		};
	}
}

class Panel {
	constructor(id, r, g, b, transitionTime) {
		this.id = id;
		this.red = r;
		this.green = g;
		this.blue = b;
		this.transitionTime = transitionTime || 50;
	}

	serialize() {
		return `${this.id} 1 ${this.red} ${this.green} ${this.blue} 0 ${this.transitionTime}`;
	}
}
