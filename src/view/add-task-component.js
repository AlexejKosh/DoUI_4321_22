import { AbstractComponent } from '../framework/view/abstract-component.js';

function createAddTaskComponentTemplate() {
  return (
    `<form>
      <h2>Новая задача</h2> 
      <input type="text" placeholder="Название задачи...">
      <button type="submit" class="add-button"><b>+</b> Добавить</button>
    </form>`
  );
}

export default class AddTaskComponent extends AbstractComponent {
  get template() {
    return createAddTaskComponentTemplate();
  }
}