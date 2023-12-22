// =======================================================
// NAME: CURTIS LEBENSORGER
// DATE: 11/21/2023
// =======================================================

import { useContext } from 'react';
import Card from '../components/Card';
import { StockWatchContext } from '../context/StockWatchContext';

export default function Dashboard() {
  const { stocksWatch } = useContext(StockWatchContext);
  const timestamp = Date.now();

  const cards = stocksWatch.map((stockWatch) => (
    <Card stockWatch={stockWatch} timestamp={timestamp} key={stockWatch}>
      <Card.Header>
        <Card.StockArrow />
        <Card.Timestamp />
        <Card.Close />
      </Card.Header>
      <Card.Underline />
      <Card.Body></Card.Body>
    </Card>
  ));

  return (
    <section className="mx-3 mt-3 min-[500px]:grid min-[500px]:grid-cols-2 min-[500px]:gap-x-3 md:grid-cols-3 xl:grid-cols-4">
      {cards}
    </section>
  );
}
