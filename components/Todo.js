import Image from "next/image";
import eli from "../assets/eli.webp";
import rick from "../assets/rick.webp";
import morty from "../assets/morty.webp";
import summer from "../assets/summer.webp";
import beth from "../assets/beth.webp";
import jerry from "../assets/jerry.webp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";

export function returnPicture(name) {
  switch (name) {
    case "rick":
      return rick;
    case "morty":
      return morty;
    case "summer":
      return summer;
    case "beth":
      return beth;
    case "jerry":
      return jerry;
    default:
      return rick;
  }
}

async function updateTodo(todo) {
  await fetch(`http://localhost:8000/todos/${todo.id}`, {
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
}

function Todo({ todo }) {
  const queryClient = useQueryClient();
  const changeTodoMutation = useMutation(updateTodo, {
    onSettled: () => queryClient.invalidateQueries({ queryKeys: ["todos"] }),
  });
  function changeTodoStatus(e, id) {
    const updatedTodo = { ...todo, done: e.target.checked };
    changeTodoMutation.mutate(updatedTodo);
  }

  return (
    <div className="bg-white text-black rounded-lg grid grid-cols-[auto_1fr_auto] items-center gap-4 py-2 px-4">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(e) => changeTodoStatus(e, todo.id)}
      />
      <p>{todo.task}</p>
      <Image
        src={() => returnPicture(todo.user)}
        alt="profile picture"
        className="rounded-full"
        height={60}
        with={60}
      ></Image>
    </div>
  );
}

export default Todo;
