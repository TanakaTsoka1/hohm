import { json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import Card from "~/components/Card";
import findPairs from "~/findPairs.server";

export async function loader({ params: { cur } }) {
  return json(findPairs(cur));
}

export default function ListCurr() {
  const data = useLoaderData();
  const { cur } = useParams();

  const Row = ({ index, style }) => (
    <div style={style}>
      <Card pairs={data[index][0]} rate={data[index][1]} base={cur} />
    </div>
  );

  return (
    <div className="full-height">
        <AutoSizer defaultHeight={700} defaultWidth={1024}>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={data.length}
              itemSize={70}
              width={width}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
    </div>
  );
}
