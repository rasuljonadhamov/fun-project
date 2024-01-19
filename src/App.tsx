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
     
     if (input.trim().length) {
        const commandIndex = useCommands(input.toLowerCase());
        
        console.log("ishladi");
      if (commandIndex !== -1) {
        console.log(25, handleCommand(commandIndex));

        return;
      }

      dispatch(addTodo({ id: Date.now(), text: input, completed: false }));
      setInput("");
      speak(`New todo added: ${input}`);
    } else {
      console.log("Please enter a valid todo item.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCommand = (commandIndex: number) => {
    let text: string, id: number, index: number;

    if (commandIndex !== -1) {
      switch (commandIndex) {
        case 0:
          text = transcript.slice(transcript.indexOf("do") + 1).trim();
          dispatch(addTodo({ id: Date.now(), text, completed: false }));
          speak(`New todo added: ${text}`);
          break;
        case 1:
          id = transcript.slice(transcript.indexOf("do") + 1).trim();
          dispatch(deleteTodo(id));
          break;
        case 2:
          text = transcript
            .slice(transcript.indexOf("as"), transcript.indexOf("u"))
            .trim();
          index = todos.findIndex((t: todo) => t.text === text);
          if (index !== -1 && todos[index].completed) {
            dispatch(reverseCompleted(todos[index].id));
          }
          break;
        case 3:
          text = transcript
            .slice(transcript.indexOf("as"), transcript.indexOf("c"))
            .trim();
          index = todos.findIndex((t: todo) => t.text === text);
          if (index !== -1 && !todos[index].completed) {
            dispatch(reverseCompleted(todos[index].id));
          }
          break;
        default:
          break;
      }
    } else {
      speak("Invalid command. Please try again.");
      setInput("");
    }
  };

  useEffect(() => {
    if (transcript && !isListening) {
      setInput((prevInput) => `${prevInput} ${transcript}`);
      const commandIndex = useCommands(transcript.toLowerCase());
      handleCommand(commandIndex);
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
        <form onSubmit={handleSubmit}>
          <div className="mt-5 w-full relative">
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
          </div>
        </form>
        <div className="flex flex-col gap-5 mt-5">
          {todos.map((todo: todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
      <div className="pl-7">
        <h1 className="ml-10 mt-5 text-2xl">Commands for robot</h1>
        <ol className="list-decimal ml-5">
          <li className="">
            <b>Create to-do </b>
          </li>
          <li className="text-[1.15rem]">
            <b>Delete to-do </b>
          </li>
        </ol>
      </div>
    </main>
  );
};

export default App;
