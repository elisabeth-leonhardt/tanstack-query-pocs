import React, { useState } from "react";
import { nanoid } from "nanoid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { delay } from "@/lib/delay";

async function createTodo(todo) {
  // these delays are only for demonstration purposes!!
  await delay(3000);
  const response = await fetch("http://localhost:8000/todos", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: todo.id,
      user: todo.user,
      task: todo.task,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
}

async function fetchTodos() {
  await delay(3000);
  return fetch("http://localhost:8000/todos").then((res) => res.json());
}
function Mutation() {
  const createTodoMutation = useMutation(createTodo, {
    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(["todos"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["todos"], (old) => [...old, newTodo]);

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
      alert("error!");
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
  const queryClient = useQueryClient();
  const [todo, setTodo] = useState({ user: "", task: "" });
  function changeTodo(e) {
    const newObject = {};
    newObject[e.target.name] = e.target.value;
    setTodo({ ...todo, ...newObject });
  }

  function onFormSubmit(e) {
    e.preventDefault();
    // id has to be assigned here for optimistic update to work
    createTodoMutation.mutate({ ...todo, id: nanoid() });
  }

  const todos = useQuery(["todos"], fetchTodos);
  return (
    <div>
      Mutation with Optimistic Updates
      <form onSubmit={onFormSubmit}>
        <label htmlFor="user">User</label>
        <input
          type="text"
          className="text-black"
          name="user"
          id="user"
          onChange={changeTodo}
          value={todo.user}
        />
        <label htmlFor="">Task</label>
        <input
          type="text"
          className="text-black"
          name="task"
          id="task"
          onChange={changeTodo}
          value={todo.task}
        />
        <button type="submit">create todo</button>
      </form>
      {todos.isLoading ? <p>Loading Todos....</p> : null}
      {todos.isSuccess
        ? todos.data.map((todo) => <p key={todo.id}>{todo.task}</p>)
        : null}
      {createTodoMutation.isLoading ? (
        <p>Writing new Todo into database...</p>
      ) : null}
    </div>
  );
}

export default Mutation;
