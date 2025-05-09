
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useRole } from '@/contexts/RoleContext';
import UserMenu from './UserMenu';

const AuthButtons = () => {
  const { role } = useRole();
  
  if (role) {
    return <UserMenu />;
  }

  return (
    <div className="flex items-center space-x-3">
      <Link to="/signin">
        <Button 
          variant="ghost" 
          className="text-gray-300 hover:text-white hover:bg-sireiq-accent/10 transition-colors"
        >
          Sign In
        </Button>
      </Link>
      <Link to="/get-started">
        <Button className="bg-gradient-to-r from-sireiq-cyan to-sireiq-cyan2 text-sireiq-darker rounded-full px-6">
          Get Started
        </Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
