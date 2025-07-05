
import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, RefreshCcw } from 'lucide-react';

interface DataPoint {
  name: string;
  users: number;
  requests: number;
  interactions: number;
}

interface AnalyticsChartProps {
  title: string;
  timeframe?: 'day' | 'week' | 'month';
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ 
  title = "Enterprise Analytics", 
  timeframe = 'week'
}) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'day' | 'week' | 'month'>(timeframe);

  // Generate random data based on timeframe
  const generateData = (timeframe: 'day' | 'week' | 'month') => {
    setLoading(true);
    
    const newData: DataPoint[] = [];
    let points: number;
    let format: string;
    
    switch (timeframe) {
      case 'day':
        points = 24;
        format = 'h:mm';
        for (let i = 0; i < points; i++) {
          newData.push({
            name: `${i}:00`,
            users: Math.floor(Math.random() * 100) + 50,
            requests: Math.floor(Math.random() * 500) + 200,
            interactions: Math.floor(Math.random() * 300) + 100,
          });
        }
        break;
      case 'week':
        points = 7;
        format = 'ddd';
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        for (let i = 0; i < points; i++) {
          newData.push({
            name: days[i],
            users: Math.floor(Math.random() * 500) + 200,
            requests: Math.floor(Math.random() * 2000) + 1000,
            interactions: Math.floor(Math.random() * 1500) + 800,
          });
        }
        break;
      case 'month':
        points = 30;
        format = 'MMM D';
        for (let i = 1; i <= points; i++) {
          newData.push({
            name: `Day ${i}`,
            users: Math.floor(Math.random() * 800) + 400,
            requests: Math.floor(Math.random() * 4000) + 2000,
            interactions: Math.floor(Math.random() * 3000) + 1500,
          });
        }
        break;
    }
    
    // Simulate API delay
    setTimeout(() => {
      setData(newData);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    generateData(selectedTimeframe);
  }, [selectedTimeframe]);

  const handleRefresh = () => {
    generateData(selectedTimeframe);
  };

  const handleTimeframeChange = (newTimeframe: 'day' | 'week' | 'month') => {
    setSelectedTimeframe(newTimeframe);
  };

  return (
    <Card className="bg-sireiq-accent/5 border-sireiq-accent/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <p className="text-xs text-sireiq-light/70">
            Real-time analytics data for your organization
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant={selectedTimeframe === 'day' ? 'default' : 'outline'}
            className={selectedTimeframe === 'day' ? 'bg-sireiq-cyan text-sireiq-darker' : 'border-sireiq-accent/30'}
            onClick={() => handleTimeframeChange('day')}
          >
            Day
          </Button>
          <Button
            size="sm"
            variant={selectedTimeframe === 'week' ? 'default' : 'outline'}
            className={selectedTimeframe === 'week' ? 'bg-sireiq-cyan text-sireiq-darker' : 'border-sireiq-accent/30'}
            onClick={() => handleTimeframeChange('week')}
          >
            Week
          </Button>
          <Button
            size="sm"
            variant={selectedTimeframe === 'month' ? 'default' : 'outline'}
            className={selectedTimeframe === 'month' ? 'bg-sireiq-cyan text-sireiq-darker' : 'border-sireiq-accent/30'}
            onClick={() => handleTimeframeChange('month')}
          >
            Month
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleRefresh}
            disabled={loading}
            className="border-sireiq-accent/30"
          >
            <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          {loading ? (
            <div className="h-full w-full flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-sireiq-cyan border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-2 text-sireiq-light/70">Loading analytics data...</p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="name" 
                  stroke="#8E9196"
                  tick={{ fill: '#8E9196' }}
                />
                <YAxis 
                  stroke="#8E9196"
                  tick={{ fill: '#8E9196' }}
                  tickFormatter={(value) => value.toLocaleString()}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0A0F1A', 
                    borderColor: 'rgba(60, 223, 255, 0.3)',
                    color: '#ffffff'
                  }}
                  itemStyle={{ color: '#ffffff' }}
                  labelStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  name="Active Users"
                  stroke="#3CDFFF" 
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="requests" 
                  name="API Requests"
                  stroke="#00A3C4" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="interactions" 
                  name="User Interactions"
                  stroke="#6366F1" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span className="text-green-500 mr-3">+18% from last {selectedTimeframe}</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs border-sireiq-accent/30 hover:bg-sireiq-accent/10"
          >
            <span>Full Report</span>
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;
