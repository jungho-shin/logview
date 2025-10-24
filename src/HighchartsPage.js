import React from 'react';
import { useNavigate } from 'react-router-dom';
import StackedGroupedColumnChart from './StackedGroupedColumnChart';

function HighchartsPage() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <div className="dashboard-header">
          <button 
            onClick={() => navigate('/')} 
            className="back-button"
          >
            ← 홈으로 돌아가기
          </button>
          <h1>📊 Highcharts 차트</h1>
        </div>
        
        <div className="chart-section">
          <h2>📊 Highcharts Stacked and Grouped Column Chart</h2>
          <StackedGroupedColumnChart />
        </div>
      </header>
    </div>
  );
}

export default HighchartsPage;
