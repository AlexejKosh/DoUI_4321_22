import {createElement} from '../framework/render.js'; 

function createTaskListComponentTemplate(title, status) {
  return (
    `<div class="tasks-column-${status}">
      <div class="task-type">${title}</div>
      <ul class="task-list">
      
      </ul>
    </div>`
  );
}

export default class TaskListComponent {
  constructor({title, status}) {
    this.title = title;
    this.status = status;
  }

  getTemplate() {
    return createTaskListComponentTemplate(this.title, this.status);
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