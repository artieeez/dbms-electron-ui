import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { StockPrice } from '../infra/dbms.model';

const LineChart =  ({
  data,
  id
}:{
  data: {
    series: ApexAxisChartSeries;
    categories: string[];
  },
  id:string
}) => {

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: `Volume Trend of ${id} Stock`,
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: data.categories,
    }
  }

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={data.series} type="line" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default LineChart;