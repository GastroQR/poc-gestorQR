import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import ClientView from './ClientView';
import Menu from './Menu';

function Demo() {
  const demoTableId = "2"; // We'll use table 2 for the demo

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Dashboard section (3/4 width) */}
      <div className="w-3/4 p-4 overflow-auto">
        <Dashboard />
      </div>

      {/* Client interface section (1/4 width) */}
      <div className="w-1/4 bg-gray-200 p-4 border-l border-gray-300">
        <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gray-800 text-white py-2 px-4 text-center">
            Mobile Preview - Table 2
          </div>
          <div className="p-2 h-[calc(100vh-8rem)] overflow-y-auto">
            <Routes>
              <Route path="/" element={<ClientView tableId={demoTableId} />} />
              <Route path="/menu" element={<Menu tableId={demoTableId} />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Demo;