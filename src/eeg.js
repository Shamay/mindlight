import { Notion } from "@neurosity/notion";
import { simulatedFocus } from "./simulators/focus_data";
import { map } from "rxjs/operators";
import { Config } from "./config";

const mind = new Notion(Config.device_id);

export const CHANNEL_NAMES = [
  "CP5",
  "F5",
  "C3",
  "CP3",
  "CP6",
  "F6",
  "C4",
  "CP4",
];

export const login = async () => {
  return await mind
    .login({
      email: Config.device_username,
      password: Config.device_password,
    })
    .catch((error) => {
      console.log("Error logging in: ", error);
    });
};

export const logout = async () => {
  await mind.logout().catch((error) => {
    console.log("Error logging out: ", error);
  });
};

const statusSubscription = () => {
  return mind.status().subscribe((status) => {
    console.log("STATUS UPDATE: ", status);
  });
};

export const connect = async () => {
  await login();

  // print out the status of the connection
  const status = statusSubscription();
  console.log(
    "Login successful, status info to be printed on changes to status"
  );

  return status;
};

export const disconnect = async (status) => {
  await logout();
  console.log("Logged out");

  status.unsubscribe();
};

export const focusProbability = () => {
  const focusObservable = Config.environment.isTest()
    ? simulatedFocus
    : mind.focus();

  // extract only the probability from the focus data points
  return focusObservable.pipe(map((focus) => focus.probability));
};

export const brainwaves = () => {
  return mind.brainwaves("psd");
};
