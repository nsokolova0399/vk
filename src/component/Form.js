import React, {useEffect, useCallback} from 'react';
// использрвание React Hook Form
import {Controller, useForm} from 'react-hook-form'
// использрвание React Date Picker
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Form() {
    const {control, register, handleSubmit, reset} = useForm({
        defaultValues: {
            tower: '',
            floorsTower: '',
            roomsTower: '',
        }
    });
    //преобразование данных в json
    const onSubmit = (values) => {
        console.log(JSON.stringify(values));
    };

    const floors = () => {
        let fl = [];
        for (let i = 3; i <= 27; i++) {
            fl.push(i);
        }
        return fl;
    };

    const rooms = () => {
        let fl = [];
        for (let i = 1; i <= 10; i++) {
            fl.push(i);
        }
        return fl;
    };
    const times = ['15 мин', '30 мин', '45 мин', '1 час', '1 час 30 мин', '2 часа', '3 часа'];

    const ParseTextarea = ({value = [], onChange}) => {
        const [text, setText] = React.useState(value.join("\n"));

        const handleChange = (e) => {
            const value = e.target.value;
            setText(value);
            onChange(value.split("\n"));
        };

        return <textarea className="formTextarea" onChange={handleChange} value={text}/>;
    };


    const resetAsyncForm = useCallback(async () => {
        const result = await fetch('./api/formValues.json');
        reset(result);
    }, [reset]);

    useEffect(() => {
        resetAsyncForm()
    }, [resetAsyncForm])

    return (
        <>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="formSubmit">
                    <div className="formBlock">
                        <h2 className="formTitle">Выберите башню:</h2>
                        <select {...register("tower")} className="formField">
                            <option value="A">А</option>
                            <option value="Б">Б</option>
                        </select>
                    </div>
                    <div className="formBlock">
                        <h2 className="formTitle">Выберите этаж:</h2>
                        <select {...register("floorsTower")} className="formField">
                            {floors().map((item, index) =>
                                <option key={index} value={index}>{item}</option>
                            )};
                        </select>

                    </div>
                    <div className="formBlock">
                        <h2 className="formTitle">Выберите переговорную комнату:</h2>
                        <select {...register("roomsTower")} className="formField">
                            {rooms().map((item, index) =>
                                <option key={index} value={index}>{item}</option>
                            )};
                        </select>

                    </div>
                    <div className="formBlock">
                        <h2 className="formTitle">Выберите дату:</h2>
                        <Controller
                            className="formField"
                            control={control}
                            name="ReactDatepicker"
                            render={({field: {onChange, onBlur, value, ref}}) => (
                                <ReactDatePicker
                                    className="formField"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    selected={value}
                                />
                            )}
                        />

                        <div className="formBlock">
                            <h2 className="formTitle">
                                Выберите интервал времени
                            </h2>
                            <select {...register("roomsTower")} className="formField">
                                {times.map((item, index) =>
                                    <option key={index} value={index}>{item}</option>
                                )};
                            </select>

                        </div>
                    </div>
                    <div className="formBlock">
                        <h2 className="formTitle">
                            Комментарий
                        </h2>
                        <Controller
                            name="ParseTextarea"
                            render={({field}) => {
                                const {ref, ...nonRefField} = field;
                                return <ParseTextarea {...nonRefField} />;
                            }}
                            control={control}
                        />
                    </div>

                    <div className="formBlock formButtons">
                        <button type="submit" className="formButton">Отправить</button>
                        <button className="formButton" onClick={() => {
                            reset(() => ({
                                tower: '',
                                floorsTower: '',
                                roomsTower: '',
                                ReactDatepicker: '',
                                ParseTextarea: []
                            }))
                        }}
                        >Очистить
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}


export default Form;