import React, { useEffect, useState } from "react";
import { Alert } from "antd";

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
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      setTaskList((prev) => prev.filter((item, i) => i !== index));
      setTotalTasks((prev) => prev - 1);
      setTotalHours((prev) => prev - parseInt(taskList[index].time));
    }
  };

  return (
    <>
      <div className="w-full">
        <h2 className="text-center mt-4 text-2xl font-bold underline text-[#7fd1ae]">
          Task Management
        </h2>
        <div className="flex justify-between mx-32 mt-8 gap-10">
          <div className="border-2 border-solid border-black rounded-xl border-[#dadde2] p-4 w-full bg-[#f2ecff]">
            <h5 className="text-md font-bold text-center text-[#324b4c]">
              Total Tasks
            </h5>
            <h1 className="font-bold text-center text-xl text-[#009063]">
              {totalTasks}
            </h1>
          </div>
          <div className="border-2 border-solid border-black rounded-xl border-[#dadde2] p-4 w-full bg-[#f2ecff]">
            <h5 className="text-md font-bold text-center text-[#324b4c]">
              Total Days
            </h5>
            <h1 className="font-bold text-center text-xl text-[#009063]">
              {totalDays.toFixed(2)}
            </h1>
          </div>
          <div className="border-2 border-solid border-black rounded-xl border-[#dadde2] p-4 w-full bg-[#f2ecff]">
            <h5 className="text-md font-bold text-center text-[#324b4c]">
              Total Hours
            </h5>
            <h1 className="font-bold text-center text-xl text-[#009063]">
              {totalHours}
            </h1>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <div className="w-fit self-center text-center">
            <Alert
              className="self-center text-[#009063]"
              message="Note: 8Hrs is equal to 1 Day & Max time for a task is 24Hrs"
              type="warning"
            />
          </div>
        </div>

        <div className="border-2 border-solid border-black mt-8 gap-5 bg-[#E9EDC9] rounded-xl p-8 mx-72">
          <div className="w-full self-center text-center">
            <input
              className="shadow appearance-none border rounded w-2/4 mx-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
              placeholder="Enter Task Title"
              type="text"
              onChange={handleAdd}
              value={task.task}
              name="task"
            />
            <input
              className="shadow block appearance-none border rounded w-1/3 mx-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center mt-4"
              placeholder="Enter Time Required (in Hrs)"
              type="text"
              onChange={handleAdd}
              value={task.time}
              name="time"
            />
            <button
              className="py-1 px-8 border font-bold text-center text-white rounded-md mt-4 bg-[#435B66] hover:bg-[#009063]"
              onClick={hangleAddClick}
            >
              Add
            </button>
          </div>
        </div>

        <div>
          <div className="m-4">
            <h3 className="text-left font-bold text-[#652662]">Todo List</h3>
            <table className="min-w-full border text-center ">
              <thead>
                <tr>
                  <th className="w-[60%] border text-white bg-[#656568] p-2">
                    Task Title
                  </th>
                  <th className="w-[20%] border text-white bg-[#656568] p-2">
                    Time Required(in Hrs)
                  </th>
                  <th className="w-[20%] border text-white bg-[#656568] p-2">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {taskList.map((item, index) => (
                  <tr key={index}>
                    <td className="w-[60%] border p-1">{item.task}</td>
                    <td className="w-[20%] border p-1">{item.time}</td>
                    <td className="w-[20%] border p-1">
                      <button
                        className="text-red-500 hover:text-red-700 font-bolds"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
