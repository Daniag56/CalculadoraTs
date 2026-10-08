import { interval, map } from "rxjs";
import { format } from "date-fns";
export class Reloj {
  private container: HTMLElement;
  private clock = interval(1000).pipe(
    map(() => format(new Date(), 'HH:mm:ss'))
  );  

  constructor(id: string) {
    const selector = id.startsWith('#') || id.startsWith('.') ? id : `#${id}`;

    const elemento = document.querySelector<HTMLElement>(selector);
    if (!elemento) {
      throw new Error(`No se encontró un elemento con el selector "${selector}".`);
    }
    this.container = elemento;
    this.init();
  }

  private init() {
    this.renderReloj();
  }

  private renderReloj() {
    this.clock.subscribe(value => this.container.innerHTML = value)
  }
}

