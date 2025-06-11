import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config() {
    return {
      name: "task-manager", // your app name
      region: "ap-south-1", // your AWS region
    };
  },
  stacks(app) {
    app.stack(function WebStack({ stack }) {
      const site = new NextjsSite(stack, "Web", {
        path: ".", // path to your Next.js app (root in your case)
        environment: {
          NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
          NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
          SUPABASE_URL: process.env.SUPABASE_URL!,
          SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
          DATABASE_URL: process.env.DATABASE_URL!,
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
