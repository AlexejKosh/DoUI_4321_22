import { AbstractComponent } from '../framework/view/abstract-component.js';

function createEmptyTaskComponentTemplate(status) {
  return (
    `<div class="empty-task ${status}">
      <div class="task__body">
        <p class="task__view">Перетащите карточку</p>
      </div>
    </div>`
  );
}

export default class EmptyTaskComponent extends AbstractComponent {
  constructor({status}) {
    super();
    this.status = status;
  }

  get template() {
    return createEmptyTaskComponentTemplate(this.status);
  }
}