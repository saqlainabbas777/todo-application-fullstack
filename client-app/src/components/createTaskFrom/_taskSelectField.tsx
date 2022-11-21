import React, {FC, ReactElement} from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {ISelectField} from "./interfaces/ISelectField";
import PropTypes from "prop-types";
export const TaskSelectField: FC<ISelectField> = (props): ReactElement => {
    const {
        value = '',
        label = 'Select Box',
        name = 'selectBox',
        items = [{value: '', label: 'Add Items'}],
        disabled = false,
        onChange = (e: SelectChangeEvent) => console.log(e)
    } = props;
    return (
        <FormControl fullWidth size={'small'}>
            <InputLabel id={`${name}-id`}>{label}</InputLabel>
            <Select
                labelId={`${name}-id`}
                id={`${name}-id-select`}
                value={value}
                label={label}
                name={name}
                onChange={onChange}
                disabled={disabled}
            >
                {
                 items.map((item, index) => (
                     <MenuItem value={item.value} key={`${item.value}${index}`}>{item.label}</MenuItem>
                 ))
                }
            </Select>
        </FormControl>
    );
}

TaskSelectField.propTypes = {
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        }).isRequired
    )
}
