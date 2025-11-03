import HeaderComponent from './view/header-component.js';
import AddTaskComponent from './view/add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import {render, RenderPosition} from './framework/render.js';
import TasksModel from './model/task-model.js';
import TasksApiService from './tasks-api-service.js';

const END_POINT = 'https://6908b8792d902d0651b17edb.mockapi.io/'
const bodyContainer = document.querySelector('.app');
const formContainer = document.querySelector('.new-task-panel');
const tasksBoardContainer = document.querySelector('.task-board');

const tasksModel = new TasksModel({
  tasksApiService: new TasksApiService(END_POINT)
});
const tasksBoardPresenter = new TasksBoardPresenter({
  boardContainer: tasksBoardContainer,
  tasksModel,
});

const addTaskComponent = new AddTaskComponent({
  onClick: handleNewTaskButtonClick
});

function handleNewTaskButtonClick() {
  tasksBoardPresenter.createTask();
}

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(addTaskComponent, formContainer);

tasksBoardPresenter.init();