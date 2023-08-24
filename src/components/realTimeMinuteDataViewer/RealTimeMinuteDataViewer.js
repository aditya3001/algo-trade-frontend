import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import './RealTimeMinuteDataViewer.css';


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
    
  } from 'chart.js';
import { ACCESS_TOKEN, API_BASE_URL } from '../../constants/Constants';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
  );
const RealTimeMinuteDataViewer = () => {
  const [data, setData] = useState([]);
  const startHour = 0; // Replace with your start hour (0-23)
  const startMinute = 0; // Replace with your start minute (0-59)
  const endHour = 24; // Replace with your end hour (0-23)
  const endMinute = 0; // Replace with your end minute (0-59)
  const currentData = useRef(-1);

  const pnlChartOptions = {
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
  const chartOptions = {
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
      },
    },
    animation:false,

  };

  const pnlChartData = {
    labels: data.map((item) => {return `${item.date}T${item.time}`}),
    datasets: [
      {
        label: 'Call_Pnl',
        data: data.map((item) => item.callPnl),
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
      },
      {
        label: 'Put_Pnl',
        data: data.map((item) => item.putPnl),
        borderColor: 'rgb(75, 192, 100)',
        fill: false,
      },
      {
        label: 'Fwd_Pnl',
        data: data.map((item) => item.fwdPnl),
        borderColor: 'rgb(75, 100, 192)',
        fill: false,
      },
      {
        label: 'Total_Pnl',
        data: data.map((item) => item.totalPnl),
        borderColor: 'rgb(255, 255, 255)',
        fill: false,
      },
    ],
  };
  const chartData = {
    labels: data.map((item) => {return `${item.date}T${item.time}`}),
    datasets: [
      {
        label: 'Fwd Price',
        data: data.map((item) => item.priceFwd),
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
      },
      {
        label: 'Up Hedge Point',
        data: data.map((item) => item.upHedgePoint),
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Down Hedge Point',
        data: data.map((item) => item.downHedgePoint),
        borderColor: 'green',
        fill: false,
      },
      {
        label: 'Up Hedge Point',
        data: data.map((item) => {return parseInt(item.hedgeFlag) === 1 ?item.upHedgePoint:null}),
        backgroundColor: 'blue', 
        pointRadius: 5, 
      },
      {
        label: 'Down Hedge Point',
        data: data.map((item) => {return parseInt(item.hedgeFlag) === 1 ?item.downHedgePoint:null}),
        backgroundColor: 'green', 
        pointRadius: 5, 
      },
      {
        label: 'Fwd Hedge Point',
        data: data.map((item) => {return parseInt(item.hedgeFlag) === 1 ?item.lastHedgePoint:null}),
        backgroundColor: 'rgb(75, 192, 192)', 
        pointRadius: 5, 
      }
    ],
  };

  const modifyDateTime = function(dateTime){
    const tempDateTime = new Date(dateTime);
    const timeString = tempDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return timeString;
  }

  const fetchOnce = async () => {
    try {
      const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' ,"Access-Control-Allow-Origin": "*","Authorization":`Bearer ${localStorage.getItem(ACCESS_TOKEN)}`},
      };
      const response = await fetch(`${API_BASE_URL}/data/minuteData/gammaShort`,requestOptions);

      const jsonData = await response.json();
      if(response.ok){
        jsonData.reverse()
        setData(jsonData)  
        currentData.current = jsonData[0].index   
      }else{
        console.log('ERROR')
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      // Handle error
    }
  };
  const fetchData = async () => {
    try {
      const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' ,"Access-Control-Allow-Origin": "*","Authorization":`Bearer ${localStorage.getItem(ACCESS_TOKEN)}`},
      };
      const response = await fetch(`${API_BASE_URL}/data/minuteData/gammaShort/getLatestRow`,requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

    const jsonData = await response.json();
     if(response.ok){

        // console.log(currentData.current,jsonData.index);
        // console.log(currentData.current != jsonData.index);

        if(currentData.current !== jsonData.index){
          setData(prevData => [jsonData, ...prevData])
          currentData.current = jsonData.index;
        }
        
      }else{
        console.log('ERROR')
      }
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchOnce();
    const pollingInterval = setInterval(() => {
        const now = new Date();
        const currentHour = now.getHours(); 
        const currentMinute = now.getMinutes(); 
  
        if ((currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute)) &&
        (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute))) {
          fetchData(); // Polling API request
        }
      }, 5000); // Polling interval: 5 seconds
  
      return () => {
        clearInterval(pollingInterval); // Cleanup

      };
  }, []); 

  return (
    <div className='realtime-data-viewer-container'>
    
    <div className='chart-container'>
      <div className='chart'><Line data={pnlChartData} options={pnlChartOptions} /></div>
      <div className='chart'><Line data={chartData} options={chartOptions} /></div>
      
      {/* <RTLineChart data={data} /> */}
    </div>
      {/* Display the fetched data */}
      <div className='table-view'>

        <table id='table' className="m-1" style={{ borderCollapse: 'collapse', borderSpacing: '0', width: '100%' }}>
        <thead id='header'>
            <tr>
                <th className='tableHeaderStyle'>Time</th>
                <th className='tableHeaderStyle'>Put Pnl</th>
                <th className='tableHeaderStyle'>Call Pnl</th>
                <th className='tableHeaderStyle'>Hedge Pnl</th>
                <th className='tableHeaderStyle'>Total Pnl</th>
                <th className='tableHeaderStyle'>Delta</th>
            </tr>
        </thead>
        <tbody>
        {data.map((item) => (
            <tr key={item.id}>
                {/* <th>{item.date}</th> */}
                <th>{modifyDateTime(`${item.date}T${item.time}`)}</th>
                <th>{item.putPnl}</th>
                <th>{item.callPnl}</th>
                <th>{item.fwdPnl}</th>
                <th>{item.totalPnl}</th>
                <th>{item.delta}</th>
            </tr>
        // <MinutewiseRowData key={item.id} data={item}></MinutewiseRowData>
      ))}
      </tbody>
        </table>

      </div>
    </div>
  );
};

export default RealTimeMinuteDataViewer;
