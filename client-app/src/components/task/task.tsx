import React, {FC, ReactElement} from "react";
import {Box} from "@mui/material";
import {TaskHeader} from "./_taskHeader";
import {TaskDescription} from "./_taskDescription";
import {TaskFooter} from "./_taskFooter";
import {ITask} from "./interfaces/ITask";
import {Priority} from "../createTaskFrom/enums/Priority";
import {Status} from "../createTaskFrom/enums/Status";
import PropTypes from "prop-types";
import {RenderPriorityBorderColor} from "./helpers/renderPriorityBorderColor";

export const Task: FC<ITask> = (props): ReactElement => {
    const {
        title = 'Test Title',
        date = new Date(),
        description = 'Lorem ipsum dolor sit amit',
        priority = Priority.normal,
        status = Status.completed,
        onStatusChanged = (e) => console.log(e),
        onClick =  (e) => console.log(e),
        id
    } = props;
    return (
        <Box
            display={'flex'}
            width={'100%'}
            justifyContent={'flex-start'}
            flexDirection={'column'}
            mb={4}
            p={2}
            sx={{
                width: '100%',
                backgroundColor: 'background.paper',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: RenderPriorityBorderColor(priority)
            }}
        >
            <TaskHeader title={title} date={date}/>
            <TaskDescription description={description}/>
            <TaskFooter onStatusChanged={onStatusChanged} onClick={onClick} id={id} status={status}/>
        </Box>
    );
}
Task.propTypes = {
    title: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    description: PropTypes.string,
    onStatusChanged: PropTypes.func,
    onClick: PropTypes.func,
    priority: PropTypes.string,
    status: PropTypes.string,
    id: PropTypes.string.isRequired
}
