import {AppDataSource} from "../../index";
import {Task} from "./tasks.entity";
import {instanceToPlain, plainToInstance} from "class-transformer";
import {Request, Response} from "express";
import {validationResult} from "express-validator";
import {UpdateResult} from "typeorm";

class TasksController {
    // method for get routes
    public async getAll(req: Request, res: Response): Promise<Response> {
        // declare a var that holds all the tasks
        let allTasks: Task[];
        // fetch all tasks using the repository
        try {
            allTasks = await AppDataSource.getRepository(Task).find({
                order: {
                    date: 'asc'
                }
            });
            // convert the tasks instance to array object
            allTasks = instanceToPlain(allTasks) as Task[];
            return res.json(allTasks).status(200)
        } catch (_errors) {
            return res.json({error: 'Internal Server Error'}).status(500);
        }
    }

    // method for post route
    public async create(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        // return res.status(200);
        // create new instance of a task
        const newTask = new Task();
        // add required properties to the task
        newTask.title = req.body.title;
        newTask.date = req.body.date;
        newTask.description = req.body.description;
        newTask.priority = req.body.priority;
        newTask.status = req.body.status;
        // newly created task to the database
        let createdTask: Task;
        try {
            createdTask = await AppDataSource.getRepository(
                Task
            ).save(newTask);

            //convert task instance to an object
            createdTask = instanceToPlain(createdTask) as Task;
            return res.json(createdTask).status(201);
        } catch (error) {
            return res.json({error: 'Internal Server Error'}).status(500);
        }
    }

    // method for updating task
    public async update(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        // try to find the task whether it exists or not
        let task: Task | null;
        try {
            task = await AppDataSource.getRepository(Task).findOne({
                where: {id: req.body.id}
            })
        } catch (error) {
            return res.json({error: 'Internal Server Error'}).status(500);
        }
        // return 400 if task is null
        if (!task) {
            return res.json({error: 'The task with given ID does not exist'}).status(404);
        }
        // declare var to hold for updated task
        let updatedTask: UpdateResult;
        // update the task
        try {
            updatedTask = await AppDataSource.getRepository(Task).update(
                req.body.id,
                plainToInstance(Task, {status: req.body.status})
            );
            // convert the updated task instance to an object
            updatedTask = instanceToPlain(updatedTask) as UpdateResult;
            return res.json(updatedTask).status(200);
        } catch (error) {
            return res.json({error: 'Internal Server Error'}).status(500);
        }
    }
}

export const taskController = new TasksController()
