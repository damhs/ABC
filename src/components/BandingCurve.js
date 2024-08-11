import React from 'react';
import '../styles/BandingCurve.css'; // CSS 파일을 import
import { Line } from 'react-chartjs-2';

// 차트 컴포넌트
const BandingCurve = ({contract, rate, sellToken, buyToken}) => {
  const generateCurveData = () => {
    const dataPoints = [];
    
    for (let x = 1; x <= 100; x++) {
      const y = rate / x;
      dataPoints.push({ x, y });
    }
    return dataPoints;
  };
  const dataPoints = generateCurveData();

  const data = {
    labels: dataPoints.map(point => `${buyToken}: ${point.x}, ${sellToken}: ${point.y}`),
    datasets: [
      {
        label: `${sellToken} vs ${buyToken} (A * B = 100)`,
        data: dataPoints.map(point => point.y),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      }
    ]
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: `Amount of ${buyToken}`,
        }
      },
      y: {
        title: {
          display: true,
          text: `Equivalent of ${sellToken}`,
        }
      }
    }
  };

  return (
    <div className="bandingcurve">
      <h3>Bonding Curve</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default BandingCurve;
