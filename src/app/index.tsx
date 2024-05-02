import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import NewtaskInput from "../components/NewtaskInput";
import TaskListItem from "../components/TaskListItem";
import { useTasks } from "../components/TasksContextProvider";

const EnteryPoint = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tab, setTab] = useState<"All" | "Todo" | "Finished">("All");

  const { getFilteredTasks, numberOfCompletedTasks, numberOfTasks } =
    useTasks();

  const searchResult = getFilteredTasks(tab, searchQuery);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "android" ? "height" : "padding"}
    >
      <Stack.Screen
        options={{
          headerTitle: "Todo",
          headerRight: () => (
            <Text>
              {numberOfCompletedTasks}/ {numberOfTasks}
            </Text>
          ),
          headerBackTitleVisible: false,
          headerSearchBarOptions: {
            hideWhenScrolling: true,
            onChangeText: (e) => setSearchQuery(e.nativeEvent.text),
          },
        }}
      />
      <SafeAreaView style={{ paddingTop: StatusBar.currentHeight, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          <Text
            style={{ color: tab == "All" ? "red" : "black" }}
            onPress={() => setTab("All")}
          >
            All
          </Text>
          <Text
            style={{ color: tab == "Todo" ? "red" : "black" }}
            onPress={() => setTab("Todo")}
          >
            Todo
          </Text>
          <Text
            style={{ color: tab == "Finished" ? "red" : "black" }}
            onPress={() => setTab("Finished")}
          >
            Finished
          </Text>
        </View>

        <FlatList
          contentContainerStyle={{ gap: 5, padding: 10 }}
          data={searchResult}
          renderItem={({ item }) => <TaskListItem task={item} />}
          ListFooterComponent={() => <NewtaskInput />}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default EnteryPoint;

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", flex: 1 },
});
