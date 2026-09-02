import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import RailGuardDashboard from './components/RailGuardDashboard';
import { fetchTrains, fetchStations, fetchPrediction, fetchHazards } from './services/api';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const [trains, setTrains] = useState([]);
  const [stations, setStations] = useState([]);
  const [hazards, setHazards] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load Initial Dataset
  const loadData = async () => {
    setLoading(true);
    const [trainList, stationList, hazardList] = await Promise.all([
      fetchTrains('All'),
      fetchStations('All'),
      fetchHazards()
    ]);
    setTrains(trainList);
    setStations(stationList);
    setHazards(hazardList);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <RailGuardDashboard
          trains={trains}
          stations={stations}
          hazards={hazards}
          user={user}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}
