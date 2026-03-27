import * as React from "react";

const TOAST_LIMIT = 3;
const DEFAULT_TOAST_DURATION = 5000; // ms
const REMOVE_AFTER_DISMISS = 300; // ms after close to remove from state

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

// timers map stores { dismiss: timeoutId, remove: timeoutId }
const timers = new Map();

const scheduleRemove = (toastId, delay = REMOVE_AFTER_DISMISS) => {
  clearTimers(toastId, 'remove');
  const removeTimer = setTimeout(() => {
      timers.delete(toastId);
      dispatch({ type: 'REMOVE_TOAST', toastId });
    }, delay);
  timers.set(toastId, { ...(timers.get(toastId) || {}), remove: removeTimer });
};

const scheduleAutoDismiss = (toastId, duration = DEFAULT_TOAST_DURATION) => {
  if (!duration || duration <= 0) return; // 0 or falsy = persistent
  clearTimers(toastId, 'dismiss');
  const dismissTimer = setTimeout(() => {
      dispatch({ type: 'DISMISS_TOAST', toastId });
      // schedule removal shortly after dismiss
      scheduleRemove(toastId, REMOVE_AFTER_DISMISS);
    }, duration);
  timers.set(toastId, { ...(timers.get(toastId) || {}), dismiss: dismissTimer });
};

const clearTimers = (toastId, which) => {
  const t = timers.get(toastId);
  if (!t) return;
  if ((!which || which === 'dismiss') && t.dismiss) {
    clearTimeout(t.dismiss);
    t.dismiss = null;
  }
  if ((!which || which === 'remove') && t.remove) {
    clearTimeout(t.remove);
    t.remove = null;
  }
  if (!t.dismiss && !t.remove) timers.delete(toastId); else timers.set(toastId, t);
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      if (toastId) {
        // schedule removal shortly after dismiss
        scheduleRemove(toastId, REMOVE_AFTER_DISMISS);
        // clear any pending auto dismiss timer
        clearTimers(toastId, 'dismiss');
      } else {
        state.toasts.forEach((toast) => scheduleRemove(toast.id, REMOVE_AFTER_DISMISS));
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      // clear any timers for this toast
      clearTimers(action.toastId);
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners = [];

let memoryState = { toasts: [] };

function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

function toast(props) {
  const id = genId();

  const update = (props) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  // schedule auto-dismiss if duration provided (or default)
  const duration = typeof props.duration === 'number' ? props.duration : DEFAULT_TOAST_DURATION;
  if (duration !== 0) {
    scheduleAutoDismiss(id, duration);
  }

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };
