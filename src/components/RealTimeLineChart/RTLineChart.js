import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
            unit: 'minute', // Display data by minute
            tooltipFormat: 'MMM D, YYYY HH:mm', // Tooltip format
        },
        position: 'bottom',
      },
      y: {
        beginAtZero: true,
      },
    },
  };
const RTLineChart = function(props){
    var table = "RTLineChart";
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Live PNL',
          },
        },
      };


    return (<div>
        <Line data={props.data} />
    </div>)

}
export default RTLineChart;
