import { useState } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import Media from './Media'; // Import the Media component
import { Router } from 'react-router-dom';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [activeSection, setActiveSection] = useState('Dashboard');

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  }

  // Function to change the active section to 'Media'
  const openMediaPage = () => {
    setActiveSection('Media');
  };
  const openUserPage = () => {
    setActiveSection('User');
  };
  return (
  <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar} />
    
    <Sidebar openSidebarToggle={openSidebarToggle} activeSection={activeSection} openMediaPage={openMediaPage} />
    {activeSection === 'Dashboard' ? (
      <Home setActiveSection={setActiveSection} />
    ) : activeSection === 'Media' ? (
      <Media />
    ) : null}
  </div>
);

}

export default App;
