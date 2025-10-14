import { AbstractComponent } from '../framework/view/abstract-component.js';

function createAddTaskComponentTemplate() {
  return (
    `<form>
      <h2>Новая задача</h2> 
      <input type="text" placeholder="Название задачи..." id="add-task"  required>
      <button type="submit" class="add-button"><b>+</b> Добавить</button>
    </form>`
  );
}

export default class AddTaskComponent extends AbstractComponent {
  #handleClick = null;
  
  constructor({onClick}) {
    super()
    this.#handleClick = onClick;
    this.element.addEventListener('submit', this.#clickHandler);
  }

  get template() {
    return createAddTaskComponentTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  }
}