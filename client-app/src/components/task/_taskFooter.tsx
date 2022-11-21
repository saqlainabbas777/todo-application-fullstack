import React, {FC, ReactElement} from "react";
import PropTypes from "prop-types";
import {Box, Button, FormControlLabel, Switch} from "@mui/material";
import {ITaskFooter} from "./interfaces/ITaskFooter";

export const TaskFooter: FC<ITaskFooter> = (props): ReactElement => {
    const {
        onStatusChanged = (e) => console.log(e),
        onClick = (e) => console.log(e)
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
                    onChange={(e) => onStatusChanged(e)}
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
                onClick={(e) => onClick(e)}
            >Mark Complete</Button>
        </Box>
    );
}
TaskFooter.propTypes = {
    onStatusChanged: PropTypes.func,
    onClick: PropTypes.func
}
