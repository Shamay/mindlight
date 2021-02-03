import "regenerator-runtime/runtime.js";
import * as eeg from "./eeg";
import { avgPSDByChannel, filterNoise } from "./eeg_data_service";
import { updateColor } from "./light_control";

const app = async () => {
  const status = await eeg.connect();
  let state;

  avgPSDByChannel(
    eeg.brainwaves,
    (curr, next) => {
      state = state || curr;

      state = filterNoise(state, next);

      updateColor(state);
    },
    () => eeg.disconnect(status)
  );
};

app();
