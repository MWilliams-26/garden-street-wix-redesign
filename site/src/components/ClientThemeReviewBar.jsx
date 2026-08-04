import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { siteSettings } from '../data/siteSettings';

export const DEFAULT_THEME = 'current-preview';

const themes = [
  ['current-preview', 'Current Preview', 'Baseline before proposed directions'],
  ['bright-balanced', 'Bright & Balanced', 'Clean, energetic and open'],
  ['soft-editorial', 'Soft Editorial', 'Black-led with softer edges'],
  ['bold-editorial', 'Bold & Editorial', 'Graphic, high-contrast and squared'],
  ['warm-artistic', 'Warm & Artistic', 'Soft, organic and welcoming'],
];
const themeNames = Object.fromEntries(themes.map(([value, label]) => [value, label]));
const themeStorageKey = 'gstreet-color-direction';
const reviewStorageKey = 'gstreet-theme-review';

function getStorage(name) {
  try {
    return window[name];
  } catch {
    return null;
  }
}

function readStorage(storage, key) {
  try {
    return storage?.getItem(key) || null;
  } catch {
    return null;
  }
}

function writeStorage(storage, key, value) {
  try {
    if (value === null) storage?.removeItem(key);
    else storage?.setItem(key, value);
  } catch {
    // The review tool remains usable when storage is blocked.
  }
}

function reviewModeEnabled() {
  const parameters = new URLSearchParams(window.location.search);
  if (parameters.get('embedded') === 'true') return false;
  const parameter = parameters.get('review');
  const sessionStorage = getStorage('sessionStorage');
  if (parameter === 'true') writeStorage(sessionStorage, reviewStorageKey, 'true');
  if (parameter === 'false') writeStorage(sessionStorage, reviewStorageKey, null);

  return import.meta.env.VITE_THEME_REVIEW === 'true'
    || parameter === 'true'
    || (parameter !== 'false' && readStorage(sessionStorage, reviewStorageKey) === 'true');
}

function initialTheme(reviewEnabled) {
  const requestedTheme = new URLSearchParams(window.location.search).get('theme');
  if (themeNames[requestedTheme]) return requestedTheme;
  if (!reviewEnabled) return DEFAULT_THEME;
  const storedTheme = readStorage(getStorage('localStorage'), themeStorageKey);
  return themeNames[storedTheme] ? storedTheme : DEFAULT_THEME;
}

export default function ClientThemeReviewBar() {
  const reviewEnabled = useMemo(reviewModeEnabled, []);
  const [theme, setTheme] = useState(() => initialTheme(reviewEnabled));
  const [minimized, setMinimized] = useState(false);
  const [mobileLayout, setMobileLayout] = useState(() => window.matchMedia('(max-width: 768px)').matches);
  const [devicePreview, setDevicePreview] = useState(false);
  const [viewport, setViewport] = useState(() => ({ width: window.innerWidth, height: window.innerHeight }));
  const reviewBar = useRef(null);

  useLayoutEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    const updateLayout = () => {
      setMobileLayout(media.matches);
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    media.addEventListener('change', updateLayout);
    window.addEventListener('resize', updateLayout);
    return () => {
      media.removeEventListener('change', updateLayout);
      window.removeEventListener('resize', updateLayout);
    };
  }, []);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.body.classList.toggle('theme-review-active', reviewEnabled);
    document.body.classList.toggle('theme-review-minimized', reviewEnabled && minimized);
    if (reviewEnabled) writeStorage(getStorage('localStorage'), themeStorageKey, theme);

    const updateReviewOffset = () => {
      if (reviewBar.current) document.body.style.setProperty('--theme-review-height', `${reviewBar.current.offsetHeight + 24}px`);
    };
    updateReviewOffset();
    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateReviewOffset);
    if (reviewBar.current) resizeObserver?.observe(reviewBar.current);

    return () => {
      document.body.classList.remove('theme-review-active', 'theme-review-minimized');
      document.body.style.removeProperty('--theme-review-height');
      resizeObserver?.disconnect();
    };
  }, [minimized, reviewEnabled, theme]);

  if (!reviewEnabled) return null;

  if (minimized) {
    return (
      <aside ref={reviewBar} className="theme-review-bar minimized" aria-label="Color direction review">
        <span>{mobileLayout ? 'Mobile' : 'Desktop'} · <strong>{themeNames[theme]}</strong></span>
        <button type="button" onClick={() => setMinimized(false)}>Expand</button>
      </aside>
    );
  }

  const feedbackSubject = encodeURIComponent(`Website color feedback: ${themeNames[theme]}`);
  const feedbackBody = encodeURIComponent(`Selected direction: ${themeNames[theme]}\nPage: ${window.location.pathname}\n\nWhat do you like about this direction?\n\nWhat do you dislike or want adjusted?\n`);
  const previewDevice = mobileLayout ? 'desktop' : 'mobile';
  const previewDimensions = previewDevice === 'mobile' ? { width: 390, height: 844 } : { width: 1280, height: 800 };
  const previewScale = Math.min(1, (viewport.width - 32) / previewDimensions.width, (viewport.height - 124) / previewDimensions.height);
  const previewUrl = new URL(window.location.href);
  previewUrl.searchParams.delete('review');
  previewUrl.searchParams.set('embedded', 'true');
  previewUrl.searchParams.set('theme', theme);
  const handleThemeKey = (event, index) => {
    const offsets = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (!(event.key in offsets) && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key in offsets) nextIndex = (index + offsets[event.key] + themes.length) % themes.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = themes.length - 1;
    setTheme(themes[nextIndex][0]);
    event.currentTarget.parentElement.children[nextIndex].focus();
  };

  return (
    <>
    <aside ref={reviewBar} className="theme-review-bar" aria-labelledby="theme-review-title">
      <div className="theme-review-heading">
        <div>
          <p id="theme-review-title">Compare the current preview with four proposed directions</p>
          <small>You’re viewing the <strong>{mobileLayout ? 'mobile' : 'desktop/laptop'} layout</strong>. Compare both sizes, then minimize this panel to inspect the page.</small>
        </div>
        <button className="theme-review-minimize" type="button" onClick={() => setMinimized(true)} aria-label="Minimize color direction review">Minimize</button>
      </div>
      <div className="theme-review-controls">
        <div className="theme-options" role="radiogroup" aria-label="Color direction">
          {themes.map(([value, label, description], index) => (
            <button
              type="button"
              role="radio"
              aria-label={label}
              aria-checked={theme === value}
              tabIndex={theme === value ? 0 : -1}
              className={`${value === DEFAULT_THEME ? 'baseline' : ''} ${theme === value ? 'selected' : ''}`.trim()}
              onClick={() => setTheme(value)}
              onKeyDown={(event) => handleThemeKey(event, index)}
              key={value}
            >
              <strong>{label}</strong>
              <small>{description}</small>
            </button>
          ))}
        </div>
        <div className="theme-review-status">
          <span>Current selection: <strong>{themeNames[theme]}</strong></span>
          <div className="theme-review-actions">
            <button type="button" onClick={() => setDevicePreview(true)}>Preview {previewDevice}</button>
            <a href={`mailto:${siteSettings.email}?subject=${feedbackSubject}&body=${feedbackBody}`}>Send feedback</a>
          </div>
        </div>
      </div>
    </aside>
    {devicePreview && (
      <div className="device-preview" role="dialog" aria-modal="true" aria-labelledby="device-preview-title">
        <div className="device-preview-heading">
          <div><strong id="device-preview-title">{previewDevice === 'mobile' ? 'Mobile' : 'Desktop'} preview</strong><span>{previewDimensions.width} × {previewDimensions.height} · {themeNames[theme]}</span></div>
          <button type="button" onClick={() => setDevicePreview(false)}>Close preview</button>
        </div>
        <div className="device-preview-stage" style={{ width: previewDimensions.width * previewScale, height: previewDimensions.height * previewScale }}>
          <iframe
            src={previewUrl.toString()}
            title={`${previewDevice} preview of ${themeNames[theme]}`}
            style={{ width: previewDimensions.width, height: previewDimensions.height, transform: `scale(${previewScale})` }}
          />
        </div>
      </div>
    )}
    </>
  );
}
