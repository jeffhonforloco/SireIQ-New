
import React from 'react';
import FeatureCard from './FeatureCard';
import { 
  BrainCircuit, 
  MessagesSquare, 
  Network, 
  Lightbulb, 
  LineChart, 
  Lock,
  Slack
} from 'lucide-react';
import { AdobeIcon, TeamsIcon } from './CustomIcons';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: BrainCircuit,
      title: "AI-Powered Creation",
      description: "Leverage advanced neural networks to generate creative content that's indistinguishable from human-made work.",
      to: "/features/ai-powered-creation"
    },
    {
      icon: MessagesSquare,
      title: "Personality Engine",
      description: "Create content with consistent tone, style, and voice that reflects your brand's unique personality.",
      to: "/features/personality-engine"
    },
    {
      icon: Network,
      title: "Real-time Collaboration",
      description: "Work seamlessly with your team in real-time, sharing ideas and refining content together.",
      to: "/features/real-time-collaboration"
    },
    {
      icon: Lightbulb,
      title: "Idea Generation",
      description: "Overcome creative blocks with AI-assisted brainstorming that sparks innovative concepts.",
      to: "/features/idea-generation"
    },
    {
      icon: LineChart,
      title: "Performance Analytics",
      description: "Track content performance and audience engagement with comprehensive analytics dashboards.",
      to: "/features/performance-analytics"
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Rest easy with bank-level encryption and robust privacy controls protecting your creative assets.",
      to: "/features/enterprise-security"
    }
  ];

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient glow">Powerful Features</span> for Creative Minds
          </h2>
          <p className="text-xl text-sireiq-light/70 max-w-2xl mx-auto">
            SireIQ combines cutting-edge AI technology with intuitive design to empower your creative process.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              to={feature.to}
            />
          ))}
        </div>

        {/* Integration partners section */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-gradient">Seamless Integrations</span>
            </h3>
            <p className="text-sireiq-light/70 max-w-2xl mx-auto mb-8">
              Connect SireIQ with your favorite tools to streamline your creative workflow
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-12 md:gap-16">
            <div className="flex flex-col items-center group">
              <div className="glass-effect rounded-full p-3 mb-2 group-hover:scale-110 transition-transform">
                <Slack className="h-10 w-10 text-sireiq-cyan" />
              </div>
              <span className="text-sm text-sireiq-light/70 group-hover:text-sireiq-light/90 transition-colors">Slack</span>
            </div>
            
            <div className="flex flex-col items-center group">
              <div className="glass-effect rounded-full p-3 mb-2 group-hover:scale-110 transition-transform">
                <AdobeIcon className="h-10 w-10 text-sireiq-cyan" />
              </div>
              <span className="text-sm text-sireiq-light/70 group-hover:text-sireiq-light/90 transition-colors">Adobe</span>
            </div>
            
            <div className="flex flex-col items-center group">
              <div className="glass-effect rounded-full p-3 mb-2 group-hover:scale-110 transition-transform">
                <TeamsIcon className="h-10 w-10 text-sireiq-cyan" />
              </div>
              <span className="text-sm text-sireiq-light/70 group-hover:text-sireiq-light/90 transition-colors">Teams</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
