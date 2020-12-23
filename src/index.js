import "regenerator-runtime/runtime.js";
import {averageProbability, compareAverages} from "./averageComparator";
import * as eeg from "./eeg";

const app = async () => {
  // wait for login before doing anything
  const status = await eeg.connect()

  // initialize running average at {avg: 0, count: 0}
  const updateAverage = averageProbability({avg: 0, count: 0})
  const focusChange = compareAverages(null);

  // delay averaging calculation for a period of 1000 milliseconds
  setTimeout(() => {
      eeg.focusProbability()
        .subscribe(focus => {
            // update average and calculate how much focus changed
            const percentChange = focusChange(updateAverage(focus));
          },
          e => console.log(e),
          () => {
            eeg.disconnect(status);
          });
    },
    1000);
};

app();
