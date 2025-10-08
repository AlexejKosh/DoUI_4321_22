import TaskBoardComponent from '../view/task-board-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import CleanBinComponent from '../view/clean-bin-component.js';
import { render } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';

export default class TaskBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new TaskBoardComponent();

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    const boardTasks = this.#tasksModel.getTasks();

    render(this.#tasksBoardComponent, this.#boardContainer);

    for (const status of Object.values(Status)) {
      const taskListComponent = new TaskListComponent({title: StatusLabel[status], status});
      render(taskListComponent, this.#tasksBoardComponent.getElement());
      
      for (const task of boardTasks.filter(t => t.status === status)) {
        render(new TaskComponent({task}), taskListComponent.getElement().querySelector('.task-list'));
      }
      if (status==Status.BIN) {
        render(new CleanBinComponent, taskListComponent.getElement().querySelector('.task-list'))
      }
    }
  }
}
