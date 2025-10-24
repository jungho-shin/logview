import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import HighchartsPage from './HighchartsPage';
import RechartsPage from './RechartsPage';
import LogMonitorDashboard from './LogMonitorDashboard';
import apiService from './services/api';

// 메인 홈페이지 컴포넌트
function HomePage() {
  const [time, setTime] = useState(new Date());
  const [podInfo, setPodInfo] = useState(null);
  const [status, setStatus] = useState('loading');
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // API에서 데이터 가져오기
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await apiService.getMainPageData();
        
        setPodInfo(data.podInfo);
        setStatus(data.status);
        setFeatures(data.features);
      } catch (error) {
        console.error('Failed to fetch main page data:', error);
        // API 실패 시 기본값 설정
        setPodInfo({
          podName: process.env.REACT_APP_POD_NAME || 'react-app-pod',
          nodeName: process.env.REACT_APP_NODE_NAME || 'minikube',
          namespace: process.env.REACT_APP_NAMESPACE || 'default'
        });
        setStatus('running');
        setFeatures([
          '실시간 시계',
          'Kubernetes 환경 정보',
          '반응형 디자인',
          'Docker 컨테이너화',
          'K8s 배포 준비',
          'Highcharts 차트',
          'Recharts 차트',
          '실시간 로그 모니터링'
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 React K8s App</h1>
        <p>Kubernetes에서 실행되는 React 애플리케이션</p>
        
        <div className="info-card">
          <h2>현재 시간</h2>
          <div className="time-display">
            {time.toLocaleString('ko-KR')}
          </div>
        </div>

        <div className="info-card">
          <h2>Pod 정보</h2>
          <div className="pod-info">
            <div className="info-item">
              <strong>Pod 이름:</strong> {podInfo?.podName}
            </div>
            <div className="info-item">
              <strong>Node:</strong> {podInfo?.nodeName}
            </div>
            <div className="info-item">
              <strong>Namespace:</strong> {podInfo?.namespace}
            </div>
          </div>
        </div>

        <div className="info-card">
          <h2>상태</h2>
          <div className="status">
            <span className={`status-indicator ${status}`}></span>
            <span>{loading ? '로딩 중...' : status === 'running' ? '실행 중' : status}</span>
          </div>
        </div>

        <div className="features">
          <h2>주요 기능</h2>
          {loading ? (
            <div className="loading">로딩 중...</div>
          ) : (
            <ul>
              {features.map((feature, index) => (
                <li key={index}>✅ {feature}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="navigation-section">
          <h2>🔗 추가 기능</h2>
          <div className="nav-buttons">
            <Link to="/highcharts" className="nav-button">
              📊 Highcharts 차트
            </Link>
            <Link to="/recharts" className="nav-button">
              📈 Recharts 차트
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
          <h1>📊 실시간 로그 모니터링 대시보드</h1>
        </div>
        
        <LogMonitorDashboard />
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
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
