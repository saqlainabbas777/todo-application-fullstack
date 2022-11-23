import {body, ValidationChain} from 'express-validator';
import {Priority} from "../enums/Priority";
import {Status} from "../enums/Status";

export const createValidator: ValidationChain[] = [
    body('title')
        .not().isEmpty().withMessage('The task title is mandatory')
        .trim()
        .isString().withMessage('title needs to be in text format'),
    body('date')
        .not().isEmpty().withMessage('The task date is mandatory')
        .isString().withMessage('the date needs to be a valid date format'),
    body('description')
        .trim()
        .isString().withMessage('Description needs to be in the text format'),
    body('priority')
        .trim()
        .isIn([Priority.normal, Priority.low, Priority.high])
        .withMessage('priority can only be normal, high or low'),
    body('status')
        .trim()
        .isIn([Status.todo, Status.completed, Status.inProgress])
        .withMessage('status can only be todo, in progress or completed')
];

export const updateValidator: ValidationChain[] = [
    body('id')
        .not().isEmpty().withMessage('The task id is mandatory')
        .trim()
        .isString()
        .withMessage('ID needs to valid UUID format'),
    body('status')
        .trim()
        .isIn([Status.todo, Status.completed, Status.inProgress])
        .withMessage('status can only be todo, in progress or completed')
];
