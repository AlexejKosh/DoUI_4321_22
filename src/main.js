import HeaderComponent from './view/header-component.js';
import AddTaskComponent from './view/add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import {render, RenderPosition} from './framework/render.js';
import TasksModel from './model/task-model.js';

const bodyContainer = document.querySelector('.app');
const formContainer = document.querySelector('.new-task-panel');
const tasksBoardContainer = document.querySelector('.task-board');

const tasksModel = new TasksModel();
const tasksBoardPresenter = new TasksBoardPresenter({
  boardContainer: tasksBoardContainer,
  tasksModel,
});

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new AddTaskComponent(), formContainer);

tasksBoardPresenter.init();