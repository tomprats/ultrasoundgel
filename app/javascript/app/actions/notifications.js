export const CREATE_NOTIFICATION = "CREATE_NOTIFICATION";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";

export const createNotification = (payload) => ({payload, type: CREATE_NOTIFICATION});
export const deleteNotification = (payload) => ({payload, type: DELETE_NOTIFICATION});
