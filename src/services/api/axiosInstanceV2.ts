import { API_URL_V2 } from '@/constants/api';
import axios from 'axios';
import Bowser from 'bowser';
import { getSession } from 'next-auth/react';
import { publicIpv4 } from 'public-ip';

const axiosInstanceV2 = axios.create({
  baseURL: API_URL_V2,
  timeout: 10000,
});

axiosInstanceV2.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session && session.user && session.user.token) {
      config.headers['Authorization'] = `Bearer ${session.user.token}`;
    }

    // Get public IP address
    const ip = await publicIpv4();
    config.headers['Ip'] = ip;

    // Detect client browser and OS
    // const browser = Bowser.getParser(window.navigator.userAgent);
    // const client = browser.getBrowserName();
    // const os = browser.getOSName();
    // config.headers['Client'] = client;
    // config.headers['OS'] = os;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstanceV2.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response) {
      // For example, redirect to login if 401
      // if (error.response.status === 401) {
      //   window.location.href = '/login';
      // }
    }
    return Promise.reject(error);
  }
);

export default axiosInstanceV2;
