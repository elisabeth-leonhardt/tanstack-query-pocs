import React, { useState } from "react";
import { nanoid } from "nanoid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { delay } from "@/lib/delay";
import Link from "next/link";
import { Home } from "@/components/Icons";
import Image from "next/image";
import eli from "../assets/eli.webp";
import { returnPicture } from "@/components/Todo";

async function updateTodo(todo) {
  await delay(2000);
  const response = await fetch(`http://localhost:8000/todos/${todo.id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: nanoid(),
      user: todo.user,
      task: todo.task,
      done: todo.done,
    }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
}

function Todo({ todo }) {
  const queryClient = useQueryClient();
  const changeTodoMutation = useMutation(updateTodo, {
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData(["todos"]);
      const todoIndex = previousTodos.map((el) => el.id).indexOf(newTodo.id);
      const updatedTodos = previousTodos.with(todoIndex, newTodo);
      queryClient.setQueryData(["todos"], (old) => [...updatedTodos]);
      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
  });
  function changeTodoStatus(e, id) {
    const updatedTodo = { ...todo, done: e.target.checked };
    changeTodoMutation.mutate(updatedTodo);
  }

  const mutationNotLoading =
    "bg-white text-black rounded-lg grid grid-cols-[auto_1fr_auto] items-center gap-4 py-2 px-4";
  const mutationLoading =
    "bg-gray-200 text-black rounded-lg grid grid-cols-[auto_1fr_auto] items-center gap-4 py-2 px-4";
  const pic = returnPicture(todo.user);
  return (
    <div
      className={
        changeTodoMutation.isLoading ? mutationLoading : mutationNotLoading
      }
    >
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(e) => changeTodoStatus(e, todo.id)}
      />
      <p>{todo.task}</p>
      <Image
        src={pic}
        alt="profile picture"
        className="rounded-full"
        height={60}
        with={60}
      ></Image>
    </div>
  );
}

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
    <div className="min-h-screen max-w-5xl m-[auto] py-10 px-4">
      <Link href="/">
        <Home fill="#fff"></Home>
      </Link>
      <h1 className="text-4xl font-extrabold tanstack-query-gradient py-2 pb-4">
        Mutation with optimistic updates
      </h1>
      <form onSubmit={onFormSubmit} className="grid grid-cols-1 gap-4">
        <div className="flex gap-4 items-end">
          <label htmlFor="user" className="text-xl font-bold">
            User:
          </label>
          <input
            type="text"
            className="text-black flex-1"
            name="user"
            id="user"
            onChange={changeTodo}
            value={todo.user}
          />
        </div>
        <div className="flex gap-4 items-end">
          <label htmlFor="task" className="text-xl font-bold">
            Task:
          </label>
          <input
            type="text"
            className="text-black flex-1"
            name="task"
            id="task"
            onChange={changeTodo}
            value={todo.task}
          />
        </div>
        <button type="submit" className="justify-self-end">
          create todo
        </button>
      </form>
      {todos.isLoading ? <span className="loader"></span> : null}
      <div className="grid grid-cols-2 gap-4 pt-8">
        {todos.isSuccess
          ? todos.data.map((todo) => <Todo todo={todo} key={todo.id}></Todo>)
          : null}
      </div>
      {createTodoMutation.isLoading ? (
        <>
          <span className="loader"></span>
          <p>Writing new Todo into database...</p>
        </>
      ) : null}
    </div>
  );
}

export default Mutation;
