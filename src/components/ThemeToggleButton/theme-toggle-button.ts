import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { lightThemeIcon, darkThemeIcon } from './icons';

@customElement('theme-toggle-button')
export class ThemeToggleButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
    button {
      width: 28px;
      height: 28px;
      padding: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      box-sizing: border-box;
      border: none;
      outline: none;
      background-color: var(--theme-surface-1);
      fill: currentcolor;
      color: var(--theme-on-surface-1);
      text-decoration: none;
      cursor: pointer;
      vertical-align: middle;
      -webkit-tap-highlight-color: transparent;
      border-radius: 50%;
      border: 1px solid var(--theme-primary);
      transition: background-color 100ms cubic-bezier(0.6, -0.28, 0.735, 0.045);
    }
  `;

  // set the _doc element
  private _doc = document.firstElementChild;

  @property({ type: String })
  theme: string | null = null;

  private _getCurrentTheme() {
    // check for a local storage theme first
    const localStorageTheme = localStorage.getItem('theme');
    if (localStorageTheme !== null) {
      this._setTheme(localStorageTheme);
    } else {
      this._setTheme('light');
    }
  }

  firstUpdated() {
    this._getCurrentTheme();
  }

  private _setTheme(theme) {
    this.theme = theme;
    this._doc.setAttribute('color-scheme', theme);
    localStorage.setItem('theme', theme);
  }

  private _toggleTheme() {
    if (this.theme === 'dark') {
      this._setTheme('light');
    } else {
      this._setTheme('dark');
    }
  }

  render() {
    return html`
      <button
        @click=${this._toggleTheme}
        title=${`Enable ${this.theme === 'dark' ? 'Light' : 'Dark'} Theme`}
      >
        ${this.theme === 'dark'
          ? html`
              ${lightThemeIcon}
            `
          : html`
              ${darkThemeIcon}
            `}
      </button>
    `;
  }
}
