
import React, { useState } from 'react';
import { Volume2, Volume1, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface PronunciationButtonProps {
  text: string;
  className?: string;
}

const PronunciationButton: React.FC<PronunciationButtonProps> = ({ text, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const playPronunciation = async () => {
    if (isPlaying || isLoading) return;
    
    setIsLoading(true);
    try {
      const elevenlabsApiKey = 'sk_5929ca861957ce8f57e3417bed33017c3a03880d1890fb14';
      
      console.log("Using ElevenLabs API key:", `${elevenlabsApiKey.substring(0, 5)}...`);
      
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/1qEiC6qsybMkmnNdVMbK/stream', {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': elevenlabsApiKey,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.85,
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('ElevenLabs API error:', errorData);
        
        if (response.status === 401) {
          throw new Error('API key is invalid or expired');
        } else {
          throw new Error(`Failed to generate audio (Status: ${response.status})`);
        }
      }

      const blob = await response.blob();
      const audio = new Audio(URL.createObjectURL(blob));
      
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
      audio.onerror = (e) => {
        console.error("Audio playback error:", e);
        setIsPlaying(false);
        toast({
          title: "Error",
          description: "Failed to play pronunciation audio",
          variant: "destructive",
        });
      };
      
      await audio.play();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to load pronunciation";
      toast({
        title: "Pronunciation Error",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Pronunciation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className={`flex items-center gap-2 ${className}`}
      onClick={playPronunciation}
      disabled={isPlaying || isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isPlaying ? (
        <Volume2 className="h-4 w-4" />
      ) : (
        <Volume1 className="h-4 w-4" />
      )}
      Pronounce
    </Button>
  );
};

export default PronunciationButton;
