import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import NavbarTop from '../components/navbar/NavbarTop';
import loadable from '@loadable/component';
import FooterStandard from "../components/landing/FooterStandard";


const DashboardRoutes = loadable(() => import('./DashboardRoutes'));
const DashboardLayout = ({location}) => {

    useEffect(() => {
        DashboardRoutes.preload();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <>
            <NavbarTop/>
                    <DashboardRoutes/>
            <FooterStandard />
        </>
    );
};

DashboardLayout.propTypes = {location: PropTypes.object.isRequired};

export default DashboardLayout;
