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
    // Increased particle count for more eye-catching small particle effect
    const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 8000));

    for (let i = 0; i < particleCount; i++) {
      const particleTypes: ('star' | 'cosmic' | 'nebula')[] = ['star', 'cosmic', 'nebula'];
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      
      particles.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: type === 'star' ? Math.random() * 1.5 + 0.5 : 
              type === 'cosmic' ? Math.random() * 2.5 + 1 : 
              Math.random() * 3.5 + 1.5, // Smaller sizes for more delicate effect
        speed: Math.random() * 1.5 + 0.5, // Slightly faster for more dynamic movement
        angle: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.9 + 0.2, // Higher opacity range for more visibility
        revolutionRadius: type === 'star' ? Math.random() * 40 + 15 :
                         type === 'cosmic' ? Math.random() * 80 + 30 :
                         Math.random() * 120 + 50, // Smaller, tighter orbits
        revolutionSpeed: (Math.random() * 0.04 + 0.015) * (Math.random() > 0.5 ? 1 : -1), // Faster revolution
        centerX: Math.random() * canvas.width,
        centerY: Math.random() * canvas.height,
        glowIntensity: type === 'star' ? Math.random() * 1.2 + 0.8 :
                      type === 'cosmic' ? Math.random() * 0.9 + 0.5 :
                      Math.random() * 0.7 + 0.3, // Enhanced glow for eye-catching effect
        particleType: type,
        twinkleSpeed: Math.random() * 0.08 + 0.03, // Faster twinkling
        driftSpeed: Math.random() * 0.4 + 0.15, // More active cosmic drift
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

    // Animation function with frame rate control
    const animate = (currentTime: number) => {
      // Target 60 FPS
      if (currentTime - lastTimeRef.current < 16) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      lastTimeRef.current = currentTime;

      // Clear canvas with slight trail effect for smoother animation
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Update revolution angle for smooth orbiting motion
        particle.angle += particle.revolutionSpeed;

        // Perfect 135-degree universe-like directional movement
        const directionAngle = (135 * Math.PI) / 180; // Exact 135 degrees
        const directionX = Math.cos(directionAngle);
        const directionY = Math.sin(directionAngle);

        // Enhanced cosmic drift for universe-like flowing motion
        const cosmicFlow = Math.sin(currentTime * particle.driftSpeed + particle.id * 0.2) * 0.6;
        const universalDrift = Math.cos(currentTime * 0.0008 + particle.id * 0.15) * 0.4;
        const galaxySpiral = Math.sin(currentTime * 0.0005 + particle.angle) * 0.2;
        
        // Main 135-degree movement with universe-like flow patterns
        particle.centerX += (directionX + cosmicFlow * 0.3 + universalDrift * 0.2) * particle.speed;
        particle.centerY += (directionY + cosmicFlow * 0.2 + galaxySpiral * 0.3) * particle.speed;

        // Enhanced orbiting motion with perfect 135-degree universe rotation
        const orbitRadius = particle.revolutionRadius * (1 + Math.sin(currentTime * 0.001 + particle.id) * 0.1);
        const orbitX = Math.cos(particle.angle) * orbitRadius;
        const orbitY = Math.sin(particle.angle) * orbitRadius;
        
        // Apply precise 135-degree rotation to create universe spiral effect
        const rotatedOrbitX = orbitX * Math.cos(directionAngle) - orbitY * Math.sin(directionAngle);
        const rotatedOrbitY = orbitX * Math.sin(directionAngle) + orbitY * Math.cos(directionAngle);
        
        // Add subtle universe wobble for more organic movement
        const universeWobble = Math.sin(currentTime * particle.twinkleSpeed + particle.id) * 2;
        
        particle.x = particle.centerX + rotatedOrbitX + universeWobble;
        particle.y = particle.centerY + rotatedOrbitY + universeWobble;

        // Enhanced twinkling patterns for eye-catching effect
        const primaryTwinkle = Math.sin(currentTime * particle.twinkleSpeed + particle.id * 0.3);
        const secondaryTwinkle = Math.cos(currentTime * particle.twinkleSpeed * 1.5 + particle.id * 0.2) * 0.5;
        const universePulse = Math.sin(currentTime * 0.002 + particle.id * 0.1) * 0.3;
        
        // Different opacity patterns for eye-catching universe effect
        if (particle.particleType === 'star') {
          particle.opacity = 0.4 + 0.6 * ((primaryTwinkle + secondaryTwinkle + 2) / 3); // Intense twinkling
        } else if (particle.particleType === 'cosmic') {
          particle.opacity = 0.3 + 0.7 * ((primaryTwinkle + universePulse + 2) / 3); // Cosmic pulsing
        } else { // nebula
          particle.opacity = 0.2 + 0.5 * ((universePulse + 1) / 2); // Gentle universe breathing
        }

        // Universe-style screen wrapping with cosmic regeneration
        const buffer = 150;
        if (particle.centerX > canvas.width + buffer) {
          particle.centerX = -buffer;
          particle.centerY = Math.random() * canvas.height;
          particle.angle = Math.random() * Math.PI * 2; // Randomize angle for variety
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

        // Draw particles as pure white with eye-catching glow effects
        ctx.save();
        
        if (particle.particleType === 'star') {
          // Bright white star with intense sparkle effect
          ctx.shadowBlur = 25;
          ctx.shadowColor = `rgba(255, 255, 255, ${particle.opacity * particle.glowIntensity})`;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
          ctx.fill();

          // Intense white core for sparkle
          ctx.shadowBlur = 12;
          ctx.shadowColor = `rgba(255, 255, 255, 1)`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 0.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(particle.opacity * 2, 1)})`;
          ctx.fill();
          
        } else if (particle.particleType === 'cosmic') {
          // Pure white cosmic particle with medium glow
          ctx.shadowBlur = 18;
          ctx.shadowColor = `rgba(255, 255, 255, ${particle.opacity * particle.glowIntensity})`;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
          ctx.fill();

          // Bright white inner glow
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(255, 255, 255, ${particle.opacity * 0.9})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.8})`;
          ctx.fill();
          
        } else { // nebula
          // Soft white nebula with gentle glow
          ctx.shadowBlur = 30;
          ctx.shadowColor = `rgba(255, 255, 255, ${particle.opacity * particle.glowIntensity * 0.7})`;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.7})`;
          ctx.fill();

          // Extended white glow for nebula effect
          ctx.shadowBlur = 45;
          ctx.shadowColor = `rgba(255, 255, 255, ${particle.opacity * 0.4})`;
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
      className="fixed inset-0 pointer-events-none z-0 opacity-90"
      style={{
        background: 'transparent',
        mixBlendMode: 'screen',
      }}
    />
  );
};

export default ParticleBackground;
