import React, { useEffect, useRef, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  opacity: number;
  revolutionRadius: number;
  revolutionSpeed: number;
  centerX: number;
  centerY: number;
  glowIntensity: number;
  particleType: 'star' | 'cosmic' | 'nebula';
  twinkleSpeed: number;
  driftSpeed: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const lastTimeRef = useRef<number>(0);

  // Memoized resize function
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const particles: Particle[] = [];
    // Optimized particle count for small, subtle particles
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000));

    for (let i = 0; i < particleCount; i++) {
      const particleTypes: ('star' | 'cosmic' | 'nebula')[] = ['star', 'cosmic', 'nebula'];
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      
      particles.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: type === 'star' ? Math.random() * 1.2 + 0.8 : 
              type === 'cosmic' ? Math.random() * 2 + 1 : 
              Math.random() * 3 + 1.5, // Smaller, more subtle sizes
        speed: Math.random() * 1 + 0.3, // Slower, more cosmic speed
        angle: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.7 + 0.3, // Reduced opacity range (0.3-1.0)
        revolutionRadius: type === 'star' ? Math.random() * 30 + 10 :
                         type === 'cosmic' ? Math.random() * 60 + 20 :
                         Math.random() * 90 + 30, // Smaller, tighter orbits for subtle effect
        revolutionSpeed: (Math.random() * 0.02 + 0.008) * (Math.random() > 0.5 ? 1 : -1), // Slower revolution
        centerX: Math.random() * canvas.width,
        centerY: Math.random() * canvas.height,
        glowIntensity: type === 'star' ? Math.random() * 0.8 + 0.4 :
                      type === 'cosmic' ? Math.random() * 0.6 + 0.3 :
                      Math.random() * 0.5 + 0.2, // Reduced glow for subtlety
        particleType: type,
        twinkleSpeed: Math.random() * 0.04 + 0.02, // Slower twinkling
        driftSpeed: Math.random() * 0.2 + 0.08, // Gentle cosmic drift
      });
    }

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize particles first
    initParticles();

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      initParticles(); // Reinitialize particles on resize
    };

    resizeCanvas();
    window.addEventListener('resize', handleResize);

    // Animation function with enhanced particle visibility
    const animate = (currentTime: number) => {
      // Clear canvas completely
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Update revolution angle for smooth orbiting motion
        particle.angle += particle.revolutionSpeed;

        // Enhanced 135-degree universe movement like cosmic flow
        const directionAngle = (135 * Math.PI) / 180; // Exact 135 degrees
        const directionX = Math.cos(directionAngle);
        const directionY = Math.sin(directionAngle);

        // Universe-like cosmic drift and stellar motion
        const cosmicWave = Math.sin(currentTime * 0.0008 + particle.id * 0.1) * 0.4;
        const stellarDrift = Math.cos(currentTime * 0.0005 + particle.id * 0.15) * 0.3;
        const galaxyFlow = Math.sin(currentTime * 0.0003 + particle.angle * 0.5) * 0.2;
        
        // Main 135-degree movement with universe-like flow patterns
        particle.centerX += (directionX + cosmicWave * 0.3 + stellarDrift * 0.2) * particle.speed;
        particle.centerY += (directionY + cosmicWave * 0.2 + galaxyFlow * 0.25) * particle.speed;

        // Cosmic orbital motion with 135-degree universe rotation
        const orbitRadius = particle.revolutionRadius * (1 + Math.sin(currentTime * 0.0008 + particle.id) * 0.1);
        const orbitX = Math.cos(particle.angle) * orbitRadius;
        const orbitY = Math.sin(particle.angle) * orbitRadius;
        
        // Apply precise 135-degree rotation for universe spiral effect
        const rotatedOrbitX = orbitX * Math.cos(directionAngle) - orbitY * Math.sin(directionAngle);
        const rotatedOrbitY = orbitX * Math.sin(directionAngle) + orbitY * Math.cos(directionAngle);
        
        // Add subtle universe perturbations for organic cosmic movement
        const cosmicPerturbation = Math.sin(currentTime * particle.twinkleSpeed + particle.id) * 1.5;
        const stellarWobble = Math.cos(currentTime * particle.driftSpeed + particle.id * 0.3) * 1;
        
        particle.x = particle.centerX + rotatedOrbitX + cosmicPerturbation;
        particle.y = particle.centerY + rotatedOrbitY + stellarWobble;

        // Cosmic twinkling like distant stars
        const primaryTwinkle = Math.sin(currentTime * particle.twinkleSpeed + particle.id * 0.2);
        const secondaryPulse = Math.cos(currentTime * particle.twinkleSpeed * 0.7 + particle.id * 0.1) * 0.3;
        const universeBreath = Math.sin(currentTime * 0.001 + particle.id * 0.05) * 0.2;
        
        // Subtle opacity patterns for cosmic universe effect
        if (particle.particleType === 'star') {
          particle.opacity = 0.4 + 0.4 * ((primaryTwinkle + secondaryPulse + 2) / 3); // 0.4-0.8 range
        } else if (particle.particleType === 'cosmic') {
          particle.opacity = 0.3 + 0.4 * ((primaryTwinkle + universeBreath + 2) / 3); // 0.3-0.7 range
        } else { // nebula
          particle.opacity = 0.2 + 0.3 * ((universeBreath + 1) / 2); // 0.2-0.5 range
        }

        // Universe-style screen wrapping with cosmic regeneration
        const buffer = 120;
        if (particle.centerX > canvas.width + buffer) {
          particle.centerX = -buffer;
          particle.centerY = Math.random() * canvas.height;
          particle.angle = Math.random() * Math.PI * 2;
        }
        if (particle.centerY > canvas.height + buffer) {
          particle.centerY = -buffer;
          particle.centerX = Math.random() * canvas.width;
          particle.angle = Math.random() * Math.PI * 2;
        }
        if (particle.centerX < -buffer) {
          particle.centerX = canvas.width + buffer;
          particle.centerY = Math.random() * canvas.height;
          particle.angle = Math.random() * Math.PI * 2;
        }
        if (particle.centerY < -buffer) {
          particle.centerY = canvas.height + buffer;
          particle.centerX = Math.random() * canvas.width;
          particle.angle = Math.random() * Math.PI * 2;
        }

        // Draw small, subtle particles with cosmic universe effects
        ctx.save();
        
        // Set global alpha for smooth blending
        ctx.globalAlpha = particle.opacity * 0.8; // Reduced overall opacity for subtlety
        
        if (particle.particleType === 'star') {
          // Small twinkling stars
          ctx.fillStyle = 'white';
          ctx.shadowBlur = particle.size * 8; // Proportional glow
          ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          
        } else if (particle.particleType === 'cosmic') {
          // Small cosmic dust particles
          ctx.fillStyle = 'white';
          ctx.shadowBlur = particle.size * 6; // Subtle glow
          ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          
        } else { // nebula
          // Very small nebula particles
          ctx.fillStyle = 'white';
          ctx.shadowBlur = particle.size * 10; // Soft diffuse glow
          ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [resizeCanvas, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'transparent',
        mixBlendMode: 'normal', // Changed from 'screen' for better visibility
        opacity: 1, // Full opacity for maximum visibility
      }}
    />
  );
};

export default ParticleBackground;
