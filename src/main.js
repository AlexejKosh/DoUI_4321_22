import HeaderComponent from './view/header-component.js';
import AddTaskComponent from './view/add-task-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import TaskListComponent from './view/task-list-component.js';
import TaskComponent from './view/task-component.js';
import {render, RenderPosition} from './framework/render.js';

const bodyContainer = document.querySelector('.app');
const formContainer = document.querySelector('.new-task-panel');
const taskBoardContainer = document.querySelector('.task-board');
const taskBoardComponent = new TaskBoardComponent();

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new AddTaskComponent(), formContainer);
render(taskBoardComponent, taskBoardContainer);

for (let i = 0; i < 4; i++) {
  const taskListComponent = new TaskListComponent();
  render(taskListComponent, taskBoardComponent.getElement());
  const task_list = taskListComponent.getElement().querySelector('.task-list');
  for (let j = 0; j < 3; j++) {
    render(new TaskComponent(), task_list);
  }
}