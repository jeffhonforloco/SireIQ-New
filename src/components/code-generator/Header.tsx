
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, Sparkles, Eye, EyeOff, Brain, Zap, ArrowLeft, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';

interface HeaderProps {
  canShowPreview: boolean;
  showPreview: boolean;
  onTogglePreview: () => void;
}

const Header: React.FC<HeaderProps> = ({ canShowPreview, showPreview, onTogglePreview }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="border-b border-border-primary bg-background-glass backdrop-blur-xl relative overflow-hidden sticky top-0 z-50">
      {/* Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 via-brand-accent/5 to-brand-primary/5" />
      
      <div className="container mx-auto px-3 sm:px-6 py-2 sm:py-4 relative">
        {/* Mobile Layout - Compact and Clean */}
        <div className="sm:hidden">
          <div className="flex items-center justify-between">
            {/* Left: Back button + Compact branding */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogoClick}
                className="p-1.5 h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-r from-brand-primary to-brand-accent shadow-lg">
                    <Brain className="h-3.5 w-3.5 text-text-inverse" />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Sparkles className="h-1 w-1 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-sm font-bold text-text-primary">AI Code Builder</h1>
                </div>
              </div>
            </div>
            
            {/* Right: Preview toggle if available */}
            {canShowPreview && (
              <Button
                variant="outline"
                size="sm"
                onClick={onTogglePreview}
                className="border-border-primary hover:border-brand-primary/50 hover:bg-brand-primary/10 transition-all duration-200 text-xs px-2 h-7"
              >
                {showPreview ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
                {showPreview ? 'Code' : 'Preview'}
              </Button>
            )}
          </div>
          
          {/* Mobile AI Status - Compact */}
          <div className="flex items-center justify-center gap-3 mt-2 pt-2 border-t border-border-primary/20">
            <div className="flex items-center gap-1 text-xs text-text-secondary">
              <div className="w-1 h-1 bg-brand-primary rounded-full animate-pulse" />
              Smart AI
            </div>
            <div className="flex items-center gap-1 text-xs text-text-secondary">
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
              Auto-Optimize
            </div>
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden sm:block md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                onClick={handleLogoClick}
                className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
              >
                <Logo size="sm" showText={false} />
              </div>
              
              <div className="relative">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent shadow-lg">
                  <Brain className="h-5 w-5 text-text-inverse" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-1.5 w-1.5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-lg font-bold text-text-primary flex items-center gap-2">
                  AI Code Builder
                  <Badge variant="secondary" className="bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 text-brand-primary border-brand-primary/30 text-xs">
                    <Zap className="h-2.5 w-2.5 mr-1" />
                    Smart
                  </Badge>
                </h1>
                <p className="text-xs text-text-secondary flex items-center gap-2">
                  <Code className="h-3 w-3" />
                  AI-powered code generation
                </p>
              </div>
            </div>
            
            {canShowPreview && (
              <Button
                variant="outline"
                size="sm"
                onClick={onTogglePreview}
                className="border-border-primary hover:border-brand-primary/50 hover:bg-brand-primary/10 transition-all duration-200"
              >
                {showPreview ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                {showPreview ? 'Show Code' : 'Show Preview'}
              </Button>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Clickable SireIQ Logo */}
              <div 
                onClick={handleLogoClick}
                className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
              >
                <Logo size="sm" showText={true} />
              </div>
              
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent shadow-lg">
                  <Brain className="h-6 w-6 text-text-inverse" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-2 w-2 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                  AI Code Builder
                  <Badge variant="secondary" className="bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 text-brand-primary border-brand-primary/30">
                    <Zap className="h-3 w-3 mr-1" />
                    Ultra Smart
                  </Badge>
                </h1>
                <p className="text-sm text-text-secondary flex items-center gap-2">
                  <Code className="h-3 w-3" />
                  Advanced AI with pattern recognition and intelligent optimizations
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-text-secondary bg-background-secondary/50 px-3 py-1 rounded-full border border-border-primary/30">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                AI Status: Active
              </div>
              
              <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary border-brand-primary/30">
                <Brain className="h-3 w-3 mr-1" />
                Neural Engine v2.0
              </Badge>
              
              {canShowPreview && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onTogglePreview}
                  className="border-border-primary hover:border-brand-primary/50 hover:bg-brand-primary/10 transition-all duration-200"
                >
                  {showPreview ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </Button>
              )}
            </div>
          </div>
          
          {/* AI Capabilities Indicator */}
          <div className="flex items-center justify-center gap-6 mt-3 pt-3 border-t border-border-primary/20">
            <div className="flex items-center gap-1 text-xs text-text-secondary">
              <div className="w-1 h-1 bg-brand-primary rounded-full animate-pulse" />
              Pattern Recognition
            </div>
            <div className="flex items-center gap-1 text-xs text-text-secondary">
              <div className="w-1 h-1 bg-brand-accent rounded-full animate-pulse" />
              Smart Analysis
            </div>
            <div className="flex items-center gap-1 text-xs text-text-secondary">
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
              Auto-Optimization
            </div>
            <div className="flex items-center gap-1 text-xs text-text-secondary">
              <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse" />
              Best Practices
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
