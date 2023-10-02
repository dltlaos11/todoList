import { Todo } from "../App";
import { createReducer } from "typesafe-actions";
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
} from "../constants/ActionTypes";

/* 리듀서 코드를 작성 */

    // 상태 인터페이스 정의
    export interface TodoState {
        input: string;
        todos: Todo[];
        nextTodoId: number;
        // filter 속성 타입 정의
        filter: string;
        // editingId 속성 타입 정의
        editingId: number;
    }

    // 초기 상태
    const initialState: TodoState = {
        input: "",
        todos: [],
        nextTodoId: 1,
        filter: "ALL", // filter 속성의 초기값 정의
        editingId: 0,
    };

        /* createReducer */
    const todos = createReducer(
        initialState,
        {
            [CHANGE_TODO_INPUT]: (state, {payload: input}) => ({
                ...state,
                input: input
            }),
            [ADD_TODO]: (state, { payload: todo }) => {
                const newTodo = {...todo, id: state.nextTodoId};
                const nextTodoId = state.nextTodoId + 1;

                return ({
                    ...state,
                    todos: state.todos.concat(newTodo),
                    nextTodoId
                })
            },
            [TOGGLE_TODO_STATUS]: (state, {payload: id}) => ({
                ...state,
                todos: state.todos.map((todo) => 
                    todo.id === id ? { ...todo, done: !todo.done } : todo
                ),
            }),
            [REMOVE_TODO]: (state, { payload: id }) => ({
                ...state,
                todos: state.todos.filter((todo) => todo.id !== id),
            }),
            [CLEAR_ALL_TODOS]: (state, action) => ({
                ...state,
                todos: [],
            }),
            [RESTORE]: (state, action) => { // 상태 복원 액션을 처리하는 리듀서 정의
                console.log(action);
                console.log(action.payload.todos);
                console.log(action.payload.nextTodoId);
                return ({
                    ...state,
                    todos: action.payload.todos,
                    nextTodoId: action.payload.nextTodoId,
                })
            },
            [CHANGE_FILTER]: (state, {payload: filter}) => ({ // 필터링 유형 변경 액션 처리 리듀서 함수 정의
                ...state,
                filter: filter,
            }),
            [EDIT_TODO]: (state, action) => ({ // Todo 항목 변경 액션처리 리듀서 함수 정의
                ...state,
                todos: state.todos.map((todo) => 
                    todo.id === action.payload.id ? {...todo, text: action.payload.input} : todo
                )
            }),
            [SET_EDITING_ID]: (state, { payload: id}) => ({ // 편집 항목 ID tjfwjd
                ...state,
                editingId: id,
            }),
            [RESET_EDITING_ID]: (state) => ({ // 편집 항목 ID 리셋
                ...state,
                editingId: 0,
            })
        }
    )

export default todos;