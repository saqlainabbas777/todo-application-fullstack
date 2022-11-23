import {Priority} from "../../createTaskFrom/enums/Priority";
import {Status} from "../../createTaskFrom/enums/Status";

export interface ITaskApi {
    id: string;
    date: string;
    title: string;
    description: string;
    priority: `${Priority}`; // creating union of Priority
    status: `${Status}`;
}
