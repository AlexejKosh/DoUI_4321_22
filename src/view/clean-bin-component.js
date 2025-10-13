import { AbstractComponent } from '../framework/view/abstract-component.js';

function createCleanBinComponentTemplate() {
  return (
    `<button type="button" class="clear-button">
      <b>×</b> Очистить
    </button>`
  );
}

export default class CleanBinComponent extends AbstractComponent {
  get template() {
    return createCleanBinComponentTemplate();
  }
}