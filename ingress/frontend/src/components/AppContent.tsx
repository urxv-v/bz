import React, { useState, useEffect, useRef } from 'react';
import getAll from '../api/read';
import { Experiments, TaskStatus, ExperimentItem, FieldDaqSetup } from '../interfaces/experiments';
import DashboardPanel from './DashboardPanel';

import { createExperimentItemCall } from '../api/create';
import { deleteExperimentCall } from '../api/delete';
import { updateExperimentCall } from '../api/update';

import StickyNav from './StickyNav';

import LandingPageNew from './LandingPageNew';

import Login from './Login';
import Signup from './Signup';

import { Container, LoadingSpinner, useTheme } from './ui';

const AppContent: React.FC = () => {
  const { theme, mode } = useTheme();
  const [data, setData] = useState<Experiments | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [experiments, setExperiments] = useState<ExperimentItem[]>([]);

  const [currentPage, setCurrentPage] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const pendingSectionRef = useRef<string | null>(null);

  const fetchExperiments = async (silent: boolean = false) => {
    if (!silent) setLoading(true);
    try {
      const response = await getAll();
      console.log('API Response:', response);

      if (!response.data) {
        console.warn('No data in response');
        setExperiments([]);
        return;
      }

      const responseData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
      console.log('Parsed response data:', responseData);

      // Handle both formats: { experiments: {} } and { pending: [], done: [] }
      let experimentsArray: ExperimentItem[] = [];

      if (responseData.experiments) {
        // Format: { experiments: { name1: { id, status }, name2: {...} } }
        const experimentsData = responseData.experiments;
        experimentsArray = Object.entries(experimentsData).map(([name, exp]: [string, any]) => ({
          id: exp.id || 0,
          name: name,
          status: (exp.status || 'PENDING').toUpperCase() as TaskStatus
        }));
      } else if (responseData.pending || responseData.done) {
        // Format: { pending: [...], done: [...] }
        const pending = (responseData.pending || []).map((e: any, idx: number) => ({
          id: e.id || idx,
          name: e.name,
          status: 'PENDING' as TaskStatus
        }));
        const done = (responseData.done || []).map((e: any, idx: number) => ({
          id: e.id || idx + 1000,
          name: e.name,
          status: 'DONE' as TaskStatus
        }));
        experimentsArray = [...pending, ...done];
      }

      console.log('Processed experiments array:', experimentsArray);
      setExperiments(experimentsArray);
      setData(responseData);
    } catch (error) {
      console.error('Failed to fetch experiments:', error);
      setExperiments([]);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const createExperiment = async (name: string, fieldDaq?: FieldDaqSetup) => {
    try {
      const response = await createExperimentItemCall(name, fieldDaq);
      if (response.error || response.status !== 201) {
        console.error('Failed to create experiment. Backend returned:', response);
        alert(`Failed to create experiment: ${response.error || 'Unknown error'}`);
        return;
      }
      await fetchExperiments();
    } catch (error) {
      console.error('Failed to create experiment:', error);
      alert('Failed to create experiment due to a network or unexpected error.');
    }
  };

  const toggleExperimentStatus = async (id: number) => {
    try {
      const exp = experiments.find(e => e.id === id);
      if (exp) {
        const newStatus: TaskStatus = exp.status === 'DONE' ? TaskStatus.PENDING : TaskStatus.DONE;
        const response = await updateExperimentCall(exp.name, newStatus, id);
        if (response.error || response.status !== 200) {
          console.error('Failed to toggle experiment status. Backend returned:', response);
          alert(`Failed to update experiment status: ${response.error || 'Unknown error'}`);
          return;
        }
        await fetchExperiments();
      }
    } catch (error) {
      console.error('Failed to toggle experiment:', error);
      alert('Failed to update experiment status due to a network or unexpected error.');
    }
  };

  const deleteExperiment = async (id: number) => {
    try {
      const exp = experiments.find(e => e.id === id);
      if (exp) {
        const response = await deleteExperimentCall(exp.name);
        if (response.error || response.status !== 200) {
          console.error('Failed to delete experiment. Backend returned:', response);
          alert(`Failed to delete experiment: ${response.error || 'Unknown error'}`);
          return;
        }
        await fetchExperiments();
      }
    } catch (error) {
      console.error('Failed to delete experiment:', error);
      alert('Failed to delete experiment due to a network or unexpected error.');
    }
  };

  const handleNavigate = (page: string, sectionId?: string) => {
    if (sectionId && (page === 'landing' || page === 'about' || page === 'contact')) {
      pendingSectionRef.current = sectionId;
      setCurrentPage('landing');
      window.location.hash = 'landing';
    } else {
      setCurrentPage(page);
      window.location.hash = page;
    }
  };

  const handleLoginSuccess = (token: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('blazecore_token', token);
    handleNavigate('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('blazecore_token');
    localStorage.removeItem('blazecore_user');
    localStorage.removeItem('blzc-session');
    handleNavigate('landing');
  };

  useEffect(() => {
    const token = localStorage.getItem('blazecore_token');
    if (token) setIsAuthenticated(true);
    const hash = window.location.hash.slice(1) || 'landing';
    const landingHashes = ['landing', 'about', 'contact'];
    if (landingHashes.includes(hash)) {
      setCurrentPage('landing');
      if (hash !== 'landing') pendingSectionRef.current = `section-${hash}`;
    } else {
      setCurrentPage(hash);
    }
    if (token && hash === 'dashboard') fetchExperiments();
  }, []);

  useEffect(() => {
    if (isAuthenticated && currentPage === 'dashboard') fetchExperiments();
  }, [isAuthenticated, currentPage]);

  // Auto-refresh experiments data every 5 seconds when on dashboard
  useEffect(() => {
    if (!isAuthenticated || currentPage !== 'dashboard') return;

    const interval = setInterval(() => {
      fetchExperiments(true); // Silent fetch - no loading spinner
    }, 5000);

    return () => clearInterval(interval);
  }, [isAuthenticated, currentPage]);

  const isDashboard = currentPage === 'dashboard' && isAuthenticated;

  const renderContent = () => {
    if (loading && currentPage === 'dashboard') {
      return (
        <Container className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" text="Loading Blazecore Dashboard..." />
        </Container>
      );
    }

    switch (currentPage) {
      case 'landing':
        return (
          <LandingPageNew
            onNavigate={handleNavigate}
            scrollToSection={pendingSectionRef.current || undefined}
            onScrollComplete={() => { pendingSectionRef.current = null; }}
          />
        );
      case 'login':
        return <Login onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />;
      case 'signup':
        return <Signup onNavigate={handleNavigate} onSignupSuccess={() => handleLoginSuccess('')} />;
      case 'dashboard':
        if (!isAuthenticated) {
          handleNavigate('login');
          return null;
        }
        return (
          <DashboardPanel
            experiments={experiments}
            onCreateExperiment={createExperiment}
            onToggleStatus={toggleExperimentStatus}
            onDeleteExperiment={deleteExperiment}
            onRefresh={fetchExperiments}
          />
        );
      default:
        return (
          <LandingPageNew
            onNavigate={handleNavigate}
            scrollToSection={pendingSectionRef.current || undefined}
            onScrollComplete={() => { pendingSectionRef.current = null; }}
          />
        );
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.colors.background }}>
      {/* Ambient background — fixed, never affects scroll */}
      <div
        style={{
          position: 'fixed', inset: 0, opacity: 0.3, pointerEvents: 'none', zIndex: 0,
          background: mode === 'light'
            ? 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,113,227,0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(88,86,214,0.04) 0%, transparent 50%)'
            : 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(41,151,255,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(94,92,230,0.06) 0%, transparent 50%)',
        }}
      />

      {/* Fixed nav rendered outside the scroll flow */}
      {!isDashboard && (
        <StickyNav
          onNavigate={handleNavigate}
          currentPage={currentPage}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />
      )}

      {/* Content — offset by nav height (4rem = 64px) so nothing hides under the nav */}
      <main style={{ position: 'relative', zIndex: 1, paddingTop: isDashboard ? 0 : '4rem', minHeight: '100vh' }}>
        {renderContent()}
      </main>
    </div>
  );
};

export default AppContent;
