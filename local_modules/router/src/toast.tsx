import { createRoot } from 'react-dom/client';
import { CSSProperties } from 'react';
import { ToastComponent } from './ToastComponent';

let toastCount = 0;

type ToastProps = {
  message: string;
  duration?: number;
  position?: 'bottom' | 'top';
  style?: CSSProperties;
  contentStyle?: CSSProperties;
};

class Toaster {
  private _rootElem: HTMLElement;
  private _rootElemTop: HTMLElement;

  constructor() {
    this._rootElem = document.getElementById('toast-root') as HTMLElement;
    this._rootElemTop = document.getElementById(
      'toast-root-top'
    ) as HTMLElement;

    if (!this._rootElem) {
      this._rootElem = document.createElement('div');
      this._rootElem.id = 'toast-root';
      this._rootElem.style.position = 'fixed';
      this._rootElem.style.bottom = '10%';
      this._rootElem.style.left = '50%';
      this._rootElem.style.transform = 'translateX(-50%)';
      document.body.appendChild(this._rootElem);
    }

    if (!this._rootElemTop) {
      this._rootElemTop = document.createElement('div');
      this._rootElemTop.id = 'toast-root-top';
      this._rootElemTop.style.position = 'fixed';
      this._rootElemTop.style.top = '10%';
      this._rootElemTop.style.left = '50%';
      this._rootElemTop.style.transform = 'translateX(-50%)';
      document.body.appendChild(this._rootElemTop);
    }
  }

  showToast({
    message,
    duration = 3000,
    position = 'bottom',
    style,
    contentStyle,
  }: ToastProps): void {
    const id = new Date().getTime();
    const toastContainer = document.createElement('div');
    toastContainer.id = `toast-${id}`;

    position === 'bottom'
      ? this._rootElem.appendChild(toastContainer)
      : this._rootElemTop.appendChild(toastContainer);

    const root = createRoot(toastContainer);

    root.render(
      <ToastComponent
        message={message}
        style={style}
        contentStyle={contentStyle}
      />
    );
    toastCount++;

    this.autoCloseToast(id, duration, position);
  }

  closeToast(id: number, position: 'top' | 'bottom'): void {
    const elementToRemove = document.getElementById(`toast-${id}`);
    if (elementToRemove) {
      position === 'bottom'
        ? this._rootElem.removeChild(elementToRemove)
        : this._rootElemTop.removeChild(elementToRemove);
      toastCount--;
    }
  }

  autoCloseToast(
    id: number,
    duration: number = 3000,
    position: 'top' | 'bottom'
  ) {
    setTimeout(() => {
      this.closeToast(id, position);
    }, duration);
  }
}

export function Toast({
  message,
  duration = 3000,
  position = 'bottom',
  style,
  contentStyle,
}: ToastProps) {
  const t = new Toaster();
  t.showToast({ message, duration, position, style, contentStyle });
}
