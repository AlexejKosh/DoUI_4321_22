import TaskBoardComponent from '../view/task-board-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import EmptyTaskComponent from '../view/empty-task-component.js';
import CleanBinComponent from '../view/clean-bin-component.js';
import LoadingViewComponent from '../view/loading-view-component.js';
import { render } from '../framework/render.js';
import { Status, StatusLabel, UserAction } from '../const.js';

export default class TaskBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;

  #tasksBoardComponent = new TaskBoardComponent();

  constructor({boardContainer, tasksModel}) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;

    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  async init() {
    render(this.#tasksBoardComponent, this.#boardContainer);

    const loadingComponent = new LoadingViewComponent();
    render(loadingComponent, this.#tasksBoardComponent.element);

    try {
      await this.#tasksModel.init();
    } finally {
      if (loadingComponent.element && loadingComponent.element.parentNode) {
        loadingComponent.element.remove();
        loadingComponent.removeElement();
      }
    }

    this.#clearBoard();
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
      onClick: async () => {
        try {
          await this.#tasksModel.clearBin();
          cleanBinComponent.disableButton();
        } catch (err) {
          console.error('Ошибка при очистке корзины:', err);
        }
      }
    });

    render(cleanBinComponent, container);

    if (this.#tasksModel.getTasksByStatus('bin').length === 0) {
      cleanBinComponent.disableButton();
    }
  }

  #renderTasksList(status, container) {

    const taskListComponent = new TaskListComponent({title: StatusLabel[status], status: status, onTaskDrop:this.#handleTaskDrop.bind(this)});
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

  async #handleTaskDrop(taskId, newStatus, insertionIndex) {
    try {
      await this.#tasksModel.updateTaskStatus(taskId, newStatus, insertionIndex);
    } catch (err) {
      console.error('Ошибка при обновлении статуса задачи:', err);
    }
  }

  async createTask() {
    const taskTitle = document.querySelector('#add-task').value.trim();
    if (!taskTitle) {
      return;
    }
    try {
      await this.#tasksModel.addTask(taskTitle);
      document.querySelector('#add-task').value = '';
    } catch (err) {
      console.error('Ощибка при создании задачи:', err)
    }
  }

  get tasks() {
    return this.#tasksModel.tasks;
  }

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = '';
  }

  #handleModelChange(event, payload) {
    switch (event) {
      case UserAction.ADD_TASK:
      case UserAction.UPDATE_TASK:
      case UserAction.DELETE_TASK:
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  }
}
