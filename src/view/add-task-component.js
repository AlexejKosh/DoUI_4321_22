import {createElement} from '../framework/render.js'; 

function createAddTaskComponentTemplate() {
  return (
    `<form>
      <h2>Новая задача</h2> 
      <input type="text" placeholder="Название задачи...">
      <button type="submit" class="add-button"><b>+</b> Добавить</button>
    </form> `
  );
}

export default class AddTaskComponent {
  getTemplate() {
    return createAddTaskComponentTemplate();
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