/**
 * ApiArk Design Token System
 *
 * This file is the single source of truth for all design tokens used in the app.
 * The actual CSS custom property values are defined in `global.css` under
 * `[data-theme]` selectors. This file provides typed TypeScript references
 * and documentation for those properties.
 *
 * Usage:
 *   import { colorTokens, spacing } from "@/styles/tokens";
 *   <div style={{ background: colorTokens.surface }} />
 *
 * Plugin authors can use `applyTokenOverrides()` to customize the theme.
 */

// ---------------------------------------------------------------------------
// Color Tokens — maps to CSS custom properties in global.css
// ---------------------------------------------------------------------------

/** Core semantic color tokens referencing CSS custom properties */
export const colorTokens = {
  /** Page background — darkest surface */
  bg: "var(--color-bg)",
  /** Primary surface for panels, sidebars */
  surface: "var(--color-surface)",
  /** Elevated surface — inputs, hover backgrounds */
  elevated: "var(--color-elevated)",
  /** Borders and dividers */
  border: "var(--color-border)",
  /** Primary text — headings, body */
  textPrimary: "var(--color-text-primary)",
  /** Secondary text — labels, descriptions */
  textSecondary: "var(--color-text-secondary)",
  /** Muted text — hints, placeholders */
  textMuted: "var(--color-text-muted)",
  /** Dimmed text — disabled, decorative */
  textDimmed: "var(--color-text-dimmed)",
  /** Activity bar background */
  activityBar: "var(--color-activity-bar)",
  /** Card background */
  card: "var(--color-card)",
  /** Card hover state */
  cardHover: "var(--color-card-hover)",
  /** Accent color — buttons, links, focus rings */
  accent: "var(--color-accent)",
  /** Accent hover state */
  accentHover: "var(--color-accent-hover)",
  /** Accent glow — subtle background tint */
  accentGlow: "var(--color-accent-glow)",
  /** Success color — 2xx status, test pass */
  success: "var(--color-success)",
  /** Warning color — 3xx status, caution */
  warning: "var(--color-warning)",
  /** Error color — 4xx/5xx status, test fail */
  error: "var(--color-error)",
} as const;

/** Type for color token keys */
export type ColorTokenKey = keyof typeof colorTokens;

// ---------------------------------------------------------------------------
// Theme Definitions — raw hex values per theme (for reference/documentation)
// ---------------------------------------------------------------------------

/** Raw color values for each theme. These match the CSS in global.css. */
export const themeValues = {
  light: {
    bg: "#f8f9fc",
    surface: "#f0f1f5",
    elevated: "#e4e6ed",
    border: "#d1d5e0",
    textPrimary: "#111827",
    textSecondary: "#374151",
    textMuted: "#6b7280",
    textDimmed: "#9ca3af",
    activityBar: "#e8eaf0",
    card: "#ffffff",
    cardHover: "#f5f6fa",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
  },
  dark: {
    bg: "#0a0a0b",
    surface: "#141416",
    elevated: "#1c1c1f",
    border: "#2a2a2e",
    textPrimary: "#e4e4e7",
    textSecondary: "#a1a1aa",
    textMuted: "#71717a",
    textDimmed: "#52525b",
    activityBar: "#0f0f11",
    card: "#18181b",
    cardHover: "#1f1f23",
    success: "#22c55e",
    warning: "#eab308",
    error: "#ef4444",
  },
  black: {
    bg: "#000000",
    surface: "#0a0a0a",
    elevated: "#141414",
    border: "#1f1f1f",
    textPrimary: "#e4e4e7",
    textSecondary: "#a1a1aa",
    textMuted: "#71717a",
    textDimmed: "#52525b",
    activityBar: "#000000",
    card: "#0a0a0a",
    cardHover: "#141414",
    success: "#22c55e",
    warning: "#eab308",
    error: "#ef4444",
  },
} as const;

/** Supported theme names */
export type ThemeName = keyof typeof themeValues;

// ---------------------------------------------------------------------------
// Accent Color Presets
// ---------------------------------------------------------------------------

/** Accent color preset definition */
export interface AccentPreset {
  /** Display name */
  readonly name: string;
  /** The `data-accent` attribute value (empty string = default/indigo) */
  readonly dataValue: string;
  /** Primary accent hex */
  readonly color: string;
  /** Hover accent hex (light theme) */
  readonly hoverLight: string;
  /** Hover accent hex (dark/black theme) */
  readonly hoverDark: string;
}

/** The 8 accent color presets available in Settings */
export const accentPresets: readonly AccentPreset[] = [
  { name: "Indigo", dataValue: "indigo", color: "#6366f1", hoverLight: "#4f46e5", hoverDark: "#818cf8" },
  { name: "Blue", dataValue: "blue", color: "#3b82f6", hoverLight: "#2563eb", hoverDark: "#60a5fa" },
  { name: "Emerald", dataValue: "emerald", color: "#10b981", hoverLight: "#059669", hoverDark: "#34d399" },
  { name: "Amber", dataValue: "amber", color: "#f59e0b", hoverLight: "#d97706", hoverDark: "#fbbf24" },
  { name: "Rose", dataValue: "rose", color: "#f43f5e", hoverLight: "#e11d48", hoverDark: "#fb7185" },
  { name: "Violet", dataValue: "violet", color: "#8b5cf6", hoverLight: "#7c3aed", hoverDark: "#a78bfa" },
  { name: "Cyan", dataValue: "cyan", color: "#06b6d4", hoverLight: "#0891b2", hoverDark: "#22d3ee" },
  { name: "Orange", dataValue: "orange", color: "#f97316", hoverLight: "#ea580c", hoverDark: "#fb923c" },
] as const;

// ---------------------------------------------------------------------------
// HTTP Method Colors
// ---------------------------------------------------------------------------

/** Color assignments for HTTP methods (dark theme values shown; light is similar) */
export const methodColors = {
  GET: { color: "#22c55e", label: "emerald" },
  POST: { color: "#eab308", label: "amber" },
  PUT: { color: "#3b82f6", label: "blue" },
  PATCH: { color: "#a855f7", label: "violet" },
  DELETE: { color: "#ef4444", label: "red" },
  HEAD: { color: "#06b6d4", label: "cyan" },
  OPTIONS: { color: "#6b7280", label: "gray" },
} as const;

/** Supported HTTP methods */
export type HttpMethod = keyof typeof methodColors;

// ---------------------------------------------------------------------------
// Status Colors
// ---------------------------------------------------------------------------

/** Semantic status colors for response codes and test results */
export const statusColors = {
  /** 2xx — success, pass */
  success: { token: "var(--color-success)", hex: "#22c55e" },
  /** 3xx — redirect, warning */
  warning: { token: "var(--color-warning)", hex: "#eab308" },
  /** 4xx/5xx — error, fail */
  error: { token: "var(--color-error)", hex: "#ef4444" },
} as const;

// ---------------------------------------------------------------------------
// Spacing Scale
// ---------------------------------------------------------------------------

/** Spacing scale matching Tailwind's default spacing system */
export const spacing = {
  px: "1px",
  0: "0px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
  40: "10rem",
  48: "12rem",
  56: "14rem",
  64: "16rem",
} as const;

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

/** Font family tokens */
export const fontFamilies = {
  /** System UI font stack for body text */
  sans: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  /** Monospace font stack for code, URLs, and editors */
  mono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
} as const;

/** Font size scale (Tailwind defaults) */
export const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
} as const;

/** Font weight tokens used in the app */
export const fontWeights = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

/** Line height tokens */
export const lineHeights = {
  tight: "1.25",
  normal: "1.5",
  relaxed: "1.625",
} as const;

// ---------------------------------------------------------------------------
// Shadows
// ---------------------------------------------------------------------------

/** Box shadow tokens */
export const shadows = {
  /** Subtle shadow for inputs, small cards */
  sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
  /** Default shadow for dropdowns, popovers */
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
  /** Elevated shadow for modals, dialogs */
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
  /** Highest elevation — floating panels */
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
} as const;

// ---------------------------------------------------------------------------
// Border Radius
// ---------------------------------------------------------------------------

/** Border radius tokens */
export const radii = {
  /** Tight radius for badges, tags */
  sm: "0.25rem",
  /** Default radius for buttons, inputs */
  md: "0.375rem",
  /** Larger radius for cards, panels */
  lg: "0.5rem",
  /** Extra large for dialogs, modals */
  xl: "0.75rem",
  /** Maximum radius for pills, avatars */
  full: "9999px",
} as const;

// ---------------------------------------------------------------------------
// Animation & Transition Tokens
// ---------------------------------------------------------------------------

/** Animation duration tokens */
export const durations = {
  /** Fast — hover states, small transitions (e.g., tab switch, fade-in) */
  fast: "150ms",
  /** Normal — standard transitions (e.g., sidebar collapse, panel resize) */
  normal: "200ms",
  /** Slow — deliberate animations (e.g., status pulse, toast entrance) */
  slow: "300ms",
  /** Extra slow — complex animations (e.g., send button flash) */
  extraSlow: "600ms",
} as const;

/** Easing function tokens */
export const easings = {
  /** Default ease-out for most transitions */
  default: "ease-out",
  /** Smooth ease-in-out for looping/shimmer animations */
  smooth: "ease-in-out",
} as const;

/** Named animation references (defined as @keyframes in global.css) */
export const animations = {
  /** Skeleton loading shimmer — 1.5s loop */
  shimmer: "shimmer 1.5s ease-in-out infinite",
  /** Toast slide-in from right */
  slideIn: "slideIn 200ms ease-out",
  /** Generic fade-in */
  fadeIn: "fadeIn 150ms ease-out",
  /** Scale-in for dropdowns and popovers */
  scaleIn: "scaleIn 150ms ease-out",
  /** Status badge pulse on response received */
  statusPulse: "statusPulse 300ms ease-out",
  /** Send button success flash */
  flashGreen: "flashGreen 600ms ease-out",
  /** Send button error flash */
  flashRed: "flashRed 600ms ease-out",
} as const;

// ---------------------------------------------------------------------------
// Borders
// ---------------------------------------------------------------------------

/** Border style tokens */
export const borders = {
  /** Standard border using theme border color */
  default: "1px solid var(--color-border)",
  /** Accent border for active/focused elements */
  accent: "1px solid var(--color-accent)",
  /** Active indicator (e.g., activity bar left border) */
  activeIndicator: "2px solid var(--color-accent)",
} as const;

// ---------------------------------------------------------------------------
// Z-Index Scale
// ---------------------------------------------------------------------------

/** Z-index tokens for layering */
export const zIndices = {
  /** Below normal (e.g., background decorations) */
  below: -1,
  /** Normal content */
  base: 0,
  /** Floating elements (e.g., dropdowns) */
  dropdown: 10,
  /** Sticky elements (e.g., headers) */
  sticky: 20,
  /** Overlays and backdrops */
  overlay: 50,
  /** Modals and dialogs */
  modal: 50,
  /** Toasts and notifications */
  toast: 100,
  /** Skip-to-content link */
  skipLink: 9999,
} as const;

// ---------------------------------------------------------------------------
// Token Swatch Definitions (for Settings UI)
// ---------------------------------------------------------------------------

/** A single token swatch for display in the settings panel */
export interface TokenSwatch {
  /** Token name displayed under the swatch */
  readonly name: string;
  /** CSS value (var reference) to use as background-color */
  readonly value: string;
}

/** Grouped token swatches for the settings Design Tokens section */
export const tokenSwatchGroups: readonly {
  readonly label: string;
  readonly swatches: readonly TokenSwatch[];
}[] = [
  {
    label: "Background",
    swatches: [
      { name: "bg", value: colorTokens.bg },
      { name: "surface", value: colorTokens.surface },
      { name: "elevated", value: colorTokens.elevated },
      { name: "card", value: colorTokens.card },
      { name: "card-hover", value: colorTokens.cardHover },
      { name: "activity-bar", value: colorTokens.activityBar },
    ],
  },
  {
    label: "Text",
    swatches: [
      { name: "primary", value: colorTokens.textPrimary },
      { name: "secondary", value: colorTokens.textSecondary },
      { name: "muted", value: colorTokens.textMuted },
      { name: "dimmed", value: colorTokens.textDimmed },
    ],
  },
  {
    label: "Accent",
    swatches: [
      { name: "accent", value: colorTokens.accent },
      { name: "hover", value: colorTokens.accentHover },
      { name: "glow", value: colorTokens.accentGlow },
    ],
  },
  {
    label: "Status",
    swatches: [
      { name: "success", value: colorTokens.success },
      { name: "warning", value: colorTokens.warning },
      { name: "error", value: colorTokens.error },
    ],
  },
  {
    label: "Method",
    swatches: [
      { name: "GET", value: methodColors.GET.color },
      { name: "POST", value: methodColors.POST.color },
      { name: "PUT", value: methodColors.PUT.color },
      { name: "PATCH", value: methodColors.PATCH.color },
      { name: "DELETE", value: methodColors.DELETE.color },
      { name: "HEAD", value: methodColors.HEAD.color },
      { name: "OPTIONS", value: methodColors.OPTIONS.color },
    ],
  },
  {
    label: "Border",
    swatches: [
      { name: "border", value: colorTokens.border },
    ],
  },
] as const;

// ---------------------------------------------------------------------------
// Plugin Theme Override API
// ---------------------------------------------------------------------------

/** CSS custom property name (without the `--` prefix is fine, we normalize) */
type CSSPropertyName = `--color-${string}`;

/** Map from CSS custom property to override value */
type TokenOverrideMap = Partial<Record<CSSPropertyName, string>>;

/**
 * Mapping from colorTokens keys to their CSS custom property names.
 * Used by `applyTokenOverrides` to translate semantic keys to CSS properties.
 */
const tokenToCSSProperty: Record<ColorTokenKey, CSSPropertyName> = {
  bg: "--color-bg",
  surface: "--color-surface",
  elevated: "--color-elevated",
  border: "--color-border",
  textPrimary: "--color-text-primary",
  textSecondary: "--color-text-secondary",
  textMuted: "--color-text-muted",
  textDimmed: "--color-text-dimmed",
  activityBar: "--color-activity-bar",
  card: "--color-card",
  cardHover: "--color-card-hover",
  accent: "--color-accent",
  accentHover: "--color-accent-hover",
  accentGlow: "--color-accent-glow",
  success: "--color-success",
  warning: "--color-warning",
  error: "--color-error",
};

/**
 * Apply token overrides to the document root element.
 *
 * This enables plugin theming by setting CSS custom properties directly
 * on `<html>`. Overrides take precedence over theme/accent selectors
 * because inline styles have higher specificity.
 *
 * @param overrides - A partial map of color token keys to CSS color values.
 *
 * @example
 * ```ts
 * import { applyTokenOverrides } from "@/styles/tokens";
 *
 * // Plugin sets a custom surface color
 * applyTokenOverrides({ surface: "#1a1a2e", accent: "#e94560" });
 * ```
 */
export function applyTokenOverrides(
  overrides: Partial<Record<ColorTokenKey, string>>,
): void {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(overrides)) {
    const prop = tokenToCSSProperty[key as ColorTokenKey];
    if (prop && value) {
      root.style.setProperty(prop, value);
    }
  }
}

/**
 * Clear all token overrides previously applied via `applyTokenOverrides`.
 * Reverts to the values defined by the active theme and accent selectors.
 */
export function clearTokenOverrides(): void {
  const root = document.documentElement;
  for (const prop of Object.values(tokenToCSSProperty)) {
    root.style.removeProperty(prop);
  }
}

/**
 * Apply raw CSS custom property overrides.
 * Lower-level alternative to `applyTokenOverrides` — accepts CSS property
 * names directly (e.g., `--color-bg`).
 *
 * @param overrides - Map of CSS custom property names to values.
 *
 * @example
 * ```ts
 * applyRawTokenOverrides({ "--color-bg": "#0d1117" });
 * ```
 */
export function applyRawTokenOverrides(overrides: TokenOverrideMap): void {
  const root = document.documentElement;
  for (const [prop, value] of Object.entries(overrides)) {
    if (value) {
      root.style.setProperty(prop, value);
    }
  }
}
