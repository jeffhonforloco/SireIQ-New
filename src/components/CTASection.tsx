
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from './ui/sonner';
import { useRole } from '@/contexts/RoleContext';

const CTASection: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { role } = useRole();

  const handleGetEarlyAccess = () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (role) {
      // User is already signed in
      toast.success("Thank you! You're already enrolled in early access.");
      navigate('/dashboard');
    } else {
      // User needs to register - redirect to get started with email pre-filled
      toast.success("Thank you for your interest! Please complete registration.");
      // In a real app, you might pass the email as a query parameter or state
      navigate('/get-started');
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-cta-gradient p-8 md:p-12">
          {/* Glowing accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-sireiq-cyan/30 rounded-full blur-3xl -z-10 animate-glow"></div>
          
          <div className="max-w-3xl mx-auto">
            {/* CTA content */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your <span className="text-gradient glow">Creative Process</span>?
              </h2>
              <p className="text-xl text-sireiq-light/80">
                Join thousands of creative professionals using SireIQ to produce exceptional content with AI assistance.
              </p>
            </div>

            {/* Email signup form */}
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-sireiq-darker/50 border border-sireiq-cyan/30 focus:border-sireiq-cyan focus:ring focus:ring-sireiq-cyan/20 focus:outline-none text-sireiq-light"
              />
              <Button 
                className="bg-[#3CDFFF] text-sireiq-darker hover:bg-[#33c3e0] px-6 py-3 h-auto"
                onClick={handleGetEarlyAccess}
              >
                Get Early Access <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-6 text-center text-sm text-sireiq-light/50">
              <p>No credit card required. 14-day free trial. Cancel anytime.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
