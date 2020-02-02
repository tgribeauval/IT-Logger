import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOGS,
  DELETE_LOG,
  UPDATE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT
} from "./types";

// export const getLogs = () => {
//   return async dispatch => {
//     setLoading();

//     const res = await fetch("/logs");
//     const data = await res.json();

//     dispatch({
//       type: GET_LOGS,
//       payload: data
//     });
//   };
// };

//get logs from server

export const getLogs = () => async dispatch => {
  try {
    setLoading();

    const res = await fetch("/logs");
    const data = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data
    });
  }
};

//Add new log
export const addLogs = log => async dispatch => {
  try {
    setLoading();

    const res = await fetch("/logs", {
      method: "POST",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();

    dispatch({
      type: ADD_LOGS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data
    });
  }
};

//delete log from server

export const deleteLogs = id => async dispatch => {
  try {
    setLoading();

    const res = await fetch(`/logs/${id}`, {
      method: "DELETE"
    });
    const data = await res.json();

    dispatch({
      type: DELETE_LOG,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data
    });
  }
};

//update log on server

export const updateLog = log => async dispatch => {
  try {
    setLoading();

    const res = await fetch(`/logs/${log.id}`, {
      method: "PUT",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    console.log(data);

    dispatch({
      type: UPDATE_LOG,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data
    });
  }
};

//Set current log
export const setCurrent = log => {
  return {
    type: SET_CURRENT,
    payload: log
  };
};

//Clear current log
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  };
};

//set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
