
export const initializeSpeechRecognition = (): {
  recognition: SpeechRecognition | null;
  supportsSpeechRecognition: boolean;
} => {
  let recognition: SpeechRecognition | null = null;
  let supportsSpeechRecognition = false;

  // Check if browser supports Web Speech API
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    // @ts-expect-error - TypeScript doesn't recognize webkitSpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    supportsSpeechRecognition = true;
  }

  return { recognition, supportsSpeechRecognition };
};

export const setupRecognitionListeners = (
  recognition: SpeechRecognition | null,
  setTranscript: (transcript: string) => void,
  setIsListening: (isListening: boolean) => void
) => {
  if (!recognition) return;
  
  recognition.onresult = (event: SpeechRecognitionEvent) => {
    let currentTranscript = '';
    for (let i = 0; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        currentTranscript += event.results[i][0].transcript + ' ';
      }
    }
    setTranscript(currentTranscript);
  };
  
  recognition.onend = () => {
    setIsListening(false);
  };
  
  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    console.error('Speech recognition error', event.error);
    setIsListening(false);
  };
};
