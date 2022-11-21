import React, {FC, ReactElement} from "react";
import {TextField} from "@mui/material";
import {ITextField} from "./interfaces/ITextField";

import PropTypes from "prop-types";


export const TaskTitleField: FC<ITextField> = (props): ReactElement => {
    const {onChange = (e) => console.log(e), disabled = false} = props;
    return (
        <TextField
            id={'title'}
            label={'Task Title'}
            placeholder={'Task Title'}
            variant={'outlined'}
            size={'small'}
            name={'title'}
            disabled={disabled}
            onChange={onChange}
            fullWidth
        />
    )
}

TaskTitleField.propTypes = {
    onChange: PropTypes.func,
    disabled: PropTypes.bool
};
