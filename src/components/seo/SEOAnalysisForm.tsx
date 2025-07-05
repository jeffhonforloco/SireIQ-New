
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search, ExternalLink, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SEOAnalysisData {
  url: string;
  keywords: string[];
  score: number;
  issues: string[];
  improvements: string[];
  timestamp: string;
}

interface SEOAnalysisFormProps {
  onAnalysis: (data: SEOAnalysisData) => void;
  isAnalyzing: boolean;
}

const SEOAnalysisForm: React.FC<SEOAnalysisFormProps> = ({ onAnalysis, isAnalyzing }) => {
  const [url, setUrl] = useState('');
  const [keywords, setKeywords] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a valid URL to analyze",
        variant: "destructive",
      });
      return;
    }

    // Basic URL validation
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlPattern.test(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (e.g., https://example.com)",
        variant: "destructive",
      });
      return;
    }

    // Simulate SEO analysis
    const mockAnalysisData = {
      url: url.startsWith('http') ? url : `https://${url}`,
      keywords: keywords.split(',').map(k => k.trim()).filter(k => k),
      score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
      issues: [
        'Missing meta description',
        'Page loading speed could be improved',
        'Some images missing alt text'
      ],
      improvements: [
        'Add structured data markup',
        'Optimize images for faster loading',
        'Improve internal linking structure'
      ],
      timestamp: new Date().toISOString()
    };

    onAnalysis(mockAnalysisData);
  };

  const handleSEOAgentProRedirect = () => {
    window.open('https://www.seoagentpro.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="bg-card-gradient border border-brand-accent/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-brand-primary" />
          SEO Analysis Tool
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-background/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="keywords">Target Keywords (optional)</Label>
            <Input
              id="keywords"
              placeholder="keyword1, keyword2, keyword3"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="bg-background/50"
            />
            <p className="text-xs text-text-secondary">Separate multiple keywords with commas</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              type="submit" 
              disabled={isAnalyzing}
              className="btn-primary flex-1"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Quick Analysis
                </>
              )}
            </Button>
            
            <Button 
              type="button"
              variant="outline"
              onClick={handleSEOAgentProRedirect}
              className="flex-1 border-brand-accent/50 hover:border-brand-primary/50"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Advanced Analysis
            </Button>
          </div>
        </form>

        <div className="bg-brand-primary/10 border border-brand-primary/30 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-brand-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-brand-primary mb-1">Need deeper insights?</p>
              <p className="text-text-secondary">
                For comprehensive SEO analysis, professional reporting, and advanced optimization strategies, 
                use <button 
                  onClick={handleSEOAgentProRedirect}
                  className="text-brand-primary hover:text-brand-accent underline"
                >
                  SEO Agent Pro
                </button> - our specialized SEO platform.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SEOAnalysisForm;
