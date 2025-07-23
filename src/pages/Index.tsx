import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

declare global {
  interface Window {
    playerjs: any;
  }
}

const Index = () => {
  const [videoEnded, setVideoEnded] = useState(false);

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
    // Récupérer tous les paramètres d'URL actuels
    const currentParams = new URLSearchParams(window.location.search);
    const baseUrl = 'https://theinfra.fillout.com/onboarding';
    const finalUrl = currentParams.toString() 
      ? `${baseUrl}?${currentParams.toString()}`
      : baseUrl;
    
    window.open(finalUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8">
      <div className="w-full max-w-4xl space-y-8">
        {/* Container vidéo */}
        <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
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
        <div className="text-center space-y-4">
          <Button 
            onClick={handleButtonClick}
            disabled={!videoEnded}
            size="lg"
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Remplir le formulaire
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Durée estimée : 20-30 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
