import {Notion} from '@neurosity/notion';
import "regenerator-runtime/runtime.js";
import dotenv from "dotenv";
import {login} from "./authenticate";
import {statusSubscription} from "./status";
import {map} from "rxjs/operators";
import {averageProbability, compareAverages} from "./averageComparator";
import {simulatedFocus} from "./simulators/focus_data"

dotenv.config();
const mind = new Notion(process.env.DEVICE_ID);

const app = async () => {
  // wait for login before doing anything
  const user = await login(mind);

  if (user) {
    console.log('Login successful');
  }

  // print out the status of the connection
  statusSubscription(mind);

  // extract only the probability from the focus data points
  const focus = process.env.ENVIRONMENT === 'test' ? simulatedFocus : mind.focus();

  // initialize running average at {avg: 0, count: 0}
  const updateAverage = averageProbability({avg: 0, count: 0})
  const focusChange = compareAverages(null);

  // delay averaging for a period of 1000 milliseconds
  setTimeout(() => {
    focus
      .pipe(map(focus => focus.probability))
      .subscribe(focus => {
        // update average and calculate how much focus changed
        const percentChange = focusChange(updateAverage(focus));

        // act on nanoleaf based on percent change
        // ...
      });
  }, 1000)
};

app();
