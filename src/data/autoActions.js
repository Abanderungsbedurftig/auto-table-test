export const C = {
    ACTION_ADD_AUTO: 'ACTION_ADD_AUTO',
    ACTION_CHANGE_ERROR: 'ACTION_ADD_ERROR',
    ACTION_TOGGLE_END: 'ACTION_TOGGLE_END'
}

export const addAuto = auto => 
    ({
        type: C.ACTION_ADD_AUTO,
        payload: auto
    })

export const changeError = error => 
    ({
        type: C.ACTION_CHANGE_ERROR,
        payload: error
    })

export const toggleEnd = isEnd => 
    ({
        type: C.ACTION_TOGGLE_END,
        payload: isEnd
    })


