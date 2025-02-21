import React, { useState, useMemo, useCallback } from "react";
import { useTasks } from "./TaskContext";

const TaskManager = () => {
  const { tasks, dispatch } = useTasks();
  const [taskText, setTaskText] = useState("");

  // Memoized calculation of completed tasks
  const completedTasksCount = useMemo(() => {
    console.log("Calculating completed tasks...");
    return tasks.filter((task) => task.completed).length;
  }, [tasks]);

  // useCallback to memoize the addTask function
  const addTask = useCallback(() => {
    if (taskText.trim() !== "") {
      dispatch({ type: "ADD_TASK", payload: taskText });
      setTaskText("");
    }
  }, [taskText, dispatch]);

  // useCallback to memoize the toggleTask function
  const toggleTask = useCallback(
    (taskId) => {
      dispatch({ type: "TOGGLE_TASK", payload: taskId });
    },
    [dispatch]
  );

  return (
    <div>
      <h2>Task Manager</h2>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={addTask}>Add Task</button>

      <h3>Completed Tasks: {completedTasksCount}</h3>

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.text}
            <button onClick={() => toggleTask(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              onClick={() =>
                dispatch({ type: "REMOVE_TASK", payload: task.id })
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
