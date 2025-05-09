
import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';

interface InputFieldProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isTyping: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ 
  input, 
  setInput, 
  handleSubmit,
  isTyping
}) => {
  const { isListening } = useVoiceAssistant();
  
  return (
    <div className="flex items-center relative">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        placeholder={isListening ? "Listening..." : "Ask SireIQ..."}
        className={`w-full p-3 pr-12 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none resize-none text-gray-200 placeholder:text-gray-400 transition-all ${
          isListening ? "border-red-400 animate-pulse" : ""
        }`}
        rows={1}
        style={{
          minHeight: '60px',
          maxHeight: '180px',
          overflowY: 'auto'
        }}
      />
      
      <Button 
        disabled={!input.trim() || isTyping}
        type="submit" 
        onClick={(e) => handleSubmit(e as unknown as React.FormEvent)}
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full p-1.5 ${
          !input.trim() || isTyping ? 'bg-gray-700 text-gray-500' : 'bg-blue-600 hover:bg-blue-500 text-white'
        }`}
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default InputField;
