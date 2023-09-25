// 리덕스 관련 코드
// 덕스 패턴: 액션 타입, 액션 생성 함수, 리듀서 함수를 하나의 파일로 작성
import { Todo } from "../App";

    // 액션 타입 선언 as const 
    const CHANGE_TODO_INPUT = "CHANGE_TODO_INPUT" as const;
    const ADD_TODO = "ADD_TODO" as const;
    const TOGGLE_TODO_STATUS = "TOGGLE_TODO_STATUS" as const;
    const REMOVE_TODO = "REMOVE_TODO" as const;
    const CLEAR_ALL_TODOS = "CLEAR_ALL_TODOS" as const;
    
    // 액션 생성 함수 정의(외부에서 사용할 수 있도록 export)
    export const changeTodoInput = (input: string) => ({
        type: CHANGE_TODO_INPUT,
        input
    });

    export const addTodo = (input: string) => ({
        type: ADD_TODO,
        todo: {
            text: input,
            done: false,
        }
    });

    export const toggleTodoStatus = (id: number) => ({
        type: TOGGLE_TODO_STATUS,
        id
    })

    export const removeTodo = (id: number) => ({
        type: REMOVE_TODO,
        id,
    })

    export const clearAllTodos = () => ({
        type: CLEAR_ALL_TODOS,
    });

    // 상태 인터페이스 정의
    export interface TodoState {
        input: string;
        todos: Todo[];
        nextTodoId: number;
    }

    // 초기 상태
    const initialState: TodoState = {
        input: "",
        todos: [],
        nextTodoId: 1,
    };

    // 액션 타입 정의, 액션 생성 함수의 반환값에 대한 타입을 유니온으로 정의
    type TodoAction = ReturnType<typeof changeTodoInput>
                    | ReturnType<typeof addTodo>
                    | ReturnType<typeof toggleTodoStatus>
                    | ReturnType<typeof removeTodo>
                    | ReturnType<typeof clearAllTodos>


    // 리듀서(상태의 변화를 일으키는 함수) 함수 정의
    function todos(state: TodoState = initialState, action: TodoAction){
        switch(action.type) {
            case CHANGE_TODO_INPUT:
                return {
                    ...state,
                    input: action.input,
                };
            case ADD_TODO:
                const newTodo = {...action.todo, id: state.nextTodoId};
                state.nextTodoId++;

                return {
                    ...state,
                    todos: state.todos.concat(newTodo)
                };

            case TOGGLE_TODO_STATUS:
                return {
                    ...state,
                    todos: state.todos.map((todo) => 
                        todo.id === action.id ? {...todo, done: !todo.done} : todo
                    )
                };

            case REMOVE_TODO:
                return {
                    ...state,
                    todos: state.todos.filter((todo) => todo.id !== action.id)
                };

            case CLEAR_ALL_TODOS:
                return {
                    ...state,
                    todos: []
                };

            default:
                return state;
        }
    }

export default todos;