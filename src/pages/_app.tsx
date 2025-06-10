import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import "~/styles/globals.css"; // adjust to your actual Tailwind/global CSS path
import { api } from "~/utils/api"; // from T3 stack (TRPC)

const MyApp: AppType = ({
  Component,
  //@ts-ignore
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
