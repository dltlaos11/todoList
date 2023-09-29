import { createSelector } from "reselect";
import { TodoState } from "../reducers/todos";

/* 선택자 함수를 정의 */

// Todo 항목 목록 전달 선택자 함수
const getTodos = (state: TodoState) => state.todos;

// 상태 데이터 필터링 유형 전달 선택자 함수
const getFilter = (state: TodoState) => state.filter;

// 선택된 필터링 유형으로 필터링 처리된 Todo 항목 목록 전달 선택자 함수
export const getFilteredTodos = createSelector(
    // createSelector: selector  들을 연달아서 넣을 수 있음
    [getTodos, getFilter], // getTodos, getFilter selectot에서 반환된 값이 변경될 경우에만 selecort를 호출하여 조히
    (todos, filter) => {
        if (filter === "ALL") {
            return todos;
        }
        if (filter === "A") {
            return todos.filter((todo) => {
                return todo.done === false;
            })
        }
        if (filter === "B") {
            return todos.filter((todo) => {
                return todo.done === true;
            })
        }
    }
);