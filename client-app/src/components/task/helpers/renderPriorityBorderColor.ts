import {Priority} from "../../createTaskFrom/enums/Priority";

export const RenderPriorityBorderColor = (priority: string): string => {
    switch (priority) {
        case Priority.normal:
            return 'grey.900';
        case Priority.high:
            return 'error.light';
        case Priority.low:
            return 'info.light';
        default:
            return 'grey.900'
    }
}
