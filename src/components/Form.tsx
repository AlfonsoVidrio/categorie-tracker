import { useState, ChangeEvent, FormEvent, Dispatch } from "react"
import { v4 as uuid } from 'uuid'
import type { activityType } from "../types"
import { categories } from "../data/categories"
import { ActivityActions, initialState } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>
}

const INITIAL_STATE: activityType = {
    id: uuid(),
    category: 1,
    name: '',
    calories: 0
}

const Form = ({dispatch}: FormProps) => {

    const [activity, setActivity] = useState<activityType>(INITIAL_STATE)
    
// Esta función maneja los cambios en los campos de entrada (input) y selección (select).
const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    // Verifica si el campo actual es uno de los campos que espera un número ('category' o 'calories').
    const isNumberField = ['category', 'calories'].includes(event.target.id)

    // Actualiza el estado de 'activity' usando la función 'setActivity'.
    // Utiliza el operador de propagación (...) para mantener los valores existentes.
    // Asigna el nuevo valor del campo de entrada. Si es un campo numérico, convierte el valor a número usando el operador '+'.
    setActivity({
        ...activity,
        [event.target.id]: isNumberField ? +event.target.value : event.target.value
    })
}

    const isValidActivity = () => {
        const {name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        dispatch({ type: "save-activity", payload: {newActivity: activity}})

        setActivity({
            ...INITIAL_STATE,
            id: uuid()
        })
        
        console.log(activity)
    }

    return (
        <form 
            className="space-y-6 bg-white shadow-lg p-8 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-4">
                <label htmlFor="category" className="font-semibold text-gray-700">
                    Category:
                </label>
                <select
                    className="border border-slate-300 p-3 rounded-lg w-full bg-white hover:border-lime-500 focus:border-lime-500 focus:ring focus:ring-lime-300 transition"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                    >
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <label htmlFor="name" className="font-semibold text-gray-700">
                    Activity:
                </label>
                <input
                    id="name"
                    type="text"
                    className="border border-slate-300 p-3 rounded-lg w-full focus:outline-none focus:ring focus:ring-lime-300 transition"
                    placeholder="e.g. Food, Orange Juice, Salad, Exercise, Weights, Bicycle."
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-4">
                <label htmlFor="calories" className="font-semibold text-gray-700">
                    Calories:
                </label>
                <input
                    id="calories"
                    type="number"
                    className="border border-slate-300 p-3 rounded-lg w-full focus:outline-none focus:ring focus:ring-lime-300 transition"
                    placeholder="Calories, e.g. 300 or 500"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <input 
                type="submit" 
                className="bg-gray-900 hover:bg-gray-800 w-full p-3 font-bold uppercase text-white cursor-pointer transition disabled:opacity-20"
                value={activity.category === 1 ? "Save Food": "Save Exercise"}
                disabled={!isValidActivity()}
            />
        </form>
    )
}

export default Form
