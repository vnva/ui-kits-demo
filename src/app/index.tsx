import { ChangeEvent, FormEvent, useState } from "react";
import { ChakraUITodoWidget } from "../features/chakra-ui-todo-widget";

import { AntdTodoWidget } from "../features/antd-todo-widget";
import { MUITodoWidget } from "../features/mui-todo-widget";
import { Box, Button, ButtonGroup } from "@mui/material";
import "antd/dist/reset.css";

export type TTask = {
  text: string;
  checked: boolean;
};

export const App = () => {
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [newTaskValue, setNewTaskValue] = useState("");
  const [taskInputError, setTaskInputError] = useState<string | null>(null);

  const [isRemoveTaskDialogVisible, setIsRemoveTaskDialogVisible] =
    useState(false);

  const toggleIsRemoveTaskDialogVisible = () =>
    setIsRemoveTaskDialogVisible((p) => !p);

  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null);

  const handleRemoveTask = () => {
    if (currentTaskIndex === null) return;

    setTasks(tasks.filter((_, index) => index !== currentTaskIndex));
    setCurrentTaskIndex(null);
    toggleIsRemoveTaskDialogVisible();
  };

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();

    if (!newTaskValue) {
      setTaskInputError("Please enter values");
      return void 0;
    }

    setTaskInputError(null);

    setTasks((p) => [...p, { text: newTaskValue, checked: false }]);
    setNewTaskValue("");
  };

  const handleTaskInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (taskInputError) setTaskInputError(null);
    setNewTaskValue(e.target.value);
  };

  const handleAskRemoveTask = (taskIndex: number) => () => {
    setCurrentTaskIndex(taskIndex);
    toggleIsRemoveTaskDialogVisible();
  };

  const handleMoveTaskUp = (taskIndex: number) => () => {
    if (taskIndex === 0) return;

    const tasksCopy = Array.from(tasks);
    [tasksCopy[taskIndex - 1], tasksCopy[taskIndex]] = [
      tasksCopy[taskIndex],
      tasksCopy[taskIndex - 1],
    ];

    setTasks(tasksCopy);
  };

  const handleMoveTaskDown = (taskIndex: number) => () => {
    if (taskIndex === tasks.length - 1) return;

    const tasksCopy = Array.from(tasks);
    [tasksCopy[taskIndex + 1], tasksCopy[taskIndex]] = [
      tasksCopy[taskIndex],
      tasksCopy[taskIndex + 1],
    ];

    setTasks(tasksCopy);
  };

  const handleToggleCheckTask = (taskIndex: number) => () => {
    const tasksCopy = tasks.slice();

    tasksCopy[taskIndex].checked = !tasksCopy[taskIndex].checked;
    setTasks(tasksCopy);
  };

  const tabs = ["chakra", "antd", "mui"] as const;
  const [currentTab, setCurrentTab] = useState<typeof tabs[number]>("antd");

  return (
    <>
      <Box display="flex" justifyContent="center" mb={5} pt={5}>
        <ButtonGroup>
          <Button
            variant={currentTab === "antd" ? "contained" : "outlined"}
            onClick={() => setCurrentTab("antd")}
          >
            Ant Design
          </Button>
          <Button
            variant={currentTab === "chakra" ? "contained" : "outlined"}
            onClick={() => setCurrentTab("chakra")}
          >
            Chakra UI
          </Button>
          <Button
            variant={currentTab === "mui" ? "contained" : "outlined"}
            onClick={() => setCurrentTab("mui")}
          >
            Material UI
          </Button>
        </ButtonGroup>
      </Box>
      {currentTab === "chakra" && (
        <ChakraUITodoWidget
          newTaskValue={newTaskValue}
          handleAddTask={handleAddTask}
          handleAskRemoveTask={handleAskRemoveTask}
          handleMoveTaskDown={handleMoveTaskDown}
          handleMoveTaskUp={handleMoveTaskUp}
          handleRemoveTask={handleRemoveTask}
          handleTaskInputValueChange={handleTaskInputValueChange}
          handleToggleCheckTask={handleToggleCheckTask}
          isRemoveTaskDialogVisible={isRemoveTaskDialogVisible}
          taskInputError={taskInputError}
          tasks={tasks}
          toggleIsRemoveTaskDialogVisible={toggleIsRemoveTaskDialogVisible}
        />
      )}
      {currentTab === "antd" && (
        <AntdTodoWidget
          newTaskValue={newTaskValue}
          handleAddTask={handleAddTask}
          handleAskRemoveTask={handleAskRemoveTask}
          handleMoveTaskDown={handleMoveTaskDown}
          handleMoveTaskUp={handleMoveTaskUp}
          handleRemoveTask={handleRemoveTask}
          handleTaskInputValueChange={handleTaskInputValueChange}
          handleToggleCheckTask={handleToggleCheckTask}
          isRemoveTaskDialogVisible={isRemoveTaskDialogVisible}
          taskInputError={taskInputError}
          tasks={tasks}
          toggleIsRemoveTaskDialogVisible={toggleIsRemoveTaskDialogVisible}
        />
      )}
      {currentTab === "mui" && (
        <MUITodoWidget
          newTaskValue={newTaskValue}
          handleAddTask={handleAddTask}
          handleAskRemoveTask={handleAskRemoveTask}
          handleMoveTaskDown={handleMoveTaskDown}
          handleMoveTaskUp={handleMoveTaskUp}
          handleRemoveTask={handleRemoveTask}
          handleTaskInputValueChange={handleTaskInputValueChange}
          handleToggleCheckTask={handleToggleCheckTask}
          isRemoveTaskDialogVisible={isRemoveTaskDialogVisible}
          taskInputError={taskInputError}
          tasks={tasks}
          toggleIsRemoveTaskDialogVisible={toggleIsRemoveTaskDialogVisible}
        />
      )}
    </>
  );
};
