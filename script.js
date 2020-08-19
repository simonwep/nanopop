import {createPopper} from 'https://cdn.jsdelivr.net/npm/nanopop@2.0.0/lib/nanopop.min.mjs';

const reference = document.querySelector('.reference');
const popper = document.querySelector('.popper');

const nanoPop = createPopper(reference, popper);

const posControls = Array.from(document.querySelectorAll('.controls .pos > button'));
const varControls = Array.from(document.querySelectorAll('.controls .var > button'));
const poss = ['top', 'right', 'bottom', 'left'];
const vars = ['start', 'middle', 'end'];

let p = 2, v = 1;
const update = () => {
    posControls.forEach((el, i) => el.classList[i === p ? 'add' : 'remove']('active'));
    varControls.forEach((el, i) => el.classList[i === v ? 'add' : 'remove']('active'));
    nanoPop.update({position: `${poss[p]}-${vars[v]}`});
};

for (let i = 0; i < posControls.length; i++) {
    posControls[i].addEventListener('click', () => (p = i, update()));
}

for (let i = 0; i < varControls.length; i++) {
    varControls[i].addEventListener('click', () => (v = i, update()));
}

requestAnimationFrame(() => {
    update();
    popper.style.visibility = 'visible';
});

window.addEventListener('resize', update);
