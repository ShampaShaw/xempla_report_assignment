import React, { useState, useEffect } from 'react';
import { Tooltip, Menu, Dropdown } from 'antd'; // Import Menu and Dropdown from antd
import { useAuth0 } from '@auth0/auth0-react';
import './Header.scss';
import XemplLogo from './../../assets/images/xempla-logo.svg';
import NavIconMenu from './../../assets/images/nav-dropdown-icon.svg';
import ThemeMoon from './../../assets/images/nightmode-nav-icon.svg';
import ThemeSun from './../../assets/images/light-theme-icon.svg';
import LocationPin from './../../assets/images/location-nav-icon.svg';
import NotificationIcon from './../../assets/images/noti-nav-icon.svg';
import UserNavIcon from './../../assets/images/user-nav-icon.svg';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const { user, logout, loginWithRedirect } = useAuth0();
  const { isDarkMode, setDarkMode, setLightMode } = useTheme();
  const [currentLocation, setCurrentLocation] = useState({ city: '', country_name: '' });
  const [notifications, setNotifications] = useState(0);
  const [temp, setTemp] = useState(0);

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin + '/login' }}); // Redirect to the login page after logout
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const locationResponse = await axios.get('https://ipapi.co/json/');
      setCurrentLocation(locationResponse.data);
      getTemperature(locationResponse.data.city);
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const getTemperature = async (city: string) => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=21287ce169a6a9290f46e9e5de0ee13b&units=celcius`
      );
      setTemp(weatherResponse.data.main.temp);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const handleNotificationClick = () => {
    setNotifications(0);
  };

  const tempe = {temp};
  const temperature = tempe.temp - 273.15;
  const temper = temperature.toFixed(0);

  return (
    <header className={`w-100 product-header position-fixed ${isDarkMode ? 'dark-theme' : ''}`}>
      <div className="header-wrapper d-flex justify-content-between pe-3 position-relative">
        <div className="left-header-content d-flex flex-row align-items-center">
          <button className='xem-header-nav-btn d-flex justify-content-center align-items-center me-3'><img src={NavIconMenu} alt="nav" /></button>
          <img src={XemplLogo} alt="Xempla" className='xempla-logo' />
        </div>
        <div className='right-header-content d-flex flex-row align-items-center'>
          <Tooltip title="Change Theme">
            <button className='squircle-btn theme-change-btn me-2' >
              {isDarkMode ? <img src={ThemeSun} alt="day mode" onClick={setLightMode} /> : <img src={ThemeMoon} alt="night mode" onClick={setDarkMode} />} 
            </button>
          </Tooltip>
          <Tooltip title={`Location: ${currentLocation.city}, ${currentLocation.country_name}`}>
            <div className="weatherHeader d-flex flex-row align-items-center justify-content-center me-2">
              <img src={LocationPin} alt="location" />
              <p className="m-0 ps-2">{`${currentLocation.city}, ${currentLocation.country_name}`}</p>
            </div>
          </Tooltip>
          <Tooltip title="Weather">
            <button className='squircle-btn wun-btn me-3'>
              <p className="m-0 ps-2">{temper}°C</p>
            </button>
          </Tooltip>
          <Tooltip title="Notification">
            <div className='position-relative me-2' onClick={handleNotificationClick}>
              {notifications > 0 && <span className="notidot position-absolute">{notifications}</span>}
              <button className='squircle-btn wun-btn me-0'>
                <img src={NotificationIcon} alt="notification" />
              </button>
            </div>
          </Tooltip>
          {/* Render dropdown menu if user is logged in */}
          {user ? (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <a>{user.name}</a>
                  </Menu.Item>
                  <Menu.Item>
                    <a href="/settings">Settings</a>
                  </Menu.Item>
                  <Menu.Item>
                    <a onClick={() => loginWithRedirect()}>Logout</a>
                  </Menu.Item>
                </Menu>
              }
              placement="bottomCenter"
              arrow
            >
              <button className='squircle-btn wun-btn me-3'>
                <img src={UserNavIcon} alt="user" />
              </button>
            </Dropdown>
          ) : (
            <button className='squircle-btn wun-btn me-3' onClick={() => loginWithRedirect()}>
              <img src={UserNavIcon} alt="user" />
            </button>
          
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
