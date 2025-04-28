import { writable } from "svelte/store";

export const toasts = writable<any>([]);

type Toast = {
    id?: number
    text: string,
    type: ToastType,
    dismissible?: boolean,
    timeout?: number
}

export enum ToastType {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
    WARNING = 'warning'
}

export const createToast = (toast: Toast) => {
    // create a unique id for toast for removing
    const id = Math.floor(Math.random() * 1000);

    // default values 
    const defaults: Toast = {
        id, 
        text: "Something happened",
        type: ToastType.INFO,
        dismissible: true,
        timeout: 10000,
    };

    // add toast to writable array
    toasts.update((all) => [{ ...defaults, ...toast }, ...all]);

    //dismiss toast after timeout
    setTimeout(() => dismissToast(id), toast.timeout || defaults.timeout);
}

export const dismissToast = (id: number) => {
    toasts.update((all) => all.filter((t: any) => t.id != id));
}