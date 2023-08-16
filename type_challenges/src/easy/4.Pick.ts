interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, "title" | "completed">;
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

type Copy<T> = {
  [K in keyof T]: T[K];
};

type Case1 = Copy<{ a: string; b: string }>;

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
