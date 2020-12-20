export const compareAverages = previousAverageData => currentAverageData => {
  let percentChange = 0
  const interval = 10;

  // every <interval> number of data points, calculate percent change
  if (currentAverageData.count % interval === 0) {

    // do not calculate average until first average is set as baseline
    if (previousAverageData) {
      percentChange = (currentAverageData.avg / previousAverageData.avg - 1) * 100;
      console.log('percentChange is: ', percentChange)
    }

    previousAverageData = currentAverageData;
  }

  return percentChange;
}

export const averageProbability = runningAverage => probability => {
  console.log('running average: ', runningAverage)
  console.log('new probability: ', probability)
  const newCount = runningAverage.count + 1;
  const newAverage = (runningAverage.avg * runningAverage.count + probability) / newCount;

  runningAverage = {
    avg: newAverage,
    count: newCount
  };

  return runningAverage;
}

