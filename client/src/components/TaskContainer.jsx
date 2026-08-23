import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function TaskContainer({
  tasks,
  onDelete,
  editId,
  onStartEdit,
  onEdit,
  onCancelEdit,
  formMode,
  onSubmit,
  onCancelAdd,
  toggle
}) {
  return (
    <div className="flex flex-col items-center pt-4 w-full">
      {formMode === null && (
        <div>
          <TaskForm mode="add" onSubmit={onSubmit} onCancel={onCancelAdd} toggle={toggle}/>
        </div>
      )}
      {formMode === "add" && (
        <div>
          <TaskForm mode="add" onSubmit={onSubmit} onCancel={onCancelAdd} />
        </div>
      )}
      {formMode === "edit" && (
        <div>
          <TaskForm
            mode="edit"
            intialValue={tasks.find((task) => task.id === editId)?.task || ""}
            intialDate={tasks.find((task) => task.id === editId)?.date || ""}
            intialTime={tasks.find((task) => task.id === editId)?.reminder || ""}
            onSubmit={(text, date, reminder) => onEdit(editId, text,date, reminder)}
            onCancel={onCancelEdit}
            toggle={toggle}
          />
        </div>
      )}
      <TaskList  tasks={tasks} onDelete={onDelete} onStartEdit={onStartEdit} toggle={toggle} />
    </div>
  );
}

export default TaskContainer;
