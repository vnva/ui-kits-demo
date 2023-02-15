import {
  DeleteOutlined,
  DownOutlined,
  PlusOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Input, Modal, Tooltip, Typography } from "antd";
import { ChangeEvent, FormEvent } from "react";
import { TTask } from "../../app";

import styles from "./styles.module.css";

const { Text } = Typography;

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

export const AntdTodoWidget = ({
  tasks,
  newTaskValue,
  handleTaskInputValueChange,
  taskInputError,
  handleToggleCheckTask,
  handleAddTask,
  handleMoveTaskUp,
  handleMoveTaskDown,
  handleAskRemoveTask,
  isRemoveTaskDialogVisible,
  toggleIsRemoveTaskDialogVisible,
  handleRemoveTask,
}: Props) => (
  <div className={styles.wrapper}>
    <form onSubmit={handleAddTask} className={styles.form}>
      <Input.Group style={{ display: "flex" }} compact>
        <Input
          status={taskInputError ? "error" : undefined}
          placeholder="Please print task text"
          onChange={handleTaskInputValueChange}
          value={newTaskValue}
          size="large"
        />
        <Tooltip title="Add new task">
          <Button
            className={styles.form__submitBtn}
            htmlType="submit"
            icon={<PlusOutlined />}
            type="primary"
            danger={!!taskInputError}
            size="large"
          />
        </Tooltip>
      </Input.Group>
    </form>
    <ul className={styles.tasksList}>
      {tasks.map((task, taskIndex) => (
        <li className={styles.tasksList__item} key={taskIndex}>
          <div className={styles.tasksList__item__left}>
            <Checkbox
              checked={task.checked}
              onChange={handleToggleCheckTask(taskIndex)}
            />
            <Text delete={task.checked}>{task.text}</Text>
          </div>
          <div className={styles.tasksList__item__right}>
            <Button
              onClick={handleMoveTaskUp(taskIndex)}
              disabled={taskIndex === 0}
              icon={<UpOutlined />}
              size="small"
            />
            <Button
              onClick={handleMoveTaskDown(taskIndex)}
              disabled={taskIndex === tasks.length - 1}
              icon={<DownOutlined />}
              size="small"
            />
            <Button
              onClick={handleAskRemoveTask(taskIndex)}
              icon={<DeleteOutlined />}
              danger
              size="small"
            />
          </div>
        </li>
      ))}
    </ul>
    <Modal
      title="Remove this task?"
      open={isRemoveTaskDialogVisible}
      onCancel={toggleIsRemoveTaskDialogVisible}
      onOk={handleRemoveTask}
      okText="Yes"
      cancelText="No"
      okButtonProps={{ danger: true }}
    >
      Do your really want to remove this task?
    </Modal>
  </div>
);
