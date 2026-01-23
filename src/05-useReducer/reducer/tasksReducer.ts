interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

export type TaskAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number };

export const getTasksInitialState = (): TaskState => {
  const todosFromLocalStorage = localStorage.getItem("todos");
  if (todosFromLocalStorage) {
    // ! Cuidado, el objeto puede haber sido manipulado
    return JSON.parse(todosFromLocalStorage);
  }

  return {
    todos: [],
    completed: 0,
    pending: 0,
    length: 0,
  };
};

export const taskReducer = (
  state: TaskState,
  action: TaskAction,
): TaskState => {
  switch (action.type) {
    case "ADD_TODO": {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };

      return {
        ...state,
        length: state.todos.length + 1,
        todos: [...state.todos, newTodo],
        pending: state.pending + 1,
      };
    }
    case "DELETE_TODO": {
      const todoToDelete = state.todos.find(
        (todo) => todo.id === action.payload,
      );

      const todoToDeleteIsCompleted = todoToDelete?.completed;

      const updatedTodos = state.todos.filter(
        (todo) => todo.id !== action.payload,
      );

      return {
        ...state,
        length: updatedTodos.length,
        todos: updatedTodos,
        completed: todoToDeleteIsCompleted
          ? state.completed - 1
          : state.completed,
        pending: todoToDeleteIsCompleted ? state.pending : state.pending - 1,
      };
    }
    case "TOGGLE_TODO": {
      const todoToToggle = state.todos.find(
        (todo) => todo.id === action.payload,
      );

      const todoToToggleIsCompleted = todoToToggle?.completed;

      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      });

      return {
        ...state,
        completed: todoToToggleIsCompleted
          ? state.completed - 1
          : state.completed + 1,
        pending: todoToToggleIsCompleted
          ? state.pending + 1
          : state.pending - 1,
        todos: updatedTodos,
      };
    }
    default:
      return state;
  }
};
