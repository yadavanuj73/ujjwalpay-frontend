import ProfileDetails from '../components/ProfileDetails';
import { useLocation } from 'react-router-dom';
import RetailerHeader from '../components/RetailerHeader';

const ProfilePage = () => {
    const location = useLocation();
    const tab = location.state?.tab || 'profile';
    return (
        <div>
            <RetailerHeader compact />
            <ProfileDetails activeTab={tab} />
        </div>
    );
};

export default ProfilePage;
