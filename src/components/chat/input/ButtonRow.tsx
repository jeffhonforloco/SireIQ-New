
import React from 'react';
import { Paperclip, Search, BrainCircuit, Mic, MicOff, ChevronUp, ChevronDown } from 'lucide-react';

interface ButtonRowProps {
  handleAttachClick: () => void;
  handleSearchClick: () => void;
  handleReasonClick: () => void;
  handleVoiceInput: () => void;
  toggleFeatures: () => void;
  isExpanded: boolean;
  isListening: boolean;
}

const ButtonRow: React.FC<ButtonRowProps> = ({
  handleAttachClick,
  handleSearchClick,
  handleReasonClick,
  handleVoiceInput,
  toggleFeatures,
  isExpanded,
  isListening
}) => {
  return (
    <div className="flex items-center justify-between mt-2">
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={handleAttachClick}
          className="flex items-center text-gray-400 hover:text-gray-300 text-xs"
        >
          <Paperclip className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Attach</span>
        </button>
        
        <button
          type="button"
          onClick={handleSearchClick}
          className="flex items-center text-gray-400 hover:text-gray-300 text-xs"
        >
          <Search className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Search</span>
        </button>
        
        <button
          type="button"
          onClick={handleReasonClick}
          className="flex items-center text-gray-400 hover:text-gray-300 text-xs"
        >
          <BrainCircuit className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Reason</span>
        </button>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`flex items-center rounded-full px-3 py-1.5 ${
            isListening
              ? 'bg-white text-black animate-pulse border border-gray-200'
              : 'bg-white text-black hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {isListening ? (
            <>
              <MicOff className="h-4 w-4 mr-1" />
              <span className="text-xs font-medium">Stop</span>
            </>
          ) : (
            <>
              <Mic className="h-4 w-4 mr-1" />
              <span className="text-xs font-medium">Voice</span>
            </>
          )}
        </button>
        
        <button
          type="button"
          onClick={toggleFeatures}
          className="rounded-full p-1.5 bg-blue-600 hover:bg-blue-500"
          aria-label={isExpanded ? "Close features" : "Show features"}
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-white" />
          ) : (
            <ChevronUp className="h-4 w-4 text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ButtonRow;
