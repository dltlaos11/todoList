// 리덕스 관련 코드
// 덕스 패턴: 액션 타입, 액션 생성 함수, 리듀서 함수를 하나의 파일로 작성
import { Todo } from "../App";

import { createAction } from "redux-actions";
import { action, createReducer } from "typesafe-actions";

    // 액션 타입 선언 as const 
    // createAction 함수를 활용하여 액션 생성 함수를 간단히 할 수 있음 
    const CHANGE_TODO_INPUT = "CHANGE_TODO_INPUT";
    const ADD_TODO = "ADD_TODO";
    const TOGGLE_TODO_STATUS = "TOGGLE_TODO_STATUS";
    const REMOVE_TODO = "REMOVE_TODO";
    const CLEAR_ALL_TODOS = "CLEAR_ALL_TODOS";
    const RESTORE = "RESTORE"; // 상태 복원 액션 타입
    const CHANGE_FILTER = "CHANGE_FILTER"; // 필터링 유형 변경 액션 타입 선언
    const EDIT_TODO = "EDIT_TODO"; // Todo 항목 변경 액션 타입
    const SET_EDITING_ID = "SET_EDITING_ID"; // 편집중인 Todo 항목 ID를 설정하는 액션 타입
    const RESET_EDITING_ID = "RESET_EDITING_ID"; // 편집중인 Todo 항목 ID를 리셋하는 액션 타입
    
    
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

    // createReducer 함수를 활용하여 리듀서를 간편하게 작성할 수 있음
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