import { generateID } from '../utils.js';
import Observable from '../framework/observable.js';
import { Status, UpdateType, UserAction } from '../const.js';

export default class TaskModel extends Observable {
  #tasksApiService = null;
  #boardTasks = [];

  constructor({tasksApiService}) {
    super();
    this.#tasksApiService = tasksApiService;
  }

  async init() {
    try {
      const tasks = await this.#tasksApiService.tasks;
      this.#boardTasks = tasks;
    } catch(err) {
      this.#boardTasks = [];
    }
    this._notify(UpdateType.INIT);
  }

  get tasks() {
    return this.#boardTasks;
  }

  getTasksByStatus(status) {
    return this.#boardTasks.filter(task => task.status === status);
  }

  async addTask(title) {
    const newTask = {
      title,
      status: 'backlog',
      id: generateID()
    };
    try {
      const createdTask = await this.#tasksApiService.addTask(newTask);
      this.#boardTasks.push(createdTask);
      this._notify(UserAction.ADD_TASK, createdTask);
      return createdTask;
    } catch (err) {
      console.error('Ошибка при добавлении задачи на сервер:', err);
      throw err;
    }
  }

  async updateTaskStatus(taskId, newStatus, insertionIndex) {
    const idx = this.#boardTasks.findIndex(task => task.id === taskId);
    if (idx === -1) return;

    const [task] = this.#boardTasks.splice(idx, 1);
    const previousStatus = task.status;
    task.status = newStatus;

    let count = 0;
    let insertAt = this.#boardTasks.length;
    for (let i = 0; i < this.#boardTasks.length; i++) {
      if (this.#boardTasks[i].status === newStatus) {
        if (count === insertionIndex) {
          insertAt = i;
          break;
        }
        count++;
      }
    }
    this.#boardTasks.splice(insertAt, 0, task);
    this._notify(UserAction.UPDATE_TASK, task);

    try {
      const updatedTask = await this.#tasksApiService.updateTask(task);
      Object.assign(task, updatedTask);
    } catch (err) {
      console.error('Ошибка при обновлении статуса задачи на сервере:', err);
      task.status = previousStatus;
    }
  }


  async clearBin() {
    const binTasks = this.#boardTasks.filter(task => task.status === 'bin');

    try {
      await Promise.all(binTasks.map(task => this.#tasksApiService.deleteTask(task.id)));

      this.#boardTasks = this.#boardTasks.filter(task => task.status !== 'bin');
      this._notify(UserAction.DELETE_TASK, { status: 'bin' });
    } catch (err) {
      console.error('Ошибка при удалении задач из корзины на сервере:', err);
      throw err;
    }
  }
}
