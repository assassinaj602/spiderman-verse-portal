// Halftone Fragment Shader
precision mediump float;

uniform float time;
uniform vec2 resolution;
uniform vec3 color1;
uniform vec3 color2;
uniform float dotSize;
uniform float spacing;

varying vec2 vUv;

// Function to create halftone dots
float halftone(vec2 uv, float size, float spacing) {
    vec2 grid = floor(uv * spacing);
    vec2 center = (grid + 0.5) / spacing;
    float dist = distance(uv, center);
    
    // Create animated size variation
    float animation = sin(time * 2.0 + grid.x * 0.5 + grid.y * 0.3) * 0.3 + 0.7;
    float dotRadius = size * animation;
    
    return smoothstep(dotRadius, dotRadius * 0.8, dist);
}

// Multiple halftone layers for comic book effect
float multiHalftone(vec2 uv) {
    float dots1 = halftone(uv, dotSize, spacing);
    float dots2 = halftone(uv + vec2(0.5/spacing), dotSize * 0.7, spacing * 1.5);
    float dots3 = halftone(uv + vec2(0.25/spacing), dotSize * 0.5, spacing * 2.0);
    
    return max(max(dots1, dots2 * 0.7), dots3 * 0.5);
}

void main() {
    vec2 uv = vUv;
    
    // Scale UV for halftone pattern
    vec2 halftoneUV = uv * 20.0;
    
    // Get halftone pattern
    float pattern = multiHalftone(halftoneUV);
    
    // Create gradient background
    float gradient = uv.y * 0.5 + 0.5;
    gradient += sin(uv.x * 10.0 + time) * 0.1;
    
    // Mix colors based on pattern and gradient
    vec3 color = mix(color1, color2, gradient);
    color = mix(color * 0.3, color, pattern);
    
    // Add comic book style shading
    float shade = step(0.5, sin(uv.x * 30.0 + time * 2.0) + cos(uv.y * 25.0 + time * 1.5));
    color = mix(color, color * 1.5, shade * 0.2);
    
    // Ben-Day dots effect (classic comic book)
    vec2 bendayUV = uv * 40.0;
    float bendayPattern = halftone(bendayUV, 0.02, 40.0);
    color = mix(color, color2, bendayPattern * 0.3);
    
    // Add some color variation
    color.r += sin(time + uv.x * 5.0) * 0.1;
    color.g += cos(time + uv.y * 3.0) * 0.1;
    color.b += sin(time * 1.5 + length(uv)) * 0.1;
    
    gl_FragColor = vec4(color, 1.0);
}
