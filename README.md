# mindlight

Neurosity + Nanoleaf coming soon

## Running the app

### Setup

Make sure you have `node` installed (v15.4.0 works)

Run `npm install` to install dependencies

Create a `.env` file with the following params (the "device" variables can be found in console.neurosity.co, the Nanoleaf variables IP and AUTH can be found by following the steps [here](https://documenter.getpostman.com/view/1559645/RW1gEcCH#2bee1873-aedb-4a8f-9353-035e2d9ad584).)

```
DEVICE_USERNAME=
DEVICE_PASSWORD=
DEVICE_ID=
NANOLEAF_IP=
NANOLEAF_AUTH_TOKEN=
```

Additionally, can add the following to your `.env`. The `NANOLEAF_ELECTRODE_ANALOG` variable is a comma separated list of panel Ids which allow you to indicate which panels you would like to map to which electrodes (electrode order: "CP5", "F5", "C3", "CP3", "CP6", "F6", "C4", "CP4"). For example providing: `10,30,50,70,80,60,40,20` will give you an effect where the `CP5` electrode impacts panel `10`, `F5` -> panel `30`, and so on. The `NANOLEAF_EXTRA_IDS` are a similar comma separated list to indicate the panels that will be turned off. The port is set to default if not set.

```
NANOLEAF_ELECTRODE_ANALOG=
NANOLEAF_EXTRA_IDS=
NANOLEAF_PORT=
```

### Build and Run

Build and run the application

```
npm run build
npm run start
```
