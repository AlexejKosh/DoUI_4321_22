import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskComponentTemplate(task) {
  const {title, status} = task;
  return (
    `<div class="task-li ${status}">
      <div class="task__body">
        <p class="task__view">${title}</p>
        <input type="text" class="task__input"/>
      </div>
      <button aria-label="Изменить" class="task__edit" type="button"></button>
    </div>`
  );
}

export default class TaskComponent extends AbstractComponent {
  constructor({task}) {
    super();
    this.task = task;
  }

  get template() {
    return createTaskComponentTemplate(this.task);
  }
}
