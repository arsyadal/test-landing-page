export type ShaderMode = 'plasma' | 'particles' | 'voronoi';

export type PalettePreset = 'emerald' | 'amber' | 'void' | 'arctic';

export interface ShaderParams {
  mode: ShaderMode;
  speed: number;
  frequency: number;
  density: number;
  colorPreset: PalettePreset;
  interactiveMouse: boolean;
  wireframe: boolean;
}

export interface RuntimeMetrics {
  fps: number;
  frameTimeMs: number;
  verticesRendered: number;
  activeCanvasWidth: number;
  activeCanvasHeight: number;
}

export type UIStateType = 'active' | 'loading' | 'empty' | 'error';
