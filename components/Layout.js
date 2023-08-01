import styles from '../styles/layout.module.css';
import Navbar from './Navbar';
import AppBar from './AppBar';
// import * as React from 'react';
import Box from '@mui/material/Box';


const name = 'Leonardo';
export const siteTitle = 'Inventario PuntoGo';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
        <AppBar />
      <Box sx={{margin: '4%'}}>{children}</Box>
    </div>
  );
}