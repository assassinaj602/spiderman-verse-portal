# Spider-Verse Portal Website

A responsive, interactive Spider-Verse multiverse portal website featuring 3D animations, shader effects, and comic book aesthetics.

## Features

- **3D Portal Effects**: Three.js powered portal with custom shaders
- **Character Selection**: Interactive Spider-Man variants from different universes
- **Glitch Effects**: Real-time visual glitches and chromatic aberration
- **Comic Book Aesthetics**: Halftone patterns and jitter effects
- **Responsive Design**: Works on desktop and mobile devices
- **Sound Effects**: Portal activation and character selection sounds

## Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Tailwind CSS with custom animations
- **JavaScript ES6+** - Modern JavaScript features
- **Three.js** - 3D graphics and portal effects
- **GSAP** - Smooth timeline animations
- **Popmotion** - Spring physics for character interactions
- **GLSL Shaders** - Custom fragment shaders for visual effects

## File Structure

```
spiderman-verse/
├── index.html                 # Main HTML file
├── css/
│   └── styles.css            # Custom CSS and animations
├── js/
│   ├── main.js              # Three.js setup and utilities
│   ├── portal.js            # Portal animation system
│   ├── character.js         # Character selection system
│   └── glitch.js            # Glitch effects system
├── assets/
│   ├── images/              # Character images and portal graphics
│   │   ├── spiderman_amazing.svg
│   │   ├── spiderman_2099.svg
│   │   ├── spiderman_noir.svg
│   │   ├── spiderman_gwen.svg
│   │   ├── spiderman_miles.svg
│   │   └── portal_base.svg
│   ├── sounds/              # Audio effects (placeholders)
│   │   ├── portal_open.mp3.txt
│   │   └── whoosh.mp3.txt
│   └── shaders/             # GLSL shader files
│       ├── chromatic_aberration.frag
│       └── halftone.frag
└── README.md
```

## Spider-Man Variants

The website features five iconic Spider-Man variants:

1. **Amazing Spider-Man** (Earth-616) - The original Peter Parker
2. **Spider-Man 2099** (Earth-928) - Miguel O'Hara from the future
3. **Spider-Man Noir** (Earth-90214) - 1930s black and white universe
4. **Spider-Gwen** (Earth-65) - Gwen Stacy as Spider-Woman
5. **Miles Morales** (Earth-1610) - The new generation Spider-Man

## Key Features

### Portal System
- Animated torus geometry with swirling energy effects
- Chromatic aberration shaders for interdimensional feel
- Interactive hover and click animations
- Dynamic color changes based on selected character

### Character System
- Popmotion spring animations for "boing" effects
- Comic book frame jitter (2FPS effect) during transitions
- Character-specific color themes
- Detailed universe information panels

### Glitch Effects
- Screen-wide glitch overlays
- Text scrambling effects
- RGB color channel splitting
- Scanline distortion
- Matrix-style digital rain

### Visual Effects
- Holographic text with animated gradients
- Halftone comic book patterns
- Particle systems for space environment
- Dynamic lighting and glow effects

## Installation

1. Clone or download the project files
2. Open `index.html` in a modern web browser
3. No build process required - all dependencies are loaded via CDN

## Browser Compatibility

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

Requires WebGL support for 3D effects.

## Usage

1. **Portal Interaction**: Hover over the portal to activate it, click for pulse effects
2. **Character Selection**: Click on character cards to select different Spider-Man variants
3. **Info Panel**: Hover over characters to see detailed information
4. **Visual Effects**: Automatic glitch effects trigger during interactions

## Customization

### Adding New Characters

To add a new Spider-Man variant, edit `js/character.js`:

```javascript
{
    id: "custom",
    name: "Custom Spider-Man",
    universe: "Earth-XXXX",
    description: "Your custom Spider-Man description",
    color: "#COLOR",
    image: "assets/images/custom_spiderman.svg",
    powers: ["Custom power 1", "Custom power 2"]
}
```

### Modifying Portal Effects

Portal behavior can be customized in `js/portal.js`:
- Adjust rotation speed
- Modify particle count and behavior
- Change shader uniforms for different visual effects

### Custom Shaders

Add new visual effects by creating GLSL shader files in `assets/shaders/` and loading them in the portal system.

## Performance Notes

- Particle count can be reduced for lower-end devices
- Shader complexity can be adjusted based on performance requirements
- GSAP animations are optimized for 60fps performance

## Future Enhancements

- [ ] Add more Spider-Man variants
- [ ] Implement actual audio files
- [ ] Add VR/AR support
- [ ] Character animation sequences
- [ ] Multi-universe story mode
- [ ] WebRTC for multiplayer portal jumping

## Credits

- Character designs inspired by Marvel's Spider-Verse
- Shader effects based on comic book art techniques
- Audio placeholder structure for future sound integration

## License

This project is for educational and demonstration purposes. Character references are property of Marvel Comics.
