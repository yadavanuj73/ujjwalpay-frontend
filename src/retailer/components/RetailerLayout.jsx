import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import DogmaLayout from './DogmaLayout';
import { dataService } from '../../services/dataService';

const RetailerLayout = () => {
    const navigate = useNavigate();
    const currentUser = dataService.getCurrentUser();

    useEffect(() => {
        if (!currentUser) {
            navigate('/portal');
            return;
        }

        // If not admin/employee, verify they have RETAILER role
        const isStaff = ['ADMIN', 'NATIONAL_HEADER', 'STATE_HEADER', 'REGIONAL_HEADER', 'EMPLOYEE'].includes(currentUser.role);
        if (!isStaff && currentUser.role !== 'RETAILER') {
            navigate('/portal');
        }
    }, [currentUser, navigate]);

    // Use DogmaLayout for consistent dark sidebar across ALL pages
    return (
        <DogmaLayout>
            <Outlet />
        </DogmaLayout>
    );
};

export default RetailerLayout;
