import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TasksContextProvider from "../components/TasksContextProvider";
import Animation from "../animation/animation";

export default function RootLayout() {
  return (
    <TasksContextProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack />
       
      </GestureHandlerRootView>
    </TasksContextProvider>
  );
}
