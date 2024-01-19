import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteTodo, reverseCompleted } from "../redux/todoSlice";

export default function TodoCard({ todo }) {
  const dispatch = useDispatch();

  const { id, text } = todo;

  const completed = useSelector(
    (state) =>
      state.todoSlice.find((todo) => todo.id === id)?.completed || false
  );

  const [checked, setChecked] = useState(completed);

  const handleCheckboxClick = () => {
    setChecked(!checked);
    dispatch(reverseCompleted(id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="p-5 rounded-lg">
      <label className="label cursor-pointer grid grid-cols-[0.1fr_5fr_1fr] items-center justify-items-center gap-10">
        <input
          type="checkbox"
          className="checkbox checkbox-primary checkbox-lg"
          checked={checked}
          onChange={handleCheckboxClick}
        />
        <p className="text-xl">{text}</p>
        <button onClick={handleDelete} className="btn bg-primary border-0">
          delete
        </button>
      </label>
    </div>
  );
}
