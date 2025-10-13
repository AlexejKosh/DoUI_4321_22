import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskListComponentTemplate(title, status) {
  return (
    `<div class="tasks-column-${status}">
      <div class="task-type">${title}</div>
      <ul class="task-list">
      
      </ul>
    </div>`
  );
}

export default class TaskListComponent extends AbstractComponent {
  constructor({title, status}) {
    super();
    this.title = title;
    this.status = status;
  }

  get template() {
    return createTaskListComponentTemplate(this.title, this.status);
  }
}
