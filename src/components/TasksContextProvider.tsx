import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import dummyData from "../data/dummyData";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export type Task = {
  id: string;
  title: string;
  isFinished: boolean;
};

type TasksContext = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  changeIsFinished: (id: string) => void;
  deleteTask: (id: string) => void;
  getFilteredTasks: (tab: string, searchQuery: string) => void;
  addTask: (title: string) => Task | undefined;
  numberOfCompletedTasks: number;
  numberOfTasks: number;
};

const TasksContext = createContext<TasksContext>({
  tasks: [],
  setTasks: () => {},
  changeIsFinished: () => {},
  deleteTask: () => {},
  getFilteredTasks: () => [],
  addTask: () => undefined,
  numberOfCompletedTasks: 0,
  numberOfTasks: 0,
});

const TasksContextProvider = ({ children }: PropsWithChildren) => {
  const [tasks, setTasks] = useState<Task[]>(dummyData);
  const [isLoaded, setIsLoaded] = useState(false);

  const numberOfCompletedTasks = tasks.length;
  const numberOfTasks = tasks.filter((x) => x.isFinished).length;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [tasks]);

  const saveData = async () => {
    if (!isLoaded) {
      // If data wasnt loaded yet Trying to store the data might override it
      return;
    }
    try {
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem("tasks", jsonValue);
    } catch (e) {
      // saving error
      Alert.alert("Error Storing Data");
    }
  };

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("tasks");
      jsonValue != null && JSON.parse(jsonValue);
      if (jsonValue) {
        const loadedTasks = JSON.parse(jsonValue);
        setTasks(loadedTasks);
      }
    } catch (e) {
      // error reading value
      Alert.alert("Error Loading Data");
    } finally {
      setIsLoaded(true);
    }
  };

  const changeIsFinished = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id !== id ? task : { ...task, isFinished: !task.isFinished }
      )
    );
  };

  const addTask = (title: string) => {
    const newTask: Task = { title, isFinished: false, id: uuidv4() };
    setTasks((currentTasks) => [...currentTasks, newTask]);
    return newTask;
  };

  const deleteTask = (id: string) =>
    setTasks((currentTasks) => currentTasks.filter((t) => t.id !== id));

  const getFilteredTasks = (tab: string, searchQuery: string) => {
    return tasks.filter((task) => {
      if (task.isFinished && tab === "Todo") {
        return false;
      }
      if (!task.isFinished && tab == "Finished") {
        return false;
      }

      if (!searchQuery) {
        return true;
      }

      return task.title
        .toLowerCase()
        .trim()
        .includes(searchQuery.trim().toLowerCase());
    });
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        changeIsFinished,
        deleteTask,
        getFilteredTasks,
        addTask,
        numberOfCompletedTasks,
        numberOfTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContextProvider;

export const useTasks = () => useContext(TasksContext);
