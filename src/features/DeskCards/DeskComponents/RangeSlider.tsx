import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import style from '../../../features/DeskCards/DeskCards.module.css'
import {useAppDispatch, useAppSelector} from '../../../common/utils/hooks';
import {params} from "../paramsReducer/selectors";
import {setParamsAC} from "../paramsReducer/paramsReducer";

export const RangeSlider = React.memo ( () => {
    const dispatch = useAppDispatch();

    const max = useAppSelector(params.max);
    const min = useAppSelector(params.min);

    const [value1, setValue1] = React.useState<number[]>([min || 0 , max || 110]);
    const minDistance = 1;

    const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {

        if (!Array.isArray(newValue)) {
            return;
        }
        if (activeThumb === 0 ) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
    };

    const onMouseUp = () => {
        const min = Number(value1[0]);
        const max = Number(value1[1]);

        dispatch(setParamsAC({min, max}));
    };

    return (
        <div className={style.sliderValue}>
            <div className={style.min}>{value1[0]}</div>
            <Box  sx={{width: 250}}>

                <Slider
                    onMouseUp={onMouseUp}
                    step={1}
                    value={value1}
                    onChange={handleChange}
                    valueLabelDisplay="off"
                    disableSwap
                    aria-autocomplete={'inline'}
                    max={110}
                />

            </Box>
            <div className={style.max}>{value1[1]}</div>

        </div>
    );
} );
