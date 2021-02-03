import { std } from "mathjs";
import { CHANNEL_NAMES } from "./eeg";

export const avgPSDByChannel = (
  brainwaves,
  psdCallback,
  completionCallback
) => {
  let currChannelPSDAverage = {};
  let nextChannelPSDAverage = {};

  brainwaves().subscribe(
    (brainwave) => {
      brainwave.psd.forEach((channelPSD, channelIndex) => {
        nextChannelPSDAverage[CHANNEL_NAMES[channelIndex]] = [
          avgPSD(channelPSD),
          stdPSD(channelPSD),
        ];
      });

      psdCallback(currChannelPSDAverage, nextChannelPSDAverage);
      currChannelPSDAverage = nextChannelPSDAverage;
    },
    (e) => console.log(e),
    () => completionCallback()
  );
};

const avgPSD = (psdValues) => {
  return psdValues.reduce((acc, value) => acc + value, 0) / psdValues.length;
};

const stdPSD = (psdValues) => {
  return std(psdValues);
};

export const filterNoise = (currChannelMap, nextChannelMap) => {
  let filteredChannelMap = {};

  if (Object.keys(currChannelMap).length === 0) {
    return nextChannelMap;
  }

  CHANNEL_NAMES.forEach((channel) => {
    filteredChannelMap[channel] = updateChannel(
      currChannelMap[channel],
      nextChannelMap[channel]
    );
  });

  return filteredChannelMap;
};

const updateChannel = (curr, next) => {
  // Discard next channel data if mean is outside of one std of prev channel data
  const [currAvg, currStd] = curr;
  const [nextAvg, nextStd] = next;

  const shouldDiscard =
    nextAvg > currAvg + currStd || nextAvg < currAvg - currStd;
  return shouldDiscard ? curr : next;
};
