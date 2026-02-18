import React, { useEffect, useState } from "react";
import { Alert, Modal } from "antd";

const Home = () => {
  const [task, setTask] = useState({
    task: "",
    time: "",
  });
  const [taskList, setTaskList] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [totalTasks, setTotalTasks] = useState(() => {
    const storedTotalTasks = localStorage.getItem("totalTasks");
    return storedTotalTasks ? JSON.parse(storedTotalTasks) : 0;
  });
  const [totalDays, setTotalDays] = useState(0);
  const [totalHours, setTotalHours] = useState(() => {
    const storedTotalHours = localStorage.getItem("totalHours");
    return storedTotalHours ? JSON.parse(storedTotalHours) : 0;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  useEffect(() => {
    localStorage.setItem("totalTasks", JSON.stringify(totalTasks));
  }, [totalTasks]);

  useEffect(() => {
    localStorage.setItem("totalHours", JSON.stringify(totalHours));
    const totalDaysCalc = totalHours / 8;
    setTotalDays(totalDaysCalc);
  }, [totalHours]);

  const handleAdd = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "task" && value.length > 128) {
      alert("Task title should be less than 128 characters");
      setTask((prev) => ({
        ...prev,
        [name]: "",
      }));
      return;
    }

    if (
      name === "time" &&
      value !== "" &&
      (isNaN(value) || value < 1 || value > 24)
    ) {
      alert("Please enter a valid number between 1 and 24");
      setTask((prev) => ({
        ...prev,
        [name]: "",
      }));
      return;
    }
  };

  console.log(taskList);
  const hangleAddClick = () => {
    if (task.task === "" || task.time === "") {
      alert("Please fill all the fields");
      return;
    }
    setTaskList((prev) => [...prev, task]);

    setTotalHours((prev) => prev + parseInt(task.time));
    setTotalTasks((prev) => prev + 1);
    setTask({
      task: "",
      time: "",
    });
  };

  const handleDelete = (index) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this task?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'No, Keep it',
      centered: true,
      onOk() {
        setTaskList((prev) => prev.filter((item, i) => i !== index));
        setTotalTasks((prev) => prev - 1);
        setTotalHours((prev) => prev - parseInt(taskList[index].time));
      },
    });
  };

  return (
    <>
      <div className="w-full pb-12">
        <h2 className="text-center py-10 text-4xl font-extrabold tracking-tight text-gradient">
          Task Management
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-4 md:mx-32">
          <div className="glass rounded-2xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1">
            <h5 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
              Total Tasks
            </h5>
            <h1 className="text-4xl font-bold text-primary-dark">
              {totalTasks}
            </h1>
          </div>
          <div className="glass rounded-2xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1">
            <h5 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
              Total Days
            </h5>
            <h1 className="text-4xl font-bold text-primary-dark">
              {totalDays.toFixed(2)}
            </h1>
          </div>
          <div className="glass rounded-2xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1">
            <h5 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
              Total Hours
            </h5>
            <h1 className="text-4xl font-bold text-primary-dark">
              {totalHours}
            </h1>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center px-4">
          <div className="w-full md:w-auto max-w-xl">
            <Alert
              className="rounded-xl border-none glass text-primary-dark font-medium"
              message="Note: 8Hrs is equal to 1 Day & Max time for a task is 24Hrs"
              type="warning"
              showIcon
            />
          </div>
        </div>

        <div className="mt-10 glass rounded-3xl p-8 md:p-12 mx-4 md:mx-64">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-full max-w-md">
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Task Title</label>
              <input
                className="w-full glass bg-white/50 border-white/50 rounded-xl py-3 px-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-lg"
                placeholder="What needs to be done?"
                type="text"
                onChange={handleAdd}
                value={task.task}
                name="task"
              />
            </div>
            <div className="w-full max-w-md">
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Time Required (Hrs)</label>
              <input
                className="w-full glass bg-white/50 border-white/50 rounded-xl py-3 px-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-lg"
                placeholder="e.g. 4"
                type="text"
                onChange={handleAdd}
                value={task.time}
                name="time"
              />
            </div>
            <button
              className="w-full max-w-xs py-3.5 px-10 bg-gradient-to-r from-primary-dark to-primary hover:from-primary hover:to-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary-dark/20 transform active:scale-95 transition-all duration-200 mt-2"
              onClick={hangleAddClick}
            >
              Add Task
            </button>
          </div>
        </div>

        <div className="mt-12 mx-4 md:mx-32">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-accent">Todo List</h3>
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-bold">
              {taskList.length} Tasks
            </span>
          </div>
          
          <div className="glass rounded-2xl overflow-hidden shadow-xl">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                    Task Title
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-600 uppercase tracking-wider">
                    Time (Hrs)
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/20">
                {taskList.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center text-gray-400 italic">
                      No tasks added yet. Start by adding one above!
                    </td>
                  </tr>
                ) : (
                  taskList.map((item, index) => (
                    <tr key={index} className="hover:bg-white/30 transition-colors duration-150 group">
                      <td className="px-6 py-4 text-gray-800 font-medium">{item.task}</td>
                      <td className="px-6 py-4 text-center text-gray-600 font-semibold">{item.time}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          className="bg-red-100 text-red-600 hover:bg-red-500 hover:text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-all border border-red-200 shadow-sm"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
