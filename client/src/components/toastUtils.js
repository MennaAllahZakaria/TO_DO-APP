import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
};

export const showSuccessToast = (message) => {
  toast.success(message, {
    ...toastConfig,
    style: {
      backgroundColor: '#4caf50', // Green background
      color: '#fff' // White text
    }
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    ...toastConfig,
    style: {
      backgroundColor: '#f44336', // Red background
      color: '#fff' // White text
    }
  });
};

export const showInfoToast = (message) => {
  toast.info(message, {
    ...toastConfig,
    style: {
      backgroundColor: '#2196f3', // Blue background
      color: '#fff' // White text
    }
  });
};

export const showWarningToast = (message) => {
  toast.warn(message, {
    ...toastConfig,
    style: {
      backgroundColor: '#ff9800', // Orange background
      color: '#fff' // White text
    }
  });
};
