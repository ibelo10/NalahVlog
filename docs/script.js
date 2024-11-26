class SmokeEffect {
    constructor() {
        this.canvas = document.getElementById('smokeCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        this.init();
        this.animate();
    }
    
    resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }
    
    init() {
        for(let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: Math.random() * 2 - 1,
                vy: Math.random() * 2 - 1,
                size: Math.random() * 20 + 10,
                // Using gold colors with varying opacity
                color: `rgba(212, 175, 55, ${Math.random() * 0.03 + 0.02})`
            });
        }
    }
    
    drawSmoke(x, y, size, color) {
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    moveParticles() {
        for(let particle of this.particles) {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            particle.vx += (Math.random() - 0.5) * 0.1;
            particle.vy += (Math.random() - 0.5) * 0.1;
            
            particle.vx = Math.min(Math.max(particle.vx, -2), 2);
            particle.vy = Math.min(Math.max(particle.vy, -2), 2);
            
            if(particle.x < -particle.size) particle.x = this.width + particle.size;
            if(particle.x > this.width + particle.size) particle.x = -particle.size;
            if(particle.y < -particle.size) particle.y = this.height + particle.size;
            if(particle.y > this.height + particle.size) particle.y = -particle.size;
            
            this.drawSmoke(particle.x, particle.y, particle.size, particle.color);
        }
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        this.moveParticles();
        
        requestAnimationFrame(() => this.animate());
    }
}

window.addEventListener('load', () => {
    new SmokeEffect();
});

// Enhanced mouse interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    const smokeEffect = document.querySelector('#smokeCanvas').__smokeEffect;
    if(smokeEffect) {
        for(let i = 0; i < 2; i++) {
            smokeEffect.particles.push({
                x: mouseX + Math.random() * 20 - 10,
                y: mouseY + Math.random() * 20 - 10,
                vx: Math.random() * 2 - 1,
                vy: Math.random() * 2 - 1,
                size: Math.random() * 15 + 5,
                color: `rgba(212, 175, 55, ${Math.random() * 0.03 + 0.02})`
            });
            
            if(smokeEffect.particles.length > smokeEffect.particleCount) {
                smokeEffect.particles.shift();
            }
        }
    }
});