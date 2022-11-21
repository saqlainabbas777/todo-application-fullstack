import React, {FC, ReactElement, useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";
import {IDateField} from "./interfaces/IDateField";
import PropTypes from "prop-types";

export const TaskDateField: FC<IDateField> = (props): ReactElement => {
    const {
        value = new Date(),
        disabled = false,
        onChange = (date: Date | null) => console.log(date)
    } = props;
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    label={'Task Date'}
                    inputFormat={'dd/MM/yyyy'}
                    onChange={onChange}
                    value={value}
                    disabled={disabled}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </>
    );
};

TaskDateField.propTypes = {
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.instanceOf(Date)
}
