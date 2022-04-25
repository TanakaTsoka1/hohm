import { Notification } from "@mantine/core";

export default function Index() {
  return (
    <Notification title="No currency" disallowClose>
      Please select a currency in the header
    </Notification>
  );
}
