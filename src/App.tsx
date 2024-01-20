import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoCard from "./components/TodoCard";
import { todo } from "./types/type";
import { addTodo, deleteTodo, reverseCompleted } from "./redux/todoSlice";
import useSpeechRecognition from "./hooks/useSpeechRecognition";
import useCommands from "./hooks/useCommands";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const todos = useSelector((state: { todoSlice: todo[] }) => state.todoSlice);
  const dispatch = useDispatch();
  const [input, setInput] = useState<string>("");
  const { start, transcript, isListening } = useSpeechRecognition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = input.trim();

    // Check if the input starts with a specific command
    if (text.toLowerCase().startsWith("create to-do")) {
      const todoText = text.slice("create to-do".length).trim();

      if (todoText.length > 0) {
        dispatch(
          addTodo({
            id: Date.now(),
            text: todoText,
            completed: false,
          })
        );
        setInput("");
        speak(`New todo added: ${todoText}`);
      } else {
        alert("Please enter a valid todo item.");
      }
    } else {
      alert("Invalid command. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (transcript && !isListening) {
      setInput((prevInput) => `${prevInput} ${transcript}`);
    }
  }, [transcript, isListening]);

  const speak = (text: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  return (
    <main className="bg-gray-200 grid grid-cols-[1fr_2fr_1fr]">
      <div className="min-h-screen bg-gray-200"></div>
      <div className="min-h-screen bg-gray-200">
        <form onSubmit={handleSubmit} className="mt-5 w-full relative">
          <input
            type="text"
            value={input}
            className="bg-white w-full input-md"
            onChange={handleInputChange}
          />

          <button
            type="submit"
            className="w-full mt-12 btn btn-square bg-primary border-0  p-3 top-0 right-0"
          >
            Add To Do
          </button>
        </form>
        <div className="flex flex-col gap-5 mt-5">
          {todos.map((todo: todo) => (
            <TodoCard key={todo.id} todos={todo} />
          ))}
        </div>
      </div>
      <div className="pl-7">
        <h1 className="ml-10 mt-5 text-2xl">Commands for robot</h1>
        <ol className="list-decimal ml-5">
          <li className="">
            <b>Create to-do </b>
          </li>
        </ol>
      </div>
    </main>
  );
};

export default App;
