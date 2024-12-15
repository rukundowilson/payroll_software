import React, { useState, useEffect } from 'react';
import { Camera, Home, Users, DollarSign, Building2, UserPlus, Bell, Menu, X } from 'lucide-react';
import DepartmentNavigation from './Departments';
import NewEmployee from './Hire';


export default function DashboardNavbar() {
  const [client, setClient] = useState({
    name: '',
    email: '',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  });
  const [currentView, setCurrentView] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [numberOfDeps,setnumberOfDeps] = useState(0)

  useEffect(() => {
    // Simulated authentication check
    const checkAuthentication = () => {
      // In a real app, this would be an actual API call
      fetch('http://localhost:8080/isloggedin', {
        method: 'GET',
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => {
        console.log("Response:", data);
        const { loggedIn, user } = data;
        if (loggedIn) {
          setClient(prev => ({
            ...prev,
            name: user.username,
            email: user.email
          }));
          setIsAuthenticated(true);
        }
      })
      .catch(error => {
        console.error("Authentication error:", error);
        setIsAuthenticated(false);
      });
    };
    checkAuthentication();
  }, []);

  
  const handleLogout = () => {
    // Simulated logout
    fetch('http://localhost:8080/logout', {
      method: 'POST',
      credentials: 'include'
    })
    .then(() => {
      // Redirect to login page after logout
      window.location.href = '/login';
    })
    .catch((error) => {
      console.error('Logout error:', error);
    });
  };

  const navigation = [
    { name: 'Dashboard', icon: Home, view: 'dashboard' },
    { name: 'New Employee', icon: UserPlus, view: 'newEmployee' },
    { name: 'Employees', icon: Users, view: 'employees' },
    { name: 'Payments', icon: DollarSign, view: 'payments' },
    { name: 'Departments', icon: Building2, view: 'departments' }
  ];
  

  const renderContent = () => {
    if (!isAuthenticated) {
      return <div className="text-center text-red-500">Please log in to access the dashboard</div>;
    }

    switch(currentView) {
      case 'dashboard': 
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Total Employees</h2>
              <div className="text-4xl font-bold text-blue-600">254</div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Active Payments</h2>
              <div className="text-4xl font-bold text-green-600">$542,890</div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Departments</h2>
              <div className="text-4xl font-bold text-purple-600">{numberOfDeps}</div>
            </div>
          </div>
        );
      case 'departments': 
        return(
          <div className="">
            <DepartmentNavigation/>
          </div>
        );
      case 'newEmployee': 
        return (
          <div className="p-6 rounded-lg">
            <NewEmployee/>
          </div>);
      default: 
        return <div className="bg-white p-6 rounded-lg shadow-md">Dashboard</div>;
    }
  };

  useEffect(()=>{
    const numberDepartments = async () => {
      try {
        const response = await fetch('http://localhost:8080/departments', {
          method: 'GET',
          credentials: 'include',
        });
    
        if (!response.ok) {
          console.error(`Server responded with status: ${response.status}`);
          return;
        }
    
        const data = await response.json();
        console.log("Server Response:", data);
        setnumberOfDeps(data.numberOfDeps)
        return data;
      } catch (error) {
        console.error('Error fetching number of departments:', error);
        throw error;
      }
    };
    numberDepartments();
    
  },[renderContent])
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Navbar */}
      <div className="fixed top-0 left-0 shadow-md right-0 bg-white h-16 flex items-center justify-between px-4">
        <div className="flex items-center">
          <h1 className="text-gray-900 text-2xl font-bold tracking-wider"> The Hr</h1>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="ml-4 md:hidden text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {isAuthenticated && (
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-900 hover:text-blue-200 mr-4">
              <Bell size={24} />
            </button>
            <div className="flex items-center">
              <img 
                src={client.imageUrl} 
                alt="Profile" 
                className="h-8 w-8 rounded-full mr-2 ring-2 ring-white" 
              />
              <div className="text-gray-900">
                <div className="text-sm font-semibold">{client.name}</div>
                <div className="text-xs opacity-75">{client.email}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && isAuthenticated && (
        <div className="fixed top-16 left-0 right-0 bg-white shadow-lg md:hidden z-40">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setCurrentView(item.view);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center"
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </button>
          ))}
        </div>
      )}

      {/*================ Sidebar ============== */}

      {isAuthenticated && (
        <div className="fixed top-0 z-1000 bottom-0 left-0 w-64 bg-gray-900 shadow-lg pt-6 hidden md:block">

          <nav className="space-y-2 px-4">
            <h3 className='text-white font-bold text-xl my-4'>The Office of Hr</h3>
            <hr/>
            <br/>
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => setCurrentView(item.view)}
                className={`
                  w-full text-left px-4 py-3 rounded-lg transition-all duration-300 
                  flex items-center 
                  ${currentView === item.view 
                    ? 'bg-gray-500 text-white' 
                    : 'text-white hover:bg-gray-700 hover:text-blue-600'}
                `}
              >
                <item.icon className="mr-3 h-6 w-6" />
                {item.name}
              </button>
            ))}
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <button 
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="mt-16 ml-0 md:ml-64 flex-1 p-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}