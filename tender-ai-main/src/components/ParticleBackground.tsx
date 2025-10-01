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
  particleType: 'star' | 'cosmic' | 'nebula';
  twinkleSpeed: number;
  driftSpeed: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas element not found!');
      return;
    }

    const particles: Particle[] = [];
    const particleCount = 150; // Much more particles for dense universe effect

    for (let i = 0; i < particleCount; i++) {
      // Create different types of particles for variety
      const types: ('star' | 'cosmic' | 'nebula')[] = ['star', 'cosmic', 'nebula'];
      const particleType = types[Math.floor(Math.random() * types.length)];
      
      // Different characteristics based on particle type
      let size, speed, opacity, revolutionRadius;
      
      if (particleType === 'star') {
        size = Math.random() * 1.5 + 0.8; // 0.8-2.3px - bright stars
        speed = Math.random() * 1.2 + 0.4;
        opacity = Math.random() * 0.4 + 0.5; // 0.5-0.9 - bright
        revolutionRadius = Math.random() * 100 + 30;
      } else if (particleType === 'cosmic') {
        size = Math.random() * 1 + 0.3; // 0.3-1.3px - cosmic dust
        speed = Math.random() * 1.8 + 0.2;
        opacity = Math.random() * 0.5 + 0.2; // 0.2-0.7 - medium
        revolutionRadius = Math.random() * 140 + 20;
      } else { // nebula
        size = Math.random() * 2.5 + 0.4; // 0.4-2.9px - nebula clouds
        speed = Math.random() * 0.8 + 0.1;
        opacity = Math.random() * 0.3 + 0.1; // 0.1-0.4 - subtle
        revolutionRadius = Math.random() * 180 + 40;
      }
      
      particles.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        speed,
        angle: Math.random() * Math.PI * 2,
        opacity,
        revolutionRadius,
        revolutionSpeed: (Math.random() * 0.015 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        centerX: Math.random() * canvas.width,
        centerY: Math.random() * canvas.height,
        particleType,
        twinkleSpeed: Math.random() * 0.004 + 0.001,
        driftSpeed: Math.random() * 0.002 + 0.0005,
      });
    }

    particlesRef.current = particles;
    console.log('Initialized', particles.length, 'particles on canvas', canvas.width + 'x' + canvas.height);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log('Canvas resized to', canvas.width + 'x' + canvas.height);
    initParticles();
  }, [initParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    console.log('Canvas context acquired successfully');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = (currentTime: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let visibleCount = 0;

      particlesRef.current.forEach((particle) => {
        // Enhanced universe rotation with multiple motion layers
        particle.angle += particle.revolutionSpeed;

        // 135-degree universal drift direction
        const directionAngle = (135 * Math.PI) / 180;
        const directionX = Math.cos(directionAngle);
        const directionY = Math.sin(directionAngle);

        // Cosmic spiral galaxy motion with time-based rotation
        const galaxyRotation = currentTime * 0.0002;
        const spiralAngle = particle.angle + galaxyRotation;
        const cosmicDrift = Math.sin(currentTime * 0.0008 + particle.id * 0.1) * 0.3;
        const stellarWave = Math.cos(currentTime * 0.0005 + particle.id * 0.15) * 0.4;
        
        // Universe-like movement with cosmic perturbations
        particle.centerX += (directionX + cosmicDrift * 0.2) * particle.speed;
        particle.centerY += (directionY + stellarWave * 0.2) * particle.speed;

        // Multi-layered orbital motion like celestial bodies
        const primaryOrbit = particle.revolutionRadius * (1 + Math.sin(currentTime * 0.0003 + particle.id) * 0.1);
        const orbitX = Math.cos(spiralAngle) * primaryOrbit;
        const orbitY = Math.sin(spiralAngle) * primaryOrbit;
        
        // Apply 135-degree rotation to orbital motion for universe spiral effect
        const rotatedOrbitX = orbitX * Math.cos(directionAngle) - orbitY * Math.sin(directionAngle);
        const rotatedOrbitY = orbitX * Math.sin(directionAngle) + orbitY * Math.cos(directionAngle);
        
        // Add cosmic perturbations for organic universe movement
        const cosmicPerturbX = Math.sin(currentTime * 0.001 + particle.id * 0.2) * 2;
        const cosmicPerturbY = Math.cos(currentTime * 0.0012 + particle.id * 0.3) * 1.5;
        
        particle.x = particle.centerX + rotatedOrbitX + cosmicPerturbX;
        particle.y = particle.centerY + rotatedOrbitY + cosmicPerturbY;

        // Enhanced universe-like twinkling with particle-specific speeds
        const primaryTwinkle = Math.sin(currentTime * particle.twinkleSpeed + particle.id * 0.2);
        const secondaryPulse = Math.cos(currentTime * particle.twinkleSpeed * 0.7 + particle.id * 0.1) * 0.3;
        const cosmicBreath = Math.sin(currentTime * particle.driftSpeed + particle.id * 0.05) * 0.2;
        
        // Different twinkling patterns based on particle type
        if (particle.particleType === 'star') {
          particle.opacity = 0.4 + 0.4 * ((primaryTwinkle + secondaryPulse + 2) / 3);
        } else if (particle.particleType === 'cosmic') {
          particle.opacity = 0.2 + 0.4 * ((primaryTwinkle + cosmicBreath + 2) / 3);
        } else { // nebula
          particle.opacity = 0.1 + 0.3 * ((cosmicBreath + 1) / 2);
        }

        // Universe-style screen wrapping with cosmic regeneration
        const buffer = 150;
        if (particle.centerX > canvas.width + buffer) {
          particle.centerX = -buffer;
          particle.centerY = Math.random() * canvas.height;
          particle.angle = Math.random() * Math.PI * 2; // Reset orbital position
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

        // Draw particles with type-specific effects
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        
        if (particle.particleType === 'star') {
          // Bright twinkling stars with sharp glow
          ctx.fillStyle = 'white';
          ctx.shadowBlur = particle.size * 8;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 1.2, 0, Math.PI * 2);
          ctx.fill();
          
          // Bright star core
          ctx.shadowBlur = particle.size * 4;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          
        } else if (particle.particleType === 'cosmic') {
          // Cosmic dust with medium glow
          ctx.fillStyle = 'white';
          ctx.shadowBlur = particle.size * 6;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          
        } else { // nebula
          // Soft nebula clouds with diffuse glow
          ctx.fillStyle = 'white';
          ctx.shadowBlur = particle.size * 10;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.2)';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 1.8, 0, Math.PI * 2);
          ctx.fill();
          
          // Soft nebula core
          ctx.shadowBlur = particle.size * 6;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();

        if (particle.x >= 0 && particle.x <= canvas.width && 
            particle.y >= 0 && particle.y <= canvas.height) {
          visibleCount++;
        }
      });

      if (Math.floor(currentTime / 1000) % 2 === 0 && Math.floor(currentTime / 16) % 60 === 0) {
        console.log('Visible particles:', visibleCount, '/', particlesRef.current.length);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    console.log('Animation started');

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [resizeCanvas]);

  return (
    <>
      <div style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        zIndex: 1000,
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '8px',
        borderRadius: '4px',
        fontSize: '12px',
        pointerEvents: 'none'
      }}>
        Particles: {particlesRef.current.length}
      </div>
      
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
    </>
  );
};

export default ParticleBackground;
