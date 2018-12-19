import { toast } from "react-toastify";


/**
 * Pop up a new toast
 * @param toast 
 */
export const addToast = (message: string, state: string) => (dispatch) => {
  if(state === 'warn') {
    toast.warn(message);
  } else if(state === 'success') {
    toast.success(message);
  } else {
    toast.success(message);
  }
}