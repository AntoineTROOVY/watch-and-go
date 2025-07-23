import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DarkModeToggle } from '@/components/DarkModeToggle';

declare global {
  interface Window {
    playerjs: any;
  }
}

const Index = () => {
  const [videoEnded, setVideoEnded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Charger la bibliothèque playerjs
    const script = document.createElement('script');
    script.src = '//assets.mediadelivery.net/playerjs/player-0.1.0.min.js';
    script.onload = () => {
      // Initialiser le player une fois le script chargé
      if (window.playerjs) {
        const player = new window.playerjs.Player(document.getElementById("video"));
        player.on("ended", () => {
          setVideoEnded(true);
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleButtonClick = () => {
    if (!videoEnded) {
      toast({
        title: "Regardez la vidéo jusqu'au bout",
        description: "Vous devez regarder toute la vidéo avant de pouvoir accéder au formulaire.",
        variant: "destructive",
      });
      return;
    }

    // Récupérer tous les paramètres d'URL actuels
    const currentParams = new URLSearchParams(window.location.search);
    const baseUrl = 'https://theinfra.fillout.com/onboarding';
    const finalUrl = currentParams.toString() 
      ? `${baseUrl}?${currentParams.toString()}`
      : baseUrl;
    
    window.open(finalUrl, '_blank');
  };

  return (
    <>
      <DarkModeToggle />
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8 transition-colors duration-300">
      <div className="w-full max-w-4xl space-y-8">
        {/* Titre */}
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Regarde cette vidéo de 2 minutes pour accéder à ton onboarding
          </h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Play className="w-4 h-4" />
            <span>Durée : 2 minutes</span>
          </div>
        </div>

        {/* Container vidéo */}
        <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in">
          <iframe 
            id="video"
            src="https://iframe.mediadelivery.net/embed/471568/7e8cd19f-a2b3-4257-8701-45600cec4777?autoplay=false&loop=false&muted=false&preload=true&responsive=false" 
            className="absolute top-0 left-0 w-full h-full border-0"
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" 
            allowFullScreen
            loading="lazy"
          />
        </div>

        {/* Bouton CTA */}
        <div className="text-center space-y-4 animate-fade-in">
          <Button 
            onClick={handleButtonClick}
            size="lg"
            className={`
              ${videoEnded 
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transform hover:scale-105' 
                : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
              } 
              transition-all duration-300 gap-2 px-8 py-6 text-lg font-semibold
            `}
          >
            <FileText className="w-5 h-5" />
            Remplir le formulaire
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Durée estimée : 20-30 minutes
          </p>
          
          {!videoEnded && (
            <p className="text-xs text-muted-foreground animate-pulse">
              👆 Regardez la vidéo complète pour débloquer le bouton
            </p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Index;
