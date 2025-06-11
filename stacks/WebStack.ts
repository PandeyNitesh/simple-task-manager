import { StackContext, NextjsSite } from "sst/constructs";

export function WebStack({ stack }: StackContext) {
  const site = new NextjsSite(stack, "T3App", {
    path: ".", // adjust to your app path
    environment: {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
      DATABASE_URL: process.env.DATABASE_URL!,
      SUPABASE_URL: process.env.SUPABASE_URL!,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
    },
    // 👇 This ensures React is not bundled twice
    //@ts-ignore
    external: ["react", "react-dom"],
  });

  stack.addOutputs({
    URL: site.url,
  });
}
