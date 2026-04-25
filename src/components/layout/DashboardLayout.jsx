import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const DashboardLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-[#f4f7fb] font-sans overflow-hidden">
      {/* Top Navbar spans full width over the Sidebar */}
      <Topbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar takes remaining height on the left */}
        <Sidebar className="w-[280px]" />
        
        {/* Main Content Area takes rest of the space */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f4f7fb] p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
