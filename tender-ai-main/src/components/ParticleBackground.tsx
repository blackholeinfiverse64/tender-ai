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
    // Increased particle count for more visual impact
    const particleCount = Math.min(120, Math.floor((canvas.width * canvas.height) / 12000));

    for (let i = 0; i < particleCount; i++) {
      const particleTypes: ('star' | 'cosmic' | 'nebula')[] = ['star', 'cosmic', 'nebula'];
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      
      particles.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: type === 'star' ? Math.random() * 2 + 0.5 : 
              type === 'cosmic' ? Math.random() * 4 + 2 : 
              Math.random() * 6 + 3, // Different sizes for different types
        speed: Math.random() * 1.2 + 0.4, // Faster movement for more dynamic effect
        angle: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.8 + 0.15, // 0.15 to 0.95 opacity
        revolutionRadius: type === 'star' ? Math.random() * 60 + 20 :
                         type === 'cosmic' ? Math.random() * 120 + 40 :
                         Math.random() * 180 + 60, // Varying orbit sizes
        revolutionSpeed: (Math.random() * 0.03 + 0.01) * (Math.random() > 0.5 ? 1 : -1), // Faster revolution
        centerX: Math.random() * canvas.width,
        centerY: Math.random() * canvas.height,
        glowIntensity: type === 'star' ? Math.random() * 0.9 + 0.5 :
                      type === 'cosmic' ? Math.random() * 0.7 + 0.3 :
                      Math.random() * 0.5 + 0.2, // Enhanced glow variation
        particleType: type,
        twinkleSpeed: Math.random() * 0.05 + 0.02, // Twinkling effect
        driftSpeed: Math.random() * 0.3 + 0.1, // Cosmic drift
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
        // Update revolution angle for orbiting motion
        particle.angle += particle.revolutionSpeed;

        // Universe-like 135-degree directional movement
        const directionAngle = (135 * Math.PI) / 180; // Keep 135 degrees as requested
        const directionX = Math.cos(directionAngle);
        const directionY = Math.sin(directionAngle);

        // Cosmic drift and wave motion for universe effect
        const cosmicDrift = Math.sin(currentTime * particle.driftSpeed + particle.id * 0.1) * 0.5;
        const waveOffset = Math.sin(currentTime * 0.001 + particle.id * 0.1) * 0.3;
        
        particle.centerX += (directionX + waveOffset + cosmicDrift * 0.3) * particle.speed;
        particle.centerY += (directionY + waveOffset + cosmicDrift * 0.2) * particle.speed;

        // Enhanced orbiting motion with universe-like rotation
        const orbitX = Math.cos(particle.angle) * particle.revolutionRadius;
        const orbitY = Math.sin(particle.angle) * particle.revolutionRadius;
        
        // Apply 135-degree rotation to the orbit for cosmic spiral effect
        const rotatedOrbitX = orbitX * Math.cos(directionAngle) - orbitY * Math.sin(directionAngle);
        const rotatedOrbitY = orbitX * Math.sin(directionAngle) + orbitY * Math.cos(directionAngle);
        
        particle.x = particle.centerX + rotatedOrbitX;
        particle.y = particle.centerY + rotatedOrbitY;

        // Cosmic twinkling and pulsing effects
        const twinkle = Math.sin(currentTime * particle.twinkleSpeed + particle.id * 0.2);
        const basePulse = Math.sin(currentTime * 0.002 + particle.id * 0.15);
        const cosmicPulse = Math.sin(currentTime * 0.0015 + particle.id * 0.08) * 0.4;
        
        // Different opacity patterns for different particle types
        if (particle.particleType === 'star') {
          particle.opacity = 0.3 + 0.7 * ((twinkle + 1) / 2); // Strong twinkling
        } else if (particle.particleType === 'cosmic') {
          particle.opacity = 0.2 + 0.6 * ((basePulse + cosmicPulse + 2) / 4); // Smooth pulsing
        } else { // nebula
          particle.opacity = 0.1 + 0.4 * ((basePulse + 2) / 3); // Gentle breathing
        }

        // Wrap around screen edges with cosmic effect
        const buffer = 200;
        if (particle.centerX > canvas.width + buffer) {
          particle.centerX = -buffer;
          particle.centerY = Math.random() * canvas.height; // Randomize Y when wrapping
        }
        if (particle.centerY > canvas.height + buffer) {
          particle.centerY = -buffer;
          particle.centerX = Math.random() * canvas.width; // Randomize X when wrapping
        }
        if (particle.centerX < -buffer) {
          particle.centerX = canvas.width + buffer;
          particle.centerY = Math.random() * canvas.height;
        }
        if (particle.centerY < -buffer) {
          particle.centerY = canvas.height + buffer;
          particle.centerX = Math.random() * canvas.width;
        }

        // Draw particle with cosmic universe effects
        ctx.save();
        
        if (particle.particleType === 'star') {
          // Star effect - bright with sharp twinkle
          ctx.shadowBlur = 20;
          ctx.shadowColor = `rgba(255, 255, 255, ${particle.opacity * particle.glowIntensity})`;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
          ctx.fill();

          // Bright core
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(particle.opacity * 1.8, 1)})`;
          ctx.fill();
          
        } else if (particle.particleType === 'cosmic') {
          // Cosmic particle - medium glow with color variation
          const blueShift = Math.sin(currentTime * 0.001 + particle.id) * 0.3 + 0.7;
          ctx.shadowBlur = 15;
          ctx.shadowColor = `rgba(${255 * blueShift}, ${255 * blueShift}, 255, ${particle.opacity * particle.glowIntensity})`;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${255 * blueShift}, ${255 * blueShift}, 255, ${particle.opacity})`;
          ctx.fill();

          // Soft inner glow
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.8})`;
          ctx.fill();
          
        } else { // nebula
          // Nebula effect - large soft glow
          const colorShift = Math.sin(currentTime * 0.0008 + particle.id * 0.1) * 0.4 + 0.6;
          ctx.shadowBlur = 25;
          ctx.shadowColor = `rgba(${255 * colorShift}, 255, ${255 * colorShift}, ${particle.opacity * particle.glowIntensity * 0.6})`;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${255 * colorShift}, 255, ${255 * colorShift}, ${particle.opacity * 0.6})`;
          ctx.fill();

          // Multiple glow layers for nebula effect
          ctx.shadowBlur = 40;
          ctx.shadowColor = `rgba(${255 * colorShift}, 255, ${255 * colorShift}, ${particle.opacity * 0.3})`;
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
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      style={{
        background: 'transparent',
        mixBlendMode: 'screen',
      }}
    />
  );
};

export default ParticleBackground;
