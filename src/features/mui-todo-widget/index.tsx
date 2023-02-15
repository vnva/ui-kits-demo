import {
  Add,
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { ChangeEvent, FormEvent } from "react";
import { TTask } from "../../app";

import text from "../../shared/contants/text.json";

import styles from "./styles.module.css";

type Props = {
  tasks: TTask[];
  newTaskValue: string;
  handleAddTask: (e: FormEvent) => void;
  taskInputError: string | null;
  handleTaskInputValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleToggleCheckTask: (taskIndex: number) => VoidFunction;
  handleMoveTaskUp: (taskIndex: number) => VoidFunction;
  handleMoveTaskDown: (taskIndex: number) => VoidFunction;
  handleAskRemoveTask: (taskIndex: number) => VoidFunction;
  toggleIsRemoveTaskDialogVisible: () => void;
  isRemoveTaskDialogVisible: boolean;
  handleRemoveTask: () => void;
};

export const MUITodoWidget = ({
  tasks,
  newTaskValue,
  handleTaskInputValueChange,
  handleToggleCheckTask,
  handleAddTask,
  taskInputError,
  handleMoveTaskUp,
  handleMoveTaskDown,
  handleAskRemoveTask,
  isRemoveTaskDialogVisible,
  toggleIsRemoveTaskDialogVisible,
  handleRemoveTask,
}: Props) => (
  <Box className={styles.wrapper}>
    <form onSubmit={handleAddTask} className={styles.form}>
      <FormControl error={!!taskInputError} fullWidth>
        <InputLabel>Task text</InputLabel>
        <OutlinedInput
          fullWidth
          value={newTaskValue}
          onChange={handleTaskInputValueChange}
          label={text.taskInput.placeholder}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                type="submit"
                color={!!taskInputError ? "error" : "primary"}
                size="large"
              >
                <Add />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
    <ul className={styles.tasksList}>
      {tasks.map((task, taskIndex) => (
        <li className={styles.tasksList__item}>
          <div className={styles.tasksList__item__left}>
            <Checkbox
              size="small"
              checked={task.checked}
              onChange={handleToggleCheckTask(taskIndex)}
            />
            <Typography
              className={styles.tasksList__item__text}
              component={task.checked ? "del" : "span"}
            >
              {task.text}
            </Typography>
          </div>
          <div className={styles.tasksList__item__right}>
            <IconButton
              size="small"
              onClick={handleMoveTaskUp(taskIndex)}
              disabled={taskIndex === 0}
            >
              <KeyboardArrowUp />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleMoveTaskDown(taskIndex)}
              disabled={taskIndex === tasks.length - 1}
            >
              <KeyboardArrowDown />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleAskRemoveTask(taskIndex)}
              color="error"
            >
              <Delete />
            </IconButton>
          </div>
        </li>
      ))}
    </ul>
    <Dialog
      open={isRemoveTaskDialogVisible}
      onClose={toggleIsRemoveTaskDialogVisible}
    >
      <DialogTitle>{text.removeTaskDialog.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {text.removeTaskDialog.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleIsRemoveTaskDialogVisible}>
          {text.removeTaskDialog.cancelText}
        </Button>
        <Button color="error" onClick={handleRemoveTask}>
          {text.removeTaskDialog.okText}
        </Button>
      </DialogActions>
    </Dialog>
  </Box>
);
