import {
  AddIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  ChakraProvider,
  Checkbox,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent } from "react";
import { TTask } from "../../app";

import text from "../../shared/contants/text.json";

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

export const ChakraUITodoWidget = ({
  tasks,
  newTaskValue,
  handleAddTask,
  taskInputError,
  handleTaskInputValueChange,
  handleAskRemoveTask,
  handleMoveTaskDown,
  handleMoveTaskUp,
  handleRemoveTask,
  handleToggleCheckTask,
  isRemoveTaskDialogVisible,
  toggleIsRemoveTaskDialogVisible,
}: Props) => {
  return (
    <ChakraProvider>
      <Box maxWidth={800} width="90%" m="0 auto">
        <Box as="form" onSubmit={handleAddTask} display="flex" mb={6}>
          <FormControl mr={2} isInvalid={!!taskInputError}>
            <Input
              onChange={handleTaskInputValueChange}
              placeholder={text.taskInput.placeholder}
              value={newTaskValue}
            />
            {taskInputError && (
              <FormErrorMessage>{taskInputError}</FormErrorMessage>
            )}
          </FormControl>
          <Tooltip label="Add new task" placement="top" hasArrow>
            <IconButton
              aria-label="Add task"
              icon={<AddIcon />}
              type="submit"
              colorScheme={!!taskInputError ? "red" : "blue"}
            />
          </Tooltip>
        </Box>
        <Box>
          {tasks.map((task, taskIndex) => (
            <Box
              as="li"
              key={taskIndex}
              display="flex"
              justifyContent="space-between"
              mb={4}
              borderRadius="lg"
            >
              <Box display="flex" alignItems="flex-start">
                <Checkbox
                  checked={task.checked}
                  onChange={handleToggleCheckTask(taskIndex)}
                  mr={2}
                />
                <Text as={task.checked ? "del" : "span"} mt={-1}>
                  {task.text}
                </Text>
              </Box>
              <Box display="flex" gap={2}>
                <IconButton
                  aria-label="Up task"
                  icon={<ChevronUpIcon />}
                  onClick={handleMoveTaskUp(taskIndex)}
                  disabled={taskIndex === 0}
                  size="xs"
                />
                <IconButton
                  aria-label="Down task"
                  icon={<ChevronDownIcon />}
                  onClick={handleMoveTaskDown(taskIndex)}
                  disabled={taskIndex === tasks.length - 1}
                  size="xs"
                />
                <IconButton
                  aria-label="Remove task"
                  icon={<DeleteIcon />}
                  onClick={handleAskRemoveTask(taskIndex)}
                  colorScheme="red"
                  size="xs"
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Modal
        onClose={toggleIsRemoveTaskDialogVisible}
        isOpen={isRemoveTaskDialogVisible}
      >
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>{text.removeTaskDialog.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody> {text.removeTaskDialog.description}</ModalBody>
            <ModalFooter>
              <Button mr={2} onClick={toggleIsRemoveTaskDialogVisible}>
                {text.removeTaskDialog.cancelText}
              </Button>
              <Button colorScheme="red" onClick={handleRemoveTask}>
                {text.removeTaskDialog.okText}
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </ChakraProvider>
  );
};
