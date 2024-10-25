import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Card from '../components/Card';
import DashboardChart from '../components/DashboardChart';

const Home = () => {
    return (
        <DashboardLayout>
            <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card title="Total Users">
                    <p className="text-xl">1,234</p>
                </Card>
                <Card title="Total Sales">
                    <p className="text-xl">$12,345</p>
                </Card>
                <Card title="Pending Orders">
                    <p className="text-xl">56</p>
                </Card>
                <Card title="Active Campaigns">
                    <p className="text-xl">4</p>
                </Card>
            </div>
            <div className="mt-6">
                <DashboardChart />
            </div>
        </DashboardLayout>
    );
};

export default Home;
