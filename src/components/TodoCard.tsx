import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteTodo, reverseCompleted } from "../redux/todoSlice";

export default function TodoCard({ todos }) {
  const dispatch = useDispatch();

  const { id, text } = todos;

  const completed = useSelector(
    (state) =>
      state.todoSlice.find((todo) => todo.id === id)?.completed || false
  );

  const [isCompleted, setIsCompleted] = useState(completed);

  const handleCompletionChange = () => {
    setIsCompleted(!isCompleted);
    dispatch(reverseCompleted(id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="p-5 rounded-lg">
      <label className="label cursor-pointer grid grid-cols-[0.1fr_5fr_1fr] items-center justify-items-center gap-10">
        <button
          type="button"
          className={`btn btn-primary text-white ${
            isCompleted ? "btn-checked" : ""
          }`}
          onClick={handleCompletionChange}
        >
          {isCompleted ? "Completed" : "Uncompleted"}
        </button>
        <p className="text-xl">{text}</p>
        <button
          onClick={handleDelete}
          className="btn bg-primary border-0 text-white "
        >
          delete
        </button>
      </label>
    </div>
  );
}
