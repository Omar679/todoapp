import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { Task, useTasks } from "./TasksContextProvider";

export type TaskList = {
  task: Task;
};

const RightActions = ({
  dragAnimatedValue,
  task,
}: {
  dragAnimatedValue: Animated.AnimatedInterpolation<string | number>;
  task: Task;
}) => {
  const { deleteTask } = useTasks();
  return (
    <Animated.View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "crimson",
          paddingHorizontal: 10,
        },
        // animatedStyles,
      ]}
    >
      <MaterialCommunityIcons
        onPress={() => deleteTask(task.id)}
        name="delete"
        size={20}
        color={"dimgrey"}
      />
    </Animated.View>
  );
};

const TaskListItem = ({ task }: TaskList) => {
  const { changeIsFinished } = useTasks();

  return (
    <Swipeable
      renderRightActions={(dragAnimatedValue) => (
        <RightActions dragAnimatedValue={dragAnimatedValue} task={task} />
      )}
    >
      <Pressable
        onPress={() => changeIsFinished(task.id)}
        style={styles.taskContainer}
      >
        <MaterialCommunityIcons
          name={
            task.isFinished
              ? "checkbox-marked-circle-outline"
              : "checkbox-blank-circle-outline"
          }
          size={24}
          color={task.isFinished ? "grey" : "dimgrey"}
        />
        <Text
          style={[
            styles.title,
            {
              textDecorationLine: task.isFinished ? "line-through" : "none",
              color: task.isFinished ? "lightgrey" : "dimgrey",
            },
          ]}
        >
          {task.title}
        </Text>
      </Pressable>
    </Swipeable>
  );
};

export default TaskListItem;

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", flex: 1 },
  taskContainer: {
    padding: 5,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    flex: 1,
  },
  title: { fontSize: 16, color: "dimgray" },
});
