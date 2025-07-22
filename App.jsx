import React, { useState } from 'react';

const App = () => {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('dashboard');
  const [assets] = useState([
    { id: 1, name: 'Mesin USG', category: 'Alat Medis', location: 'Puskesmas Kuta', status: 'Baik', nextMaintenance: '2025-05-10' },
    { id: 2, name: 'Mobil Ambulans', category: 'Kendaraan', location: 'Puskesmas Ubud', status: 'Diperbaiki', nextMaintenance: '2025-04-20' },
    { id: 3, name: 'Autoklaf', category: 'Alat Medis', location: 'Puskesmas Canggu', status: 'Rusak', nextMaintenance: '2025-06-01' },
  ]);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ name: 'Admin Dinkes', role: 'Admin' });
    setPage('dashboard');
  };

  const Dashboard = () => {
    const upcoming = assets.filter(a => new Date(a.nextMaintenance) - new Date() < 7*24*60*60*1000);
    
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard SIMAKES</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard label="Total Aset" value={assets.length} color="blue" />
          <StatCard label="Perlu Pemeliharaan" value={upcoming.length} color="yellow" />
          <StatCard label="Aset Rusak" value={assets.filter(a => a.status === 'Rusak').length} color="red" />
          <StatCard label="Perbaikan Berjalan" value={assets.filter(a => a.status === 'Diperbaiki').length} color="purple" />
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <h3 className="font-semibold text-yellow-800">⚠️ Peringatan Pemeliharaan Mendekat</h3>
          <ul className="mt-2 space-y-1 text-yellow-700">
            {upcoming.map(a => (
              <li key={a.id}>• {a.name} di {a.location} - {new Date(a.nextMaintenance).toLocaleDateString()}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Aset Terdaftar</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Nama</th>
                <th className="text-left py-2">Lokasi</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Jadwal</th>
              </tr>
            </thead>
            <tbody>
              {assets.map(asset => (
                <tr key={asset.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{asset.name}</td>
                  <td>{asset.location}</td>
                  <td>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      asset.status === 'Baik' ? 'bg-green-100 text-green-800' :
                      asset.status === 'Rusak' ? 'bg-red-100 text-red-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {asset.status}
                    </span>
                  </td>
                  <td>{new Date(asset.nextMaintenance).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const StatCard = ({ label, value, color }) => {
    const colors = {
      blue: 'bg-blue-500',
      yellow: 'bg-yellow-500',
      red: 'bg-red-500',
      purple: 'bg-purple-500'
    };
    return (
      <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
        <div className={`${colors[color]} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold`}>
          {value}
        </div>
        <div>
          <p className="text-gray-500 text-sm">{label}</p>
        </div>
      </div>
    );
  };

  const Login = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-center">
          <img src="https://placehold.co/80x80/FFFFFF/0057B7?text=DB" alt="Logo" className="mx-auto mb-4 rounded" />
          <h1 className="text-2xl font-bold text-white">SIMAKES</h1>
          <p className="text-blue-100">Sistem Manajemen Aset Kesehatan</p>
          <p className="text-sm text-blue-100 mt-1">Dinas Kesehatan Kab. Badung</p>
        </div>
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="admin@dinkesbadung.go.id"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              MASUK
            </button>
          </form>
        </div>
        <div className="bg-gray-50 px-8 py-4 text-center">
          <p className="text-sm text-gray-600">Demo Versi Online • © 2025 Dinas Kesehatan Badung</p>
        </div>
      </div>
    </div>
  );

  if (!user) return <Login />;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src=" https://placehold.co/40x40/0D6EFD/FFFFFF?text=SB" alt="Logo" className="rounded" />
            <h1 className="text-xl font-bold text-gray-800">SIMAKES</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Halo, {user.name}</span>
            <button onClick={() => setUser(null)} className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200">
              Keluar
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {['dashboard', 'assets', 'maintenance', 'repairs', 'reports'].map(tab => (
              <button
                key={tab}
                onClick={() => setPage(tab)}
                className={`py-4 px-2 border-b-2 ${page === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {page === 'dashboard' && <Dashboard />}
        {['assets', 'maintenance', 'repairs', 'reports'].includes(page) && (
          <div><h1 className="text-2xl font-bold">Fitur {page}</h1><p>Siap digunakan di versi lengkap.</p></div>
        )}
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          © 2025 Dinas Kesehatan Kabupaten Badung | SIMAKES Versi Online
        </div>
      </footer>
    </div>
  );
};

export default App;
