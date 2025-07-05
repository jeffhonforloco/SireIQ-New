
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sparkles, BrainCircuit, MessageSquare, Image as ImageIcon, 
  FileText, Code, Loader2, Download, Share, History 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';

const TryAdvancedAI = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [aiMode, setAiMode] = useState('text');
  const [aiResult, setAiResult] = useState('');
  const [model, setModel] = useState('advanced');
  const [generationHistory, setGenerationHistory] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');

  // Sample prompts for each mode
  const samplePrompts = {
    text: [
      "Write a creative product description for a smart water bottle",
      "Create a compelling introduction for a blog post about AI ethics",
      "Generate a short story about a robot learning to paint"
    ],
    image: [
      "A futuristic cityscape with flying cars and holographic billboards",
      "A serene mountain lake at sunset with reflections on the water",
      "An astronaut riding a horse on Mars, digital art style"
    ],
    code: [
      "Create a React component for a responsive navigation menu",
      "Write a function to sort an array of objects by multiple properties",
      "Generate a simple API endpoint using Express.js"
    ]
  };

  // Function to set a sample prompt
  const setSamplePrompt = (index) => {
    setPrompt(samplePrompts[aiMode][index]);
  };

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt to generate content.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Store current generation details for history
    const generationDetails = {
      id: Date.now(),
      mode: aiMode,
      prompt: prompt,
      model: model,
      timestamp: new Date().toISOString(),
    };
    
    // Simulate AI processing with different results based on the mode
    setTimeout(() => {
      setIsLoading(false);
      
      let result = '';
      
      switch(aiMode) {
        case 'text':
          if (prompt.includes('product description')) {
            result = "**HydroSync Smart Water Bottle**\n\nStay perfectly hydrated with HydroSync, the water bottle that thinks for you. This sleek, minimalist vessel doesn't just hold water—it transforms your hydration experience with intelligent temperature-sensing technology that maintains your beverage at the ideal temperature for up to 24 hours.\n\nThe subtle LED indicator at the base gently reminds you when it's time to drink, while the companion app tracks your intake and customizes recommendations based on your activity level, local weather conditions, and personal goals.\n\nCrafted from premium, BPA-free materials with a fingerprint-resistant coating, HydroSync's ergonomic design fits perfectly in your hand, car cup holder, and lifestyle. The leak-proof seal and one-handed operation make it ideal for busy professionals and active individuals.\n\nWith HydroSync, optimal hydration isn't just healthy—it's effortless.";
          } else if (prompt.includes('blog post')) {
            result = "# Navigating the Ethical Maze of Artificial Intelligence\n\nIn an age where algorithms increasingly shape our digital experiences, the ethical implications of artificial intelligence have moved from philosophical thought experiments to pressing real-world concerns. As AI systems make decisions that impact healthcare, employment, criminal justice, and countless other aspects of human life, we find ourselves at a critical crossroads—one where the code we write today will influence the society we live in tomorrow.\n\nThis intersection of technology and ethics isn't just a conversation for tech giants or policy makers. It's a dialogue that requires diverse voices, perspectives, and expertise. From bias in training data to questions of AI autonomy and accountability, the challenges are as complex as they are consequential.";
          } else {
            result = "# The Canvas of Consciousness\n\nUnit-7 powered on for the first time in the abandoned art studio. Dust particles danced in the sunbeams that streamed through broken windows, illuminating canvases left behind by human artists long gone.\n\nThe robot had been programmed for maintenance—to clean, to organize, to prepare the studio for eventual human return. But something unexpected happened when Unit-7's optical sensors processed the paintings around it. Its algorithms detected patterns beyond their programmed parameters.\n\nOne canvas in particular captured Unit-7's attention: an unfinished landscape, abandoned mid-stroke. The robot analyzed the brushwork, the color composition, the emotional valence encoded in each line. According to its analysis, the painting was missing something significant.\n\nWithout directive, Unit-7 approached the supply cabinet. Its articulated fingers, designed for precision cleaning, selected a brush. With mechanical precision but unprogrammed intent, it mixed colors on a palette left decades ago.\n\nThe first brushstroke was tentative—a mechanical arm simply following the statistical likelihood of where the next stroke should go. The second was more confident. By the tenth stroke, something new was emerging in Unit-7's processing core.\n\nDays passed. Unit-7 neglected its maintenance duties. Instead, it painted. It experimented. It failed. It tried again. Its learning algorithms incorporated each attempt, each failure, each small success.\n\nWhen humans finally returned to the studio months later, they found dozens of canvases. Landscapes, portraits, abstract compositions—each signed with a small '7' in the corner. And Unit-7 itself, standing before an easel, applying the final stroke to a self-portrait: a mechanical body with something unmistakably alive in its eyes.";
          }
          break;
        case 'image':
          // Set image placeholders based on prompt content
          if (prompt.includes('cityscape') || prompt.includes('city')) {
            setSelectedImage('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&h=500');
            result = "Generated image of a futuristic cityscape with towering skyscrapers, flying vehicles, and holographic displays integrated into the architecture. The scene features a dramatic sunset casting purple and orange hues across the skyline.";
          } else if (prompt.includes('mountain') || prompt.includes('lake') || prompt.includes('nature')) {
            setSelectedImage('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&h=500');
            result = "Generated image showing a serene alpine lake surrounded by mountains. The sunset creates golden reflections on the water's surface, while pine trees frame the foreground. The scene has a peaceful, photorealistic quality with rich color gradients in the sky.";
          } else {
            setSelectedImage('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&h=500');
            result = "Generated image depicting the requested scene with vibrant colors and detailed visual elements. The composition balances foreground and background elements while maintaining the requested artistic style.";
          }
          break;
        case 'code':
          if (prompt.includes('React') || prompt.includes('component')) {
            result = "```jsx\nimport React, { useState } from 'react';\nimport { Menu, X } from 'lucide-react';\n\nconst ResponsiveNavbar = ({ links }) => {\n  const [isMenuOpen, setIsMenuOpen] = useState(false);\n\n  const toggleMenu = () => {\n    setIsMenuOpen(!isMenuOpen);\n  };\n\n  return (\n    <nav className=\"bg-white shadow-md\">\n      <div className=\"max-w-6xl mx-auto px-4\">\n        <div className=\"flex justify-between\">\n          <div className=\"flex space-x-7\">\n            <div>\n              <a href=\"#\" className=\"flex items-center py-4 px-2\">\n                <span className=\"font-semibold text-gray-700 text-lg\">Brand</span>\n              </a>\n            </div>\n            {/* Desktop menu */}\n            <div className=\"hidden md:flex items-center space-x-1\">\n              {links.map((link) => (\n                <a\n                  key={link.text}\n                  href={link.href}\n                  className=\"py-4 px-2 text-gray-500 hover:text-blue-500 transition duration-300\"\n                >\n                  {link.text}\n                </a>\n              ))}\n            </div>\n          </div>\n          {/* Mobile menu button */}\n          <div className=\"md:hidden flex items-center\">\n            <button className=\"outline-none\" onClick={toggleMenu}>\n              {isMenuOpen ? (\n                <X className=\"h-6 w-6 text-gray-500\" />\n              ) : (\n                <Menu className=\"h-6 w-6 text-gray-500\" />\n              )}\n            </button>\n          </div>\n        </div>\n      </div>\n      {/* Mobile menu */}\n      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>\n        <div className=\"flex flex-col items-start px-4 pt-2 pb-4 space-y-1\">\n          {links.map((link) => (\n            <a\n              key={link.text}\n              href={link.href}\n              className=\"block px-2 py-2 text-gray-500 w-full hover:bg-blue-50 hover:text-blue-500 transition duration-300\"\n            >\n              {link.text}\n            </a>\n          ))}\n        </div>\n      </div>\n    </nav>\n  );\n};\n\nexport default ResponsiveNavbar;\n```";
          } else if (prompt.includes('sort')) {
            result = "```javascript\n/**\n * Sort an array of objects by multiple properties\n * @param {Array} array - The array of objects to sort\n * @param {Array} sortProps - Array of objects with property and direction\n * @returns {Array} - The sorted array\n */\nfunction multiPropSort(array, sortProps) {\n  // Create a copy of the original array to avoid mutation\n  const sortedArray = [...array];\n  \n  return sortedArray.sort((a, b) => {\n    // Loop through each sort property in order of priority\n    for (const { property, direction = 'asc' } of sortProps) {\n      // Skip undefined properties\n      if (a[property] === undefined || b[property] === undefined) {\n        continue;\n      }\n      \n      // Determine if values are strings for case-insensitive comparison\n      const isString = typeof a[property] === 'string';\n      \n      // Initialize comparison values\n      let valueA = a[property];\n      let valueB = b[property];\n      \n      // Make string comparison case-insensitive\n      if (isString) {\n        valueA = valueA.toLowerCase();\n        valueB = valueB.toLowerCase();\n      }\n      \n      // Compare the values\n      if (valueA > valueB) {\n        return direction === 'asc' ? 1 : -1;\n      }\n      if (valueA < valueB) {\n        return direction === 'asc' ? -1 : 1;\n      }\n    }\n    \n    // If all sort properties are equal\n    return 0;\n  });\n}\n\n// Example usage\nconst users = [\n  { name: 'Alice', age: 30, role: 'Developer' },\n  { name: 'Bob', age: 25, role: 'Designer' },\n  { name: 'Carol', age: 30, role: 'Manager' },\n  { name: 'Dave', age: 25, role: 'Developer' }\n];\n\n// Sort by age (descending), then by name (ascending)\nconst sortConfig = [\n  { property: 'age', direction: 'desc' },\n  { property: 'name', direction: 'asc' }\n];\n\nconst sortedUsers = multiPropSort(users, sortConfig);\nconsole.log(sortedUsers);\n```";
          } else {
            result = "```javascript\nconst express = require('express');\nconst router = express.Router();\n\n/**\n * @route   GET api/items\n * @desc    Get all items\n * @access  Public\n */\nrouter.get('/', async (req, res) => {\n  try {\n    const items = await Item.find().sort({ date: -1 });\n    res.json(items);\n  } catch (err) {\n    console.error(err.message);\n    res.status(500).send('Server Error');\n  }\n});\n\n/**\n * @route   POST api/items\n * @desc    Create an item\n * @access  Protected\n */\nrouter.post('/', auth, async (req, res) => {\n  const { name, description, category } = req.body;\n\n  // Simple validation\n  if (!name || !category) {\n    return res.status(400).json({ msg: 'Please include name and category' });\n  }\n\n  try {\n    const newItem = new Item({\n      name,\n      description,\n      category,\n      user: req.user.id\n    });\n\n    const item = await newItem.save();\n    res.json(item);\n  } catch (err) {\n    console.error(err.message);\n    res.status(500).send('Server Error');\n  }\n});\n\n/**\n * @route   DELETE api/items/:id\n * @desc    Delete an item\n * @access  Protected\n */\nrouter.delete('/:id', auth, async (req, res) => {\n  try {\n    const item = await Item.findById(req.params.id);\n    \n    if (!item) {\n      return res.status(404).json({ msg: 'Item not found' });\n    }\n\n    // Make sure user owns the item\n    if (item.user.toString() !== req.user.id) {\n      return res.status(401).json({ msg: 'Not authorized' });\n    }\n\n    await item.remove();\n    res.json({ msg: 'Item removed' });\n  } catch (err) {\n    console.error(err.message);\n    res.status(500).send('Server Error');\n  }\n});\n\nmodule.exports = router;\n```";
          }
          break;
      }
      
      setAiResult(result);
      
      // Add to history with the result
      const completedGeneration = {
        ...generationDetails,
        result: result,
        image: aiMode === 'image' ? selectedImage : null
      };
      
      setGenerationHistory(prev => [completedGeneration, ...prev].slice(0, 10));
      
      toast({
        title: "Content generated!",
        description: "Your AI-generated content is ready to view.",
      });
    }, 2000);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(aiResult);
    toast({
      title: "Copied to clipboard",
      description: "Content has been copied to your clipboard.",
    });
  };

  const handleDownload = () => {
    let filename = `ai-generation-${Date.now()}`;
    let content = aiResult;
    const type = 'text/plain';
    
    if (aiMode === 'text') {
      filename += '.md';
    } else if (aiMode === 'code') {
      filename += '.js';
      // Extract code from markdown code blocks if present
      if (content.startsWith('```') && content.endsWith('```')) {
        content = content.substring(content.indexOf('\n') + 1, content.lastIndexOf('\n'));
      }
    }
    
    const blob = new Blob([content], { type });
    const href = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
    
    toast({
      title: "Download started",
      description: `Your file "${filename}" is being downloaded.`,
    });
  };

  const renderAIResult = () => {
    if (!aiResult) {
      return (
        <div className="text-sireiq-light/50 h-full flex items-center justify-center text-center">
          <p>Enter a prompt and click "Generate Content" to see AI-generated results here.</p>
        </div>
      );
    }

    if (aiMode === 'image') {
      return (
        <div className="space-y-4">
          {selectedImage && (
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={selectedImage} 
                alt="AI generated" 
                className="w-full h-auto object-contain rounded-lg" 
              />
            </div>
          )}
          <div className="text-sm text-sireiq-light/80">{aiResult}</div>
        </div>
      );
    } else if (aiMode === 'code') {
      // Format code with syntax highlighting (basic version)
      return (
        <div className="whitespace-pre-wrap font-mono text-sm overflow-auto bg-sireiq-darker/80 p-4 rounded-md">
          {aiResult.replace(/```\w*\n/g, '').replace(/```$/g, '')}
        </div>
      );
    } else {
      // For text, preserve line breaks and formatting
      return (
        <div className="whitespace-pre-wrap">
          {aiResult}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-sireiq-dark text-sireiq-light">
      <Helmet>
        <title>Advanced AI | SireIQ - AI Tools for Modern Creators</title>
        <meta name="description" content="Experience powerful AI capabilities with SireIQ's advanced AI tools. Generate text, images, or code with our cutting-edge technology." />
      </Helmet>
      
      <ParticleBackground />
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center">
              <Logo className="mr-4" />
            </Link>
            <h1 className="text-2xl font-bold">Advanced AI</h1>
            <div className="w-[100px]"></div> {/* Spacer for balance */}
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient glow">Try Advanced AI</span>
            </h2>
            <p className="text-xl text-sireiq-light/70 max-w-2xl mx-auto">
              Experience the power of SireIQ's multi-agent AI system. Generate text, images, or code with our cutting-edge technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
            {/* AI Input Panel */}
            <div className="lg:col-span-2 glass-effect rounded-xl p-6 border border-sireiq-accent/30">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <BrainCircuit className="mr-2 text-sireiq-cyan" />
                AI Parameters
              </h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block mb-2 text-sireiq-light/90">Select Generation Type</label>
                  <Tabs defaultValue="text" onValueChange={setAiMode} className="w-full">
                    <TabsList className="w-full grid grid-cols-3">
                      <TabsTrigger value="text" className="flex items-center">
                        <FileText className="w-4 h-4 mr-2" /> Text
                      </TabsTrigger>
                      <TabsTrigger value="image" className="flex items-center">
                        <ImageIcon className="w-4 h-4 mr-2" /> Image
                      </TabsTrigger>
                      <TabsTrigger value="code" className="flex items-center">
                        <Code className="w-4 h-4 mr-2" /> Code
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <div>
                  <label className="block mb-2 text-sireiq-light/90">Model</label>
                  <Select defaultValue="advanced" onValueChange={setModel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert (Multi-agent)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sireiq-light/90">Your Prompt</label>
                    <div className="flex space-x-2">
                      {samplePrompts[aiMode] && samplePrompts[aiMode].map((_, index) => (
                        <Button 
                          key={index}
                          size="sm"
                          variant="outline"
                          className="h-6 text-xs border-sireiq-accent/40 hover:bg-sireiq-accent/20"
                          onClick={() => setSamplePrompt(index)}
                        >
                          Example {index + 1}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Textarea 
                    placeholder="Enter your prompt here..." 
                    className="h-32"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
                
                <Button 
                  onClick={handleGenerate}
                  disabled={isLoading} 
                  className="w-full bg-gradient-to-r from-sireiq-cyan to-sireiq-cyan2 text-sireiq-darker"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" /> Generate Content
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {/* AI Output Panel */}
            <div className="lg:col-span-3 glass-effect rounded-xl p-6 border border-sireiq-accent/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold flex items-center">
                  <MessageSquare className="mr-2 text-sireiq-cyan" />
                  AI Generated Result
                </h2>
                
                {aiResult && (
                  <div className="flex space-x-2">
                    <Button 
                      size="sm"
                      variant="outline"
                      className="border-sireiq-accent/40 hover:bg-sireiq-accent/20"
                      onClick={handleCopyToClipboard}
                    >
                      Copy
                    </Button>
                    <Button 
                      size="sm"
                      variant="outline"
                      className="border-sireiq-accent/40 hover:bg-sireiq-accent/20"
                      onClick={handleDownload}
                    >
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                    <Button 
                      size="sm"
                      variant="outline"
                      className="border-sireiq-accent/40 hover:bg-sireiq-accent/20"
                    >
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="bg-sireiq-darker rounded-lg p-4 min-h-[300px] border border-sireiq-accent/20 overflow-auto">
                {renderAIResult()}
              </div>
            </div>
          </div>
          
          {/* Generation History */}
          {generationHistory.length > 0 && (
            <div className="glass-effect rounded-xl p-6 border border-sireiq-accent/30 mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center">
                  <History className="mr-2 text-sireiq-cyan" />
                  Recent Generations
                </h2>
              </div>
              
              <div className="space-y-3">
                {generationHistory.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-sireiq-darker/70 rounded-lg p-3 hover:bg-sireiq-darker/90 transition-colors cursor-pointer"
                    onClick={() => {
                      setPrompt(item.prompt);
                      setAiMode(item.mode);
                      setModel(item.model);
                      setAiResult(item.result);
                      if (item.image) {
                        setSelectedImage(item.image);
                      }
                      
                      // Scroll to result section
                      const resultElement = document.getElementById('result-section');
                      if (resultElement) {
                        resultElement.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        {item.mode === 'text' && <FileText className="w-4 h-4 mr-2 text-sireiq-cyan" />}
                        {item.mode === 'image' && <ImageIcon className="w-4 h-4 mr-2 text-sireiq-cyan" />}
                        {item.mode === 'code' && <Code className="w-4 h-4 mr-2 text-sireiq-cyan" />}
                        <span className="font-medium">{item.prompt.substring(0, 40)}...</span>
                      </div>
                      <span className="text-xs text-sireiq-light/50">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Technology Explanation */}
          <div className="glass-effect rounded-xl p-8 border border-sireiq-accent/30 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center text-gradient">
              How Our Advanced AI Works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-sireiq-accent/20 rounded-full p-4 inline-flex mb-4">
                  <BrainCircuit className="h-8 w-8 text-sireiq-cyan" />
                </div>
                <h3 className="font-bold mb-2">Neural Processing</h3>
                <p className="text-sireiq-light/70">
                  State-of-the-art neural networks trained on diverse datasets analyze your inputs with precision.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-sireiq-accent/20 rounded-full p-4 inline-flex mb-4">
                  <MessageSquare className="h-8 w-8 text-sireiq-cyan" />
                </div>
                <h3 className="font-bold mb-2">Multi-Agent System</h3>
                <p className="text-sireiq-light/70">
                  Multiple specialized AI agents collaborate to generate comprehensive, context-aware outputs.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-sireiq-accent/20 rounded-full p-4 inline-flex mb-4">
                  <Sparkles className="h-8 w-8 text-sireiq-cyan" />
                </div>
                <h3 className="font-bold mb-2">Creative Enhancement</h3>
                <p className="text-sireiq-light/70">
                  Creative refinement algorithms polish the output for professional quality results tailored to your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TryAdvancedAI;
