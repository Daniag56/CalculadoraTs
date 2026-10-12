import { Subscription, interval, map, startWith } from "rxjs";

export class Cronometro {
  private container: HTMLElement;
  private subscription?: any;
  private tTranscurrido = 0;
  private running = false;

  constructor(id: string) {
    const selector = document.querySelector<HTMLElement>(
      id.startsWith("#") || id.startsWith(".") ? id : `#${id}`,
    );
    if (!selector) {
      throw new Error(`Element not found for selector: ${selector}`);
    }

    this.container = selector;
    this.init();
  }
  private init(): void {
    this.renderClock();
    this.initEventListener();
  }

  private renderClock(): void {
    this.container.innerHTML = `
            <div class="cronometro">
                <div class="display">
                    00:00:00.0
                </div>
                <div class="botones">
                    <button class="start">Iniciar cronómetro</button>
                    <button class="stop">Parar cronómetro</button>
                    <button class="reset">Reiniciar cronómetro</button>
                </div>
            </div>
        `;
  }

  private initEventListener() {
    this.container
      .querySelector(".start")
      ?.addEventListener("click", () => this.start());
    this.container
      .querySelector(".stop")
      ?.addEventListener("click", () => this.stop());
    this.container
      .querySelector(".reset")
      ?.addEventListener("click", () => this.reset());
  }

  private stop(): void {
    this.subscription?.unsubscribe();
    this.running = false;
  }

  private start(): void {
    if (this.running) return;
    this.running = true;
    const startTime = Date.now() - this.tTranscurrido;

    this.subscription = interval(10)
      .pipe(map(() => Date.now() - startTime))
      .subscribe((ms) => {
        this.tTranscurrido = ms;
        this.updateDisplay(ms);
      });
  }

  private reset(): void {
    this.stop();
    this.updateDisplay(0);
    this.subscription = undefined;
  }

  private pad(value: number): string {
    return value.toString().padStart(2, "0");
  }

  private updateDisplay(ms: number) {
    const display = this.container.querySelector(".display");
    if (!display) return;
    const cs = Math.floor((ms % 1000) / 10);
    const s = Math.floor((ms / 1000) % 60);
    const m = Math.floor((ms / 60000) % 60);
    const h = Math.floor(ms / 3600000);
    display.textContent = `${this.pad(h)}:${this.pad(m)}:${this.pad(s)}.${cs}`;
  }
}
