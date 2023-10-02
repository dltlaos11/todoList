import { createAction } from "redux-actions";
import {
    CHANGE_TODO_INPUT,
    ADD_TODO,
    TOGGLE_TODO_STATUS,
    REMOVE_TODO,
    CLEAR_ALL_TODOS,
    RESTORE,
    CHANGE_FILTER,
    EDIT_TODO,
    SET_EDITING_ID,
    RESET_EDITING_ID
} from "../constants/ActionTypes"

    /* 액션 생성 함수를 정의 */

    /* createAction */
    export const changeTodoInput = createAction(CHANGE_TODO_INPUT, (input: string) => input);
    export const addTodo = createAction(ADD_TODO, (input: string) =>({
        text: input,
        done: false
    }));
    export const toggleTodoStatus = createAction(TOGGLE_TODO_STATUS, (id: number) => id);
    export const removeTodo = createAction(REMOVE_TODO, (id: number) => id);
    export const clearAllTodos = createAction(CLEAR_ALL_TODOS);
    // 상태 복원 액션 함수 정의
    export const restore = createAction(RESTORE, (data: string) => data);
    // 필터링 유형 변경 액션 생성 함수 정의
    export const changeFilter = createAction(CHANGE_FILTER, (filter: string) => filter);
    // Todo 항목 변경 액션 생성 함수 정의
    export const editTodo = createAction(EDIT_TODO, (id: number, input: string) =>({
        id,
        input
    }));
    export const setEditingId = createAction(SET_EDITING_ID, (id: number) => id);
    export const resetEditingId = createAction(RESET_EDITING_ID);