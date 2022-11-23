import React, {FC, ReactElement} from "react";
import PropTypes from "prop-types";
import {Box, Button, FormControlLabel, Switch} from "@mui/material";
import {ITaskFooter} from "./interfaces/ITaskFooter";
import {Status} from "../createTaskFrom/enums/Status";

export const TaskFooter: FC<ITaskFooter> = (props): ReactElement => {
    const {
        id,
        status,
        onStatusChanged = (e, id) => console.log(e, id),
        onClick = (e, id) => console.log(e, id)
    } = props;
    return (
        <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            mt={4}
        >
            <FormControlLabel
                label={'In Progress'}
                control={<Switch
                    defaultChecked={status === Status.inProgress}
                    onChange={(e) => onStatusChanged(e, id)}
                    color={'warning'}
                />}
            />

            <Button
                variant={'contained'}
                color={'success'}
                size={'small'}
                sx={{
                    color: '#ffffff'
                }}
                onClick={(e) => onClick(e, id)}
            >Mark Complete</Button>
        </Box>
    );
}
TaskFooter.propTypes = {
    id: PropTypes.string.isRequired,
    status: PropTypes.string,
    onStatusChanged: PropTypes.func,
    onClick: PropTypes.func
}
