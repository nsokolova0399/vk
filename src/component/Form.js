import React, {useEffect, useCallback } from 'react';
// использрвание React Hook Form
import { Controller, useForm } from 'react-hook-form'
// использрвание React Date Picker
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// использрвание React Date Time
import Datetime from 'react-datetime';


function Form() {
    const { control,register, handleSubmit, setValue, reset } = useForm({
        defaultValues: {
            tower: '',
            floorsTower: '',
            roomsTower:'',

        }
    });
    const onSubmit = (values) => {
        console.log(values);
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
    const times = ['15 мин','30 мин','45 мин','1 час','1 час 30 мин','2 часа', '3 часа'];

    const [startDate, setStartDate] = React.useState(new Date());

    const ParseTextarea = ({ value = [], onChange }) => {
        const [text, setText] = React.useState(value.join("\n"));

        const handleChange = (e) => {
            const value = e.target.value;

            setText(value);
            onChange(value.split("\n"));
        };

        return <textarea onChange={handleChange} value={text} />;
    };


    const resetAsyncForm = useCallback(async () => {
        const result = await fetch('./api/formValues.json'); // result: { firstName: 'test', lastName: 'test2' }
        reset(result); // asynchronously reset your form values
    }, [reset]);

    useEffect(() => {
        resetAsyncForm()
    }, [resetAsyncForm])

    return (
        <>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <h2>Выберите башню:</h2>
                        <select {...register("tower")}>
                            <option value="A">А</option>
                            <option value="B">Б</option>
                        </select>
                    </div>
                    <div>
                        <h2>Выберите этаж:</h2>
                        <select {...register("floorsTower")}>
                            {floors().map((item, index) =>
                                <option key={index} value={index}>{item}</option>
                            )};
                        </select>

                    </div>
                    <div>
                        <h2>Выберите переговорную комнату:</h2>
                        <select {...register("roomsTower")}>
                            {rooms().map((item, index) =>
                                <option key={index} value={index}>{item}</option>
                            )};
                        </select>

                    </div>
                    <div>
                        <h2>Выберите дату:</h2>
                        <Controller
                            control={control}
                            name="ReactDatepicker"
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <ReactDatePicker

                                    onChange={onChange}
                                    onBlur={onBlur}
                                    selected={value}
                                />
                            )}
                            />

                        <div>
                            <h2>
                                Выберите интервал времени
                            </h2>
                            <select {...register("roomsTower")}>
                                {times.map((item, index) =>
                                    <option key={index} value={index}>{item}</option>
                                )};
                            </select>

                        </div>
                    </div>
                    <div>
                        <h2>
                            Комментарий
                        </h2>
                        <Controller
                            name="ParseTextarea"
                            render={({ field }) => {
                                const { ref, ...nonRefField } = field;
                                return <ParseTextarea {...nonRefField} />;
                            }}
                            control={control}
                        />
                    </div>


                    <button type="submit">Отправить </button>
                    <button   onClick={() => {
                        reset(formValues => ({
                            ...formValues,
                            tower: '',
                            floorsTower: '',
                            roomsTower:'',
                            ReactDatepicker:'',
                            ParseTextarea:[]
                        }))
                    }}
                    >Очистить</button>
                </form>
            </div>
        </>
    );
}


export default Form;