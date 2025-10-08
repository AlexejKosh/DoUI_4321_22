import {createElement} from '../framework/render.js'; 

function createCleanBinComponentTemplate() {
  return (
    `<button type="button" class="clear-button">
      <b>×</b> Очистить
    </button>`
  );
}

export default class CleanBinComponent {
  getTemplate() {
    return createCleanBinComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}