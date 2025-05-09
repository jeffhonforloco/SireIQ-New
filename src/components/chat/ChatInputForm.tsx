
import React, { useRef, useState, useEffect } from 'react';
import InputField from './input/InputField';
import ButtonRow from './input/ButtonRow';
import FeatureButtons from './input/FeatureButtons';
import DisclaimerText from './input/DisclaimerText';
import { useIsMobile } from '@/hooks/use-mobile';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';

interface ChatInputFormProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleVoiceInput: () => void;
  isTyping: boolean;
  isListening: boolean;
}

const ChatInputForm: React.FC<ChatInputFormProps> = ({
  input,
  setInput,
  handleSubmit,
  handleVoiceInput,
  isTyping,
  isListening
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  const { transcript } = useVoiceAssistant();
  
  // Close features panel when user scrolls on mobile
  useEffect(() => {
    if (isMobile) {
      const handleScroll = () => {
        if (isExpanded) {
          setIsExpanded(false);
        }
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile, isExpanded]);
  
  // Debug mobile detection
  useEffect(() => {
    console.log("Is mobile device:", isMobile);
    console.log("Features expanded:", isExpanded);
  }, [isMobile, isExpanded]);
  
  // Set input to transcript while listening
  useEffect(() => {
    if (isListening && transcript) {
      setInput(transcript);
    }
  }, [isListening, transcript, setInput]);
  
  const handleAttachClick = () => {
    // Open file picker dialog
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log("File selected:", file.name);
        // You could add actual file handling logic here
        setInput(`I'm attaching ${file.name}`);
      }
    };
    input.click();
  };

  const handleSearchClick = () => {
    setInput("Search for: ");
  };

  const handleReasonClick = () => {
    setInput("Provide reasoning about ");
  };

  const handleFeatureClick = (featurePrompt: string) => {
    setInput(featurePrompt);
    setIsExpanded(false);
  };

  const toggleFeatures = () => {
    console.log("Toggling features, current state:", isExpanded);
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`px-4 pt-2 pb-4 bg-[#0f1117] border-t border-gray-800 ${isExpanded && isMobile ? 'pb-[330px]' : ''}`}>
      <div className="max-w-3xl mx-auto">
        <form 
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
            return false;
          }} 
          className="relative w-full"
        >
          <InputField 
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isTyping={isTyping}
          />
          
          <ButtonRow 
            handleAttachClick={handleAttachClick}
            handleSearchClick={handleSearchClick}
            handleReasonClick={handleReasonClick}
            handleVoiceInput={handleVoiceInput}
            toggleFeatures={toggleFeatures}
            isExpanded={isExpanded}
            isListening={isListening}
          />
        </form>
        
        <FeatureButtons 
          isExpanded={isExpanded}
          handleFeatureClick={handleFeatureClick}
        />
        
        {!isExpanded && <DisclaimerText />}
      </div>
    </div>
  );
};

export default ChatInputForm;
