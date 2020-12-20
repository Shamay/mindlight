import {Notion} from '@neurosity/notion';
import "regenerator-runtime/runtime.js";
import dotenv from "dotenv";
import {login} from "./authenticate";
import {statusSubscription} from "./status";
import {map} from "rxjs/operators";

dotenv.config();
const mind = new Notion(process.env.DEVICE_ID);

const averageProbability = runningAverage => probability => {
  console.log('running average: ', runningAverage)
  console.log('new probability: ', probability)
  const newCount = runningAverage.count + 1;
  const newAverage = (runningAverage.avg * runningAverage.count + probability) / newCount;

  runningAverage = {
    avg: newAverage,
    count: newCount
  };
}

const app = async () => {
  // wait for login before doing anything
  const user = await login(mind);

  if (user) {
    console.log('Login successful');
  }

  // print out the status of the connection
  statusSubscription(mind);

  // extract only the probability from the focus data points
  const focus = mind.focus().pipe(map(focus => focus.probability));

  // initialize running average at {avg: 0, count: 0}
  const updateAverage = averageProbability({avg: 0, count: 0})

  // delay averaging for a period of 1000 milliseconds
  setTimeout(() => {
    focus.subscribe(focus => {
      updateAverage(focus)
    });
  }, 1000)
};

app();


// calculate a running average between time A and time B
// continue calc average between B..C C..D
// compare between currentAverage and newRunningAverage
// based on difference, if positive turn nanoleaf more orange
//                      if negative turn nanoleaf more blue
