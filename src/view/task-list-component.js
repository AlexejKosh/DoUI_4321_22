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
  constructor({title, status, onTaskDrop}) {
    super();
    this.title = title;
    this.status = status;
    this.#setDropHandler(onTaskDrop);
  }

  get template() {
    return createTaskListComponentTemplate(this.title, this.status);
  }

  #setDropHandler(onTaskDrop) {
    const container = this.element;

    container.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    container.addEventListener('drop', (event) => {
      event.preventDefault();
      const taskID = event.dataTransfer.getData('text/plain');

      const listOfTasks = Array.from(container.querySelector('.task-list'));

      const filteredTasks = listOfTasks.filter((ch) => ch.dataset.id !== taskID);

      const mouseY = event.clientY;
      let insertionId = filteredTasks.length;

      for (let i = 0; i < filteredTasks.length; i++) {
        const rect = filteredTasks[i].getBoundingClientRect();
        const middle = rect.top + rect.height / 2;
        if (mouseY < middle) {
          insertionId = i;
          break;
        }
      }

      onTaskDrop(taskID, this.status, insertionId);
    });
  }
}
