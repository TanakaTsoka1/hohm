import { Anchor, Breadcrumbs, Group, Paper, Text } from "@mantine/core";

export default function Card({ pairs, base, rate }) {
  return (
    <Paper withBorder className="card">
      <Group position="apart" p="md">
        <Breadcrumbs separator="→">
          <Anchor>{base}</Anchor>
          {pairs.map((v) => (
            <Anchor key={v}>{v}</Anchor>
          ))}
          <Anchor>{base}</Anchor>
        </Breadcrumbs>
        <Text>{rate} %</Text>
      </Group>
    </Paper>
  );
}
