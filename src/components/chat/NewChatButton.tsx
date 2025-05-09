
import React, { useState } from 'react';
import { MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NewChatButtonProps {
  position?: 'fixed' | 'relative';
  className?: string;
}

const NewChatButton: React.FC<NewChatButtonProps> = ({ 
  position = 'fixed',
  className = ''
}) => {
  const isMobile = useIsMobile();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const navigate = useNavigate();

  const handleClearChat = () => {
    // Clear all chat-related storage immediately
    localStorage.removeItem('current-chat');
    sessionStorage.removeItem('chat-messages');
    sessionStorage.removeItem('chat-context');
    
    // Show success toast to confirm action to user
    toast.success('New chat session created');
    
    // Use React Router to navigate instead of full page reload
    // This provides a smoother transition without white flashing
    navigate('/', { replace: true });
    
    // Dispatch a custom event that HomeChatExperience can listen for
    window.dispatchEvent(new CustomEvent('new-chat-created'));
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button 
              onClick={() => setShowConfirmDialog(true)}
              className={`
                ${position === 'fixed' ? 'fixed top-20 right-4 md:top-20 md:right-8 z-50' : ''}
                rounded-full ${isMobile ? 'p-3' : 'p-3'} shadow-lg bg-sky-500 hover:bg-sky-600 text-white
                transition-all duration-200 hover:scale-105 hover:shadow-xl
                ${className}
              `}
              aria-label="New chat"
              type="button"
            >
              <MessageSquarePlus className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-gray-800 text-gray-100 border border-gray-600 shadow-lg">
            <p>Start a new chat</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl max-w-xs sm:max-w-sm mx-auto">
          <div className="absolute -top-12 left-0 right-0 flex justify-center">
            <div className="bg-sky-500 p-3 rounded-full shadow-lg">
              <MessageSquarePlus className="h-6 w-6 text-white" />
            </div>
          </div>
          <AlertDialogHeader className="mt-4">
            <AlertDialogTitle className="text-xl text-center font-bold text-white">
              Start Fresh?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-gray-300 mt-2">
              Starting a new chat will clear your current conversation. You can sign up to save your chats.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col gap-2 sm:flex-col mt-4">
            <AlertDialogAction
              onClick={handleClearChat}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-lg border-0"
            >
              New Chat
            </AlertDialogAction>
            <AlertDialogCancel className="w-full bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-700/50 font-medium py-2 rounded-lg mt-0">
              Keep Current Chat
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default NewChatButton;
