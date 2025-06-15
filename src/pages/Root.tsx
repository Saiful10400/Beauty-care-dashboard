import Nav from '../components/Nav';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Sidebar */}
            <Nav />

            {/* Main Content Area */}
            <main className="flex-1 bg-gray-600 p-4 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default Root;
