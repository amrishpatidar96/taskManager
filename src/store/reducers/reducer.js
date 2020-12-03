import * as actionTypes from '../actions/actionTypes';

const initialState = {
    projects:{
        reactComponents:[],
        redux:[],
        Android:[]
    }
};

const reducer = (state = initialState,action)=>{

    switch(action.type) {

        case actionTypes.ADD_TASK_DETAILS:
            return {
                ...state,
                projects:{
                    ...state.projects,
                   [action.task.selectProject]:state.projects[action.task.selectProject].concat(action.task)
                }
            };
        default:
            return state;

    }

}

export default reducer ;