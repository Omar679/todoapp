import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { Task } from "../app";
import { useTasks } from "./TasksContextProvider";

type NewTaskInput = {
 
};

const NewtaskInput = () => {
  const [newTask, setNewTask] = useState("");
  const {addTask} = useTasks()

  return (
    <View style={styles.taskContainer}>
      <MaterialCommunityIcons
        name="checkbox-blank-circle-outline"
        size={24}
        color="dimgrey"
      />
      <TextInput
        placeholder=" Enter your TODO "
        style={styles.title}
        value={newTask}
        onChangeText={setNewTask}
        onEndEditing={() => {
          if (newTask == "") {
            return;
          }
          addTask(newTask)
          setNewTask("");
        }}
      />
    </View>
  );
};

export default NewtaskInput;

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: "#fff", flex: 1 },
  taskContainer: {
    padding: 5,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  title: { fontSize: 16, color: "dimgray" },
});
