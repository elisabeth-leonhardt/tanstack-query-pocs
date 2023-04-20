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
    onSuccess: (updatedTodo) => {

      queryClient.setQueryData(["todos"], (oldData) => {
        const todoIndex = oldData.map((el) => el.id).indexOf(updatedTodo.id);
        // yeah!! new array methods!!
        return oldData.with(todoIndex, updatedTodo);
      });
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKeys: ["todos"] }),
  });
  function changeTodoStatus(e, id) {
    const updatedTodo = { ...todo, done: e.target.checked };
    changeTodoMutation.mutate(updatedTodo);
  }

  const pic = returnPicture(todo.user);
  return (
    <div className="bg-white text-black rounded-lg grid grid-cols-[auto_1fr_auto] items-center gap-4 py-2 px-4">
      <input type="checkbox" checked={todo.done} onChange={changeTodoStatus} />
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
  await delay(1500);
  const response = await fetch("http://localhost:8000/todos", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: nanoid(),
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
  await delay(1500);
  return fetch("http://localhost:8000/todos").then((res) => res.json());
}
function Mutation() {
  const createTodoMutation = useMutation(createTodo, {
    onSuccess: (newTodo, querydata) => {
      queryClient.setQueryData(["todos"], (oldData) => [...oldData, newTodo]);
    },
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
    createTodoMutation.mutate(todo);
  }

  const todos = useQuery(["todos"], fetchTodos);
  return (
    <div className="min-h-screen max-w-5xl m-[auto] py-10 px-4">
      <Link href="/">
        <Home fill="#fff"></Home>
      </Link>
      <h1 className="text-4xl font-extrabold tanstack-query-gradient py-2 pb-4">
        Mutation with manual cache update (without refetch)
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
      {createTodoMutation.isLoading ? <span className="loader"></span> : null}
    </div>
  );
}

export default Mutation;
