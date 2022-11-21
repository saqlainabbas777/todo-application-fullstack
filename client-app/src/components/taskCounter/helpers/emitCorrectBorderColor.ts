import {TaskCounterStatusType} from "../interfaces/ITaskCounter";
import {Status} from "../../createTaskFrom/enums/Status";

export const EmitCorrectBorderColor = (status: TaskCounterStatusType): string => {
    switch (status) {
        case Status.todo:
            return 'error.light';
        case Status.inProgress:
            return 'warning.light'
        case Status.completed:
            return 'success.light'
    }
}
