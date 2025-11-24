import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useSearchParams } from 'react-router-dom';
import './App.css';
import HighchartsPage from './HighchartsPage';
import RechartsPage from './RechartsPage';
import DagListPage from './DagListPage';
import LogMonitorDashboard from './LogMonitorDashboard';

// 메인 홈페이지 컴포넌트
function HomePage() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 React K8s App</h1>
        <p>Kubernetes에서 실행되는 React 애플리케이션</p>

        <div className="navigation-section">
          <h2>🔗 추가 기능</h2>
          <div className="nav-buttons">
            <Link to="/highcharts" className="nav-button">
              📊 Highcharts 차트
            </Link>
            <Link to="/recharts" className="nav-button">
              📈 Recharts 차트
            </Link>
            <Link to="/dags" className="nav-button">
              📋 DAG 목록
            </Link>
            <Link to="/dashboard" className="nav-button">
              📊 실시간 로그 모니터링 대시보드
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}

// 대시보드 페이지 컴포넌트
function DashboardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedDag = searchParams.get('dag');

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
          <h1>📊 실시간 로그 모니터링 대시보드{selectedDag ? ` - ${selectedDag}` : ''}</h1>
        </div>
        
        <LogMonitorDashboard selectedDag={selectedDag} />
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/highcharts" element={<HighchartsPage />} />
        <Route path="/recharts" element={<RechartsPage />} />
        <Route path="/dags" element={<DagListPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
