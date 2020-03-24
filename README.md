# Ethereum Dashboard

A build-your-own-dashboard tool for viewing live stats and data
about the Ethereum network

## Contributing

If you'd like to add a component, follow the steps below and submit a pull request:

### Fetch the Data

1. In `src/store/main/state.js`, add fields for the appropriate data
2. In `src/store/main/actions.js`, fetch the data
   1. If the data comes from an API and the data will not change frequently, or if it comes from a rate-limited API, please fetch the data in the `pollSlow` method. This method polls for updates every 5 minutes.
   2. If the data comes from the blockchain or changes frequently, fetch the data in the `poll` method.
   3. Reading directly from the blockchain is preferred over API calls. If the data is read directly from a contract, please use the multicall contract to get the data (this is setup in the `multi.aggregate` call.)

*Note: A middle-ground between every 5 minutes and every block can be added if needed*

### Create the Component

All dashboard components must live in `src/components` and be named using the format
`Dsh<source><description>.vue`. See the names of existing components as an example.

If there will be multiple similar components, such as Compound APY rates for various tokens,
please create a template component in `src/components/templates`. This template component
should have various props to configure the exact data to be shown.

Use the component data to specify the data category, data source, component title,
and component description. Data categories and sources are specified in `src/utils/metadata.js`.
Feel free to add new categories or sources as needed.

### Import the Component

In `App.vue` import the component and register it within the `components` object. This object
also configures the order the components are shown so please register the component in a
sensible order.

In `Home.vue`, again import and register the component.

### Submit a PR

After following the above steps and making sure the component works properly, submit a pull request!

Thanks for your contribution!

## Setup For Development

```bash
npm run dev
```
