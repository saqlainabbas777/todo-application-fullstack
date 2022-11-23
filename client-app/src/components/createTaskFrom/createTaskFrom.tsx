import React, {FC, ReactElement, useEffect, useState} from "react";
import {Box, Stack, Typography, LinearProgress, Button, Alert, AlertTitle} from "@mui/material";
import {TaskTitleField} from "./_taskTitleField";
import {TaskDescriptionField} from "./_taskDescriptionField";
import {TaskDateField} from "./_taskDateField";
import {TaskSelectField} from "./_taskSelectField";
import {Status} from "./enums/Status";
import {Priority} from "./enums/Priority";
import {useMutation} from "@tanstack/react-query";
import {sendApiRequest} from "../../helpers/sendApiRequest";
import {ICreateTask} from "../taskArea/interfaces/ICreateTask";

export const CreateTaskFrom: FC = (): ReactElement => {
    // declare states
    const [title, setTitle] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState<string | undefined>(undefined);
    const [date, setDate] = useState<Date | null>(new Date());
    const [status, setStatus] = useState<string>('todo');
    const [priority, setPriority] = useState<string>('normal');
    const [showSuccess, setShowSuccess] = useState<boolean>(false);

    // create a task mutation
    const createTaskMutation = useMutation((data: ICreateTask) =>
        sendApiRequest(
            'http://localhost:3200/tasks',
            'POST',
            data
        )
    );

    // handle post request
    function createTaskHandler() {
        if (!title || !description || !date) {
            return;
        }
        const task: ICreateTask = {
            title,
            description,
            date: date.toString(),
            status,
            priority
        };
        createTaskMutation.mutate(task);
    }

    // manage all side effects of the application
    useEffect(() => {
        if (createTaskMutation.isSuccess) {
            setShowSuccess(true);
        }

        const successTimeout = setTimeout(() => {
            setShowSuccess(false);
        }, 7000);
        return () => {
            clearTimeout(successTimeout);
        }
    }, [createTaskMutation.isSuccess])

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-start'}
            width={'100%'}
            px={4}
            my={6}
        >
            {
                showSuccess && <Alert
                    severity={'success'}
                    sx={{width: '100%', marginBottom: '16px'}}
                >
                    <AlertTitle>Success</AlertTitle>
                    The task has been created successfully
                </Alert>
            }

            <Typography mb={2} component={'h2'} variant={'h6'}>
                Create A Task
            </Typography>

            <Stack sx={{width: '100%'}} spacing={2}>
                <TaskTitleField
                    disabled={createTaskMutation.isLoading}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />
                <TaskDescriptionField
                    disabled={createTaskMutation.isLoading}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                />
                <TaskDateField
                    disabled={createTaskMutation.isLoading}
                    value={date}
                    onChange={(date) => {
                        setDate(date)
                    }}
                />

                <Stack sx={{width: '100%'}} direction={'row'} spacing={2}>
                    <TaskSelectField
                        label={'Status'}
                        name={'status'}
                        items={[
                            {
                                value: Status.todo,
                                label: Status.todo.toUpperCase()
                            },
                            {
                                value: Status.inProgress,
                                label: Status.inProgress.toUpperCase()
                            },
                            {
                                value: Status.completed,
                                label: Status.completed.toUpperCase()
                            },
                        ]}
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value as string)
                        }}
                    />
                    <TaskSelectField
                        label={'Priority'}
                        name={'Priority'}
                        items={[
                            {
                                value: Priority.low,
                                label: Priority.low.toUpperCase()
                            },
                            {
                                value: Priority.normal,
                                label: Priority.normal.toUpperCase()
                            },
                            {
                                value: Priority.high,
                                label: Priority.high.toUpperCase()
                            },
                        ]}
                        value={priority}
                        onChange={(e) => {
                            setPriority(e.target.value as string)
                        }}
                    />
                </Stack>
                {
                    createTaskMutation.isLoading && <LinearProgress/>
                }
                <Button
                    disabled={!title || !description || !date || !status || !priority}
                    onClick={createTaskHandler}
                    variant={'contained'}
                    size={'large'}
                    fullWidth
                >
                    Create A Task
                </Button>
            </Stack>
        </Box>
    )
}
