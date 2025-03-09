import React from "react";

const YourTasksCom = () => {
  const tempTasks = [
    {
      heading: "Task 1",
      description: "Description for task 1",
      startTime: "2025-03-10 09:00:00 AM",
      endTime: "2025-03-10 10:00:00 AM",
      status: "todo",
    },
    {
      heading: "Task 2",
      description: "Description for task 2",
      startTime: "2025-03-10 10:15:00 AM",
      endTime: "2025-03-10 11:00:00 AM",
      status: "progress",
    },
    {
      heading: "Task 3",
      description: "Description for task 3",
      startTime: "2025-03-10 11:30:00 AM",
      endTime: "2025-03-10 12:15:00 PM",
      status: "pending",
    },
    {
      heading: "Task 4",
      description: "Description for task 4",
      startTime: "2025-03-10 01:00:00 PM",
      endTime: "2025-03-10 02:00:00 PM",
      status: "completed",
    },
    {
      heading: "Task 5",
      description: "Description for task 5",
      startTime: "2025-03-10 02:30:00 PM",
      endTime: "2025-03-10 03:30:00 PM",
      status: "todo",
    },
    {
      heading: "Task 6",
      description: "Description for task 6",
      startTime: "2025-03-10 04:00:00 PM",
      endTime: "2025-03-10 05:00:00 PM",
      status: "progress",
    },
    {
      heading: "Task 7",
      description: "Description for task 7",
      startTime: "2025-03-11 09:00:00 AM",
      endTime: "2025-03-11 10:00:00 AM",
      status: "pending",
    },
    {
      heading: "Task 8",
      description: "Description for task 8",
      startTime: "2025-03-11 10:30:00 AM",
      endTime: "2025-03-11 11:30:00 AM",
      status: "completed",
    },
    {
      heading: "Task 9",
      description: "Description for task 9",
      startTime: "2025-03-11 12:00:00 PM",
      endTime: "2025-03-11 01:00:00 PM",
      status: "todo",
    },
    {
      heading: "Task 10",
      description: "Description for task 10",
      startTime: "2025-03-11 02:00:00 PM",
      endTime: "2025-03-11 03:00:00 PM",
      status: "progress",
    },
    {
      heading: "Task 11",
      description: "Description for task 11",
      startTime: "2025-03-11 04:00:00 PM",
      endTime: "2025-03-11 05:00:00 PM",
      status: "pending",
    },
    {
      heading: "Task 12",
      description: "Description for task 12",
      startTime: "2025-03-11 06:00:00 PM",
      endTime: "2025-03-11 07:00:00 PM",
      status: "completed",
    },
  ];
  return (
    <div>
      <h1>Your tasks</h1>
      <div>
        {tempTasks
          .slice(0, 5)
          .map(({ heading, description, startTime, endTime, status }, index) => (
            <div key={index}>
                <div>
                    <h1>{heading}</h1>
                    <p>{status}</p>
                </div>
               
            </div>
          ))}
      </div>
    </div>
  );
};

export default YourTasksCom;
