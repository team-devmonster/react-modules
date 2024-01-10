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
  private _positioin: 'bottom' | 'top';

  constructor(rootId: string, position: 'bottom' | 'top') {
    this._rootElem = document.getElementById(rootId) as HTMLElement;
    this._positioin = position;

    if (!this._rootElem) {
      this._rootElem = document.createElement('div');
      this._rootElem.id = rootId;
      this._rootElem.style.position = 'fixed';
      this._rootElem.style[position] = '10%';
      this._rootElem.style.left = '50%';
      this._rootElem.style.transform = 'translateX(-50%)';
      document.body.appendChild(this._rootElem);
    }
  }

  showToast({
    message,
    duration = 3000,
    style,
    contentStyle,
  }: ToastProps): void {
    const id = new Date().getTime();
    const toastContainer = document.createElement('div');
    toastContainer.id = `toast-${id}`;

    this._rootElem.appendChild(toastContainer);

    const root = createRoot(toastContainer);

    root.render(
      <ToastComponent
        message={message}
        style={style}
        contentStyle={contentStyle}
        position={this._positioin}
      />
    );

    toastCount++;
    this.autoCloseToast(id, duration);
  }

  closeToast(id: number): void {
    const elementToRemove = document.getElementById(`toast-${id}`);

    if (elementToRemove) {
      const childDiv = elementToRemove.querySelector('div');
      if (childDiv) {
        childDiv.style.opacity = '0'; // 예시: 투명하게 만들기
      }

      setTimeout(() => {
        this._rootElem.removeChild(elementToRemove);
        toastCount--;
      }, 300);
    }
  }

  autoCloseToast(id: number, duration: number = 3000) {
    setTimeout(() => {
      this.closeToast(id);
    }, duration);
  }
}

export function Toast(props: ToastProps) {
  const rootId = props.position === 'top' ? 'toast-root-top' : 'toast-root';
  const t = new Toaster(rootId, props.position || 'bottom');
  t.showToast(props);
}
