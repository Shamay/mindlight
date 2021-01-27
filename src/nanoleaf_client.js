import axios from "axios";
import { Config } from "./config";
import Panel from "./models/panel";
import Effect from "./models/effect";

export default class NanoleafClient {
  constructor(host, token, port) {
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
      if (Config.nanoleaf_electrode_analog) {
        this.panelIds = Config.nanoleaf_electrode_analog.split(",");
        this.extraPanelIds = Config.nanoleaf_extra_ids.split(",");
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
