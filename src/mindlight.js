import "regenerator-runtime/runtime.js";
import * as eeg from "./eeg";
import { avgPSDByChannel, filterNoise } from "./compute_tools";
import { updateColor } from "./light_control";

const app = async () => {
  // wait for login before doing anything
  const status = await eeg.connect();
  let state;

  avgPSDByChannel(
    (curr, next) => {
      state = state || curr;

      state = filterNoise(state, next);

      updateColor(state);
    },
    () => eeg.disconnect(status)
  );
};

app();
