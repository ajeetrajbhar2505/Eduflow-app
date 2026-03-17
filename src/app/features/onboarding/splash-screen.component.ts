import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  template: `
    <div class="bg-premium-gradient fixed inset-0 overflow-hidden flex flex-col items-center justify-center text-white font-sans">
      <div class="absolute inset-0 pointer-events-none"></div>

      <main class="relative z-10 flex flex-col items-center justify-center space-y-4" data-purpose="logo-container">
        <div class="animate-scale-in">
          <div class="animate-pulse-glow bg-white/10 p-6 rounded-3xl backdrop-blur-md border border-white/20">
            <svg fill="none" height="80" viewBox="0 0 100 100" width="80" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 50C20 33.4315 33.4315 20 50 20C66.5685 20 80 33.4315 80 50C80 66.5685 66.5685 80 50 80C33.4315 80 20 66.5685 20 50Z" stroke="white" stroke-width="8"></path>
              <path d="M40 40L60 60M60 40L40 60" stroke="white" stroke-linecap="round" stroke-width="8"></path>
              <circle cx="50" cy="50" fill="white" r="10"></circle>
            </svg>
          </div>
        </div>
        <h1 class="text-4xl font-bold tracking-tight mt-6 animate-scale-in" style="animation-delay: 0.2s;">
          EduFlow
        </h1>
        <p class="text-white/60 text-sm tracking-widest uppercase font-medium animate-scale-in" style="animation-delay: 0.4s;">
          Learning in Motion
        </p>
      </main>

      <div class="absolute bottom-0 left-0 w-full h-[20vh] overflow-hidden" data-purpose="animated-waves">
        <div class="relative w-[200%] h-full">
          <svg class="absolute bottom-0 wave-animation" height="100%" preserveAspectRatio="none" viewBox="0 0 1200 120" width="100%">
            <path class="wave-gradient" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,80C960,96,1056,128,1152,117.3C1248,107,1344,53,1392,26.7L1440,0L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
          <svg class="absolute bottom-0 wave-animation" height="80%" preserveAspectRatio="none" style="animation-duration: 15s; opacity: 0.5;" viewBox="0 0 1200 120" width="100%">
            <path class="wave-gradient" d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,48C1200,64,1320,96,1380,112L1440,128L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
          </svg>
        </div>
      </div>
    </div>
  `,
  styles: [
    `

    .wave-gradient { 
      fill: rgba(255, 255, 255, 0.1); 
    }
    
    @keyframes scale-in { 
      0% { 
        transform: scale(0.8); 
        opacity: 0; 
        filter: blur(10px);
      } 
      100% { 
        transform: scale(1); 
        opacity: 1; 
        filter: blur(0);
      } 
    }
    
    @keyframes pulse-glow { 
      0%,100% { 
        filter: drop-shadow(0 0 15px rgba(255,255,255,0.3)); 
      } 
      50% { 
        filter: drop-shadow(0 0 30px rgba(255,255,255,0.6)); 
      } 
    }
    
    @keyframes wave-flow { 
      0% { 
        transform: translateX(0);
      } 
      100% { 
        transform: translateX(-50%);
      } 
    }
    
    .animate-scale-in { 
      animation: scale-in 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; 
    }
    
    .animate-pulse-glow { 
      animation: pulse-glow 3s ease-in-out infinite; 
    }
    
    .wave-animation { 
      animation: wave-flow 10s linear infinite; 
    }
    `,
  ],
})
export class SplashScreenComponent {

  router = inject(Router)

  constructor(){
    setTimeout(() => {
      this.router.navigate(['/onboarding/login'])
    }, 2000);
  }

}