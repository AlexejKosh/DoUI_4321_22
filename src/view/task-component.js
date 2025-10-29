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
    this.#afterCreateElement();
  }

  get template() {
    return createTaskComponentTemplate(this.task);
  }

  #afterCreateElement() {
    this.element.dataset.id = this.task.id;
    this.#makeTaskDraggable();
  }

  #makeTaskDraggable() {
    this.element.setAttribute('draggable', true);

    this.element.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', this.task.id);
    });
  }
}
