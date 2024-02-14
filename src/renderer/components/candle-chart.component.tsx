import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { StockPrice } from '../infra/dbms.model';

const CandleChart =  ({
  data
}:{
  data: ApexAxisChartSeries
}) => {

const options: ApexOptions={
    chart: {
        type: 'candlestick',
        height: 350
    },
    title: {
        text: 'CandleStick Chart',
        align: 'left'
    },
    xaxis: {
        type: 'datetime'
    },
    yaxis: {
        tooltip: {
        enabled: true
        }
    }
}

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={data} type="candlestick" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default CandleChart;