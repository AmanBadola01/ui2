"use client";

import React, { useState } from "react";
import { StarToggleIcon, CircleXIcon, TrashIcon, CheckIcon } from "./Icons";

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
  starred: boolean;
}

const initialTodos: TodoItem[] = [
  { id: 1, title: "Meeting with CEO", completed: false, starred: false },
  { id: 2, title: "Pick up kids from school", completed: false, starred: true },
  { id: 3, title: "Shopping with Brother", completed: false, starred: false },
  { id: 4, title: "Review with HR", completed: true, starred: false },
  { id: 5, title: "Going to Dia's School", completed: false, starred: false },
  { id: 6, title: "Check design files", completed: false, starred: true },
  { id: 7, title: "Update File", completed: false, starred: false },
];

export default function TodoView() {
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos);
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const toggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const toggleStar = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, starred: !t.starred } : t))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSave = () => {
    const title = newTaskTitle.trim() || "New Assigned Task";
    setTodos((prev) => [
      { id: Date.now(), title, completed: false, starred: false },
      ...prev,
    ]);
    setNewTaskTitle("");
    setIsAdding(false);
  };

  return (
    <div className="space-y-7">
      {/* Page Title & Add / Save Action Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-[32px] font-bold text-[#202224] leading-none tracking-[-0.11px] font-['Nunito_Sans',sans-serif]">
          {isAdding ? "Add New To-Do" : "To-Do List"}
        </h1>
        {isAdding ? (
          <button
            type="button"
            onClick={handleSave}
            className="px-7 py-2.5 bg-[#4880FF] hover:bg-blue-600 text-white font-bold text-sm rounded-lg shadow-sm shadow-[#4880FF]/25 transition-all active:scale-98"
          >
            Save
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="px-5 py-2.5 bg-[#4880FF] hover:bg-blue-600 text-white font-bold text-sm rounded-lg shadow-sm shadow-[#4880FF]/25 transition-all active:scale-98"
          >
            Add New Task
          </button>
        )}
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {/* New Task Input Card when in Add mode */}
        {isAdding && (
          <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-2xs px-6 py-4 flex items-center transition-all animate-in fade-in">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") setIsAdding(false);
              }}
              placeholder="Write Your task name here"
              autoFocus
              className="w-full max-w-[340px] px-4 py-2.5 rounded-lg border border-[#D5D5D5] bg-[#F5F6FA] text-sm text-[#202224] placeholder-gray-400 focus:outline-none focus:border-[#4880FF] transition-colors"
            />
          </div>
        )}

        {todos.map((todo) => {
          if (todo.completed) {
            // Completed task card (Primary Blue)
            return (
              <div
                key={todo.id}
                className="w-full bg-[#4880FF] text-white rounded-2xl shadow-xs px-6 py-4 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-5 min-w-0">
                  {/* Checked Box */}
                  <button
                    type="button"
                    onClick={() => toggleComplete(todo.id)}
                    aria-label="Mark task as incomplete"
                    className="w-6 h-6 rounded-lg border border-white/60 bg-transparent hover:bg-white/10 flex items-center justify-center shrink-0 transition-colors"
                  >
                    <CheckIcon className="w-3.5 h-3.5 text-white" />
                  </button>

                  {/* Title */}
                  <span className="text-sm font-semibold text-white tracking-[-0.1px] truncate font-['Nunito_Sans',sans-serif]">
                    {todo.title}
                  </span>
                </div>

                {/* Right Action: Trash button */}
                <button
                  type="button"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label="Delete task"
                  className="w-9 h-9 rounded-lg bg-[#5C92FF] hover:bg-[#5087F5] text-white flex items-center justify-center transition-colors active:scale-95 shrink-0"
                >
                  <TrashIcon className="w-4 h-4 text-white" />
                </button>
              </div>
            );
          }

          // Normal task card (White)
          return (
            <div
              key={todo.id}
              className="w-full bg-white rounded-2xl border border-gray-100 shadow-2xs px-6 py-4 flex items-center justify-between transition-all hover:border-gray-200"
            >
              <div className="flex items-center gap-5 min-w-0">
                {/* Unchecked Box */}
                <button
                  type="button"
                  onClick={() => toggleComplete(todo.id)}
                  aria-label="Mark task as complete"
                  className="w-6 h-6 rounded-lg border border-gray-200 bg-white hover:border-gray-400 flex items-center justify-center shrink-0 transition-colors"
                />

                {/* Title */}
                <span className="text-sm font-semibold text-[#202224] tracking-[-0.1px] truncate font-['Nunito_Sans',sans-serif]">
                  {todo.title}
                </span>
              </div>

              {/* Right Action Icons: Star + Delete */}
              <div className="flex items-center gap-4 shrink-0">
                <button
                  type="button"
                  onClick={() => toggleStar(todo.id)}
                  aria-label={todo.starred ? "Unstar task" : "Star task"}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <StarToggleIcon isStarred={todo.starred} className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label="Delete task"
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <CircleXIcon className="w-5 h-5 text-gray-300 hover:text-gray-500 transition-colors" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
