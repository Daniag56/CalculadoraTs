import './style.css'
import { Calculator } from './calculator';
import { Reloj } from './reloj';
import { Cronometro } from './cronometro';

document.addEventListener('DOMContentLoaded', () => {
    const calc1 = new Calculator('calculadora1');
    const calc2 = new Calculator('calculadora2');
    const reloj = new Reloj('reloj');
    const cronometro = new Cronometro('cronometro');
});