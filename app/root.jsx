import {
  AppShell,
  Group,
  Header,
  MantineProvider,
  Notification,
  Select,
  Title,
} from "@mantine/core";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
  useParams,
} from "@remix-run/react";
import currencies from "~/currencies.json";
import useIsFetching from "~/isFetching";

import styles from "~/styles/global.css";

export function links() {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap",
    },
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export const meta = () => ({
  charset: "utf-8",
  title: "Arbitrage Calculator",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const navigate = useNavigate();
  const { cur } = useParams();
  const loading = useIsFetching();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <MantineProvider
          withNormalizeCSS
          withGlobalStyles
          theme={{
            colorScheme: "dark",
            fontFamily: "Quicksand, sans-serif",
            fontFamilyMonospace: "Quicksand, sans-serif",
            headings: {
              fontFamily: "Space Mono, Greycliff CF, sans-serif",
            },
          }}
        >
          <AppShell
            sx={(theme) => ({
              backgroundColor: "#092031",
            })}
            padding="md"
            fixed
            header={
              <Header
                height={70}
                p="sm"
                sx={(theme) => ({
                  backgroundColor: "#fe6c5c",
                })}
              >
                <Group position="apart">
                  <Title level={2} sx={() => ({ color: "#ffffff" })}>
                    Currency Arbitrage Calculator
                  </Title>
                  <Select
                    data={currencies.map((v) => ({ value: v, label: v }))}
                    value={cur}
                    searchable
                    onChange={(value) => navigate("/" + value)}
                  />
                </Group>
              </Header>
            }
          >
            {!loading ? (
              <Outlet />
            ) : (
              <Notification loading title="Loading" disallowClose>
                We're crunching the numbers
              </Notification>
            )}
          </AppShell>
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
