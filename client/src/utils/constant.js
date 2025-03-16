// @ts-nocheck
// --------------------- Server URL or Base URL ----------------------

export const serverURL = import.meta.env.VITE_SERVER_URL;

// ------------------- Auth Routes -----------------------

export const authRoute = "/api/authentication";
export const feedbackRoute = `${authRoute}/feedback`;
export const emailExistRoute = `${authRoute}/email-exist`;
export const otpSendRoute = `${authRoute}/send-otp`;
export const otpVerifyRoute = `${authRoute}/verify-otp`;
export const singUpRoute = `${authRoute}/login-user`;
export const googleLoginRoute = `${authRoute}/login-google`;
export const getUserRoute = `${authRoute}/get-user`;
export const resetPasswordRoute = `${authRoute}/reset-password`;

// ------------------------ Task Routes ----------------------

export const taskRoute = "/api/tasks";
export const getTasksRoute = `${taskRoute}/get`; // get
export const addTaskRoute = `${taskRoute}/add`; // post
export const updateTaskRoute = `${taskRoute}/update`; // put
export const deleteTaskRoute = `${taskRoute}/delete`; // delete

// ------------------------ Event Routes ----------------------

export const eventRoute = "/api/events";
export const getEventsRoute = `${eventRoute}/get`; // get
export const addEventRoute = `${eventRoute}/add`; // post
export const updateEventRoute = `${eventRoute}/update`; // put
export const deleteEventRoute = `${eventRoute}/delete`; // delete 
