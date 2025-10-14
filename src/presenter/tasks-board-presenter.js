import TaskBoardComponent from '../view/task-board-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import EmptyTaskComponent from '../view/empty-task-component.js';
import CleanBinComponent from '../view/clean-bin-component.js';
import { render } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';

export default class TaskBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;

  #tasksBoardComponent = new TaskBoardComponent();

  #boardTasks = [];

  constructor({boardContainer, tasksModel}) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;

    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
    this.#boardTasks = [...this.#tasksModel.tasks];
    this.#renderBoard();
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent({task});
    render(taskComponent, container);
  }

  #renderEmptyTask(container, status) {
    const emptyTaskComponent = new EmptyTaskComponent({status});
    render(emptyTaskComponent, container);
  }

#renderCleanBinButton(container) {
  const cleanBinComponent = new CleanBinComponent({
    onClick: () => {
      this.#tasksModel.clearBin();
      cleanBinComponent.disableButton();
    }
  });

  render(cleanBinComponent, container);

  if (this.#tasksModel.getTasksByStatus('bin').length === 0) {
    cleanBinComponent.disableButton();
  }
}

  #renderTasksList(status, container) {
    const taskListComponent = new TaskListComponent({title: StatusLabel[status], status});
    render(taskListComponent, container);

    const taskListContainer = taskListComponent.element.querySelector('.task-list');
    const filteredTasks = this.tasks.filter((t) => t.status === status);

    if (filteredTasks.length === 0) {
      this.#renderEmptyTask(taskListContainer, status);
    } else {
      for (const task of filteredTasks) {
        this.#renderTask(task, taskListContainer);
      }
    }

    if (status === Status.BIN) {
      this.#renderCleanBinButton(taskListContainer);
    }
  }

  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);

    for (const status of Object.values(Status)) {
      this.#renderTasksList(status, this.#tasksBoardComponent.element);
    }
  }

  createTask() {
    const taskTitle = document.querySelector('#add-task').value.trim();
    if (!taskTitle) {
      return;
    }

    this.#tasksModel.addTask(taskTitle);

    document.querySelector('#add-task').value = '';
  }

  get tasks() {
    return this.#tasksModel.tasks;
  }

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = '';
  }

  #handleModelChange() {
    this.#clearBoard();
    this.#renderBoard();
  }
}
