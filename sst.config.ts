import { SSTConfig } from "sst";
import { WebStack } from "./stacks/WebStack";

export default {
  config(_input) {
    return {
      name: "task-board",
      region: "ap-south-1",
    };
  },
  stacks(app) {
    app.stack(WebStack);
  },
} satisfies SSTConfig;
