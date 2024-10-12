import React from 'react';
import Navbar from '../../Components/Navigation/NavBar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';

const MainLayout = () => {
    return (
        <div className='font-lato'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;