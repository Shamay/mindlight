import axios from "axios";
import Panel from "./model/panel";
import Effect from "./model/effect";

export default class NanoleafClient {
  constructor(host, token) {
    const port = process.env.LIGHT_PORT || 16021;
    this.req = axios.create({
      baseURL: `http://${host}:${port}/api/v1/${token}`,
    });
    this.electrodeToPanelMap = {};
    this.extraPanelIds = [];
    this.panelIds = [];
  }

  async info() {
    const response = await this.req.get("/");
    return response.data;
  }

  async getElectrodeToPanelMap(channels) {
    if (Object.keys(this.electrodeToPanelMap).length === 0) {
      if (process.env.LIGHT_ID_ELECTRODE_ANALOG) {
        this.panelIds = process.env.LIGHT_ID_ELECTRODE_ANALOG.split(",");
        this.extraPanelIds = process.env.EXTRA_LIGHT_IDS
          ? process.env.EXTRA_LIGHT_IDS.split(",")
          : [];
      } else {
        const response = await this.info();

        this.panelIds = response.panelLayout.layout.positionData.map(
          (panel) => panel.panelId
        );
      }

      channels.forEach((channel, index) => {
        this.electrodeToPanelMap[channel] = this.panelIds[index];
      });
    }

    return this.electrodeToPanelMap;
  }

  async setStaticPanels(panelList) {
    const serializedPanels = panelList.map((panel) =>
      new Panel(...panel).serialize()
    );

    const effect = new Effect(serializedPanels);
    const write = Object.assign(
      {
        command: "display",
      },
      effect.serializeToDisplay(panelList.length)
    );

    await this.req.put("/effects", { write });
  }

  get extraPanelIds() {
    return this._extraPanelIds;
  }

  set extraPanelIds(ids) {
    this._extraPanelIds = ids;
  }
}
