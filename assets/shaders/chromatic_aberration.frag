// Chromatic Aberration Fragment Shader
precision mediump float;

uniform float time;
uniform float aberrationStrength;
uniform float glitchIntensity;
uniform vec3 portalColor;
uniform sampler2D tDiffuse;

varying vec2 vUv;

// Noise function for glitch effects
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// Smooth noise
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    vec2 uv = vUv;
    
    // Create swirling effect
    float angle = time * 2.0 + length(uv - 0.5) * 10.0;
    vec2 center = vec2(0.5);
    vec2 offset = (uv - center) * (1.0 + sin(angle) * 0.1);
    uv = center + offset;
    
    // Chromatic aberration offset
    vec2 aberration = vec2(
        cos(time + uv.x * 5.0) * aberrationStrength,
        sin(time + uv.y * 5.0) * aberrationStrength
    );
    
    // Sample RGB channels with offset
    float r = sin(time * 3.0 + uv.x * 15.0 + uv.y * 10.0) * 0.5 + 0.5;
    float g = sin(time * 3.0 + uv.y * 15.0 + 2.094) * 0.5 + 0.5;
    float b = sin(time * 3.0 + length(uv - 0.5) * 20.0 + 4.188) * 0.5 + 0.5;
    
    vec3 color = vec3(r, g, b) * portalColor;
    
    // Add energy waves
    float wave1 = sin(time * 4.0 + uv.x * 20.0) * 0.1;
    float wave2 = sin(time * 6.0 + uv.y * 15.0) * 0.1;
    color += vec3(wave1 + wave2);
    
    // Add glitch effect
    if (glitchIntensity > 0.0) {
        float glitchNoise = noise(uv * 100.0 + time * 10.0);
        float glitch = step(0.9, glitchNoise) * glitchIntensity;
        
        // RGB shift for glitch
        if (glitch > 0.0) {
            color.r = sin(time * 50.0 + uv.x * 100.0);
            color.g = 0.0;
            color.b = cos(time * 50.0 + uv.y * 100.0);
        }
        
        // Scanline effect
        float scanline = sin(uv.y * 800.0 + time * 20.0) * 0.1 * glitchIntensity;
        color += vec3(scanline);
    }
    
    // Radial fade
    float dist = length(uv - 0.5);
    float alpha = 1.0 - smoothstep(0.25, 0.5, dist);
    
    // Pulsing effect
    alpha *= 0.8 + 0.2 * sin(time * 5.0);
    
    // Energy glow
    float glow = exp(-dist * 3.0) * 0.5;
    color += vec3(glow) * portalColor;
    
    gl_FragColor = vec4(color, alpha);
}
