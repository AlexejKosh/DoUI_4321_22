import { AbstractComponent } from '../framework/view/abstract-component.js';

function createCleanBinComponentTemplate() {
  return (
    `<button type="button" class="clear-button">
      <b>×</b> Очистить
    </button>`
  );
}

export default class CleanBinComponent extends AbstractComponent {
  #handleClick = null;

  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createCleanBinComponentTemplate();
  }

  disableButton() {
    this.element.setAttribute('disabled', 'true');
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  }

  disableButton() {
    this.element.disabled = true;
  }
}
