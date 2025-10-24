import React from 'react';
import { useNavigate } from 'react-router-dom';
import RechartsStackedGroupedColumnChart from './RechartsStackedGroupedColumnChart';

function RechartsPage() {
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
          <h1>📈 Recharts 차트</h1>
        </div>
        
        <div className="chart-section">
          <h2>📈 Recharts Stacked and Grouped Column Chart</h2>
          <RechartsStackedGroupedColumnChart />
        </div>
      </header>
    </div>
  );
}

export default RechartsPage;