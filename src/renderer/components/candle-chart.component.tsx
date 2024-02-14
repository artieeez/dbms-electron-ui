import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { StockPrice } from '../infra/dbms.model';

const CandleChart =  ({
  data
}:{
  data: {
    series: ApexAxisChartSeries;
    categories: string[];
  }
}) => {

const options: ApexOptions={
    chart: {
        type: 'candlestick',
        height: 350
    },
    title: {
        text: 'Candlestick Chart of Stock Prices',
        align: 'left'
    },
    xaxis: {
      categories: data.categories,
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
        <ReactApexChart options={options} series={data.series} type="candlestick" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default CandleChart;