import type { activityType } from "../types"

export type ActivityActions = {
    type: 'save-activity', payload: { newActivity: activityType }
}

type ActivityState = {
    activities : activityType[]
}

export const initialState: ActivityState = {
    activities: []
}

export const activityReducer = (
    state : ActivityState = initialState,
    action: ActivityActions
) => {
    if(action.type === 'save-activity') {
        // Este código maneja la lógica para actualizar el state
        
        return {
            ...state,
            activities: [...state.activities, action.payload.newActivity]
        }
    }

    return state
}