// =======================================================
// NAME: CURTIS LEBENSORGER
// DATE: 11/21/2023
// =======================================================

import Objective from '../components/Objective';
import PageTitle from '../components/PageTitle';

// Heroicons
const logoIcon =
  'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z';
const databaseIcon =
  'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125';
const frownFaceIcon =
  'M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z';

export default function Objectives() {
  return (
    <section className="container mx-auto px-3 py-9">
      <PageTitle>objectives</PageTitle>

      <div className="grid gap-12">
        <Objective>
          <Objective.Icon icon={logoIcon} order="md:order-2" />
          <Objective.Info order="md:order-1" header="StockCheck">
            This application will allow users to monitor real-time stock trades,
            and view them on the StockCheck dashboard. There is no need to
            complete individual stock searches from the internet browser
            anymore. Get started today with your investment journey and search
            for over 26,000+ assets in the US stock exchange with StockCheck!
          </Objective.Info>
        </Objective>
        <Objective>
          <Objective.Icon icon={databaseIcon} order="md:order-3" />
          <Objective.Info order="md:order-4" header="Finnhub API">
            Stock trade information is retrieved from the API provided by
            Finnhub. This is achieved by establishing a websocket connection
            from this site to the Finnhub API server. There is no database
            attached to this front-end application which means the user&#39;s
            data is not saved for future purposes.
          </Objective.Info>
        </Objective>
        <Objective>
          <Objective.Icon icon={frownFaceIcon} order="md:order-6" />
          <Objective.Info order="md:order-5" header="No Stock Data Received">
            Stocks in the dashboard with a sad face in the color gray are
            waiting for the most recent trade from the Finnhub API. No action is
            required from the user and the stock is not broken. StockCheck will
            react when the Finnhub API sends the necessary information. Keep in
            mind the market is open Monday through Friday from 8:30a.m. to
            3:00p.m. CST.
          </Objective.Info>
        </Objective>
      </div>
    </section>
  );
}
