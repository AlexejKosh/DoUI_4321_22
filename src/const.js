const Status = {
  BACKLOG: `backlog`,
  PROCESSING: `processing`,
  DONE: `done`,
  BIN: `bin`
};

const StatusLabel = {
    [Status.BACKLOG]: 'Бэклог',
    [Status.PROCESSING]: `В процессе`,
    [Status.DONE]: `Готово`,
    [Status.BIN]: `Корзина`
}

const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK'
};

const UpdateType = {
  PATCH: 'PATCH',
  MAJOR: 'MAJOR',
  MINOR: 'MINOR',
  INIT: 'INIT'
};

export {Status, StatusLabel, UserAction, UpdateType};