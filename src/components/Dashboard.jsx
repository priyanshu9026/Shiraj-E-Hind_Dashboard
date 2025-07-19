import React from "react";

const Dashboard = () => {
   //volunteer count, donation amount, event count, etc. can be fetched from an API or state management

   
return (
   <div className="container mx-auto p-6">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg mb-8">
         <h1 className="text-4xl font-bold mb-4 text-center">
            Welcome to the Admin Dashboard
         </h1>
         <p className="text-lg text-gray-600 text-center">
            Manage your NGO's operations efficiently.
         </p>
      </div>
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <div className="bg-emerald-700/40 p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2 text-center">Total Volunteers</h2>
            <p className="text-2xl font-bold text-center">150</p>
         </div>
         <div className="bg-emerald-700/40 p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2 text-center">Total Donations</h2>
            <p className="text-2xl font-bold text-center">$10,000</p>
         </div>
         <div className="bg-emerald-700/40 p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2 text-center">Upcoming Events</h2>
            <p className="text-2xl font-bold text-center">5</p>
         </div>
         <div className="bg-emerald-700/40 p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2 text-center">Total Beneficiaries</h2>
            <p className="text-2xl font-bold text-center">300</p>
         </div>
         <div className="bg-emerald-700/40 p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2 text-center">Recent News</h2>
            <p className="text-2xl font-bold text-center">10 Articles</p>
         </div>
      </div>
   </div>
);
};

export default Dashboard;
