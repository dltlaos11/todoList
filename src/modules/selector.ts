import { createSelector } from "reselect";
// 필터링된 Todo 항목 목록을 반환하는 선택자 함수를 createSelector로 정의
// 선택자 함수를 사용하여 성능을 향상
/* reselect */
// 리액트 컴포넌트에서 필요한 데이터로 리덕스의 데이터를 처리하는 데 사용된다.
// 우리가 원하는 상태를 조회 하는 과정에서 memoization -> Memoized Selector
// 리덕스에서 관리하고 있는 상태를 어떠한 연산을 처리한 후 조회해야 한다면 Memoized Selector 또는 useMemo
// import { TodoState } from "./todos"; 

// Todo 항목 목록 전달 선택자 함수
// const getTodos = (state: TodoState) => state.todos;

// // 상태 데이터 필터링 유형 전달 선택자 함수
// const getFilter = (state: TodoState) => state.filter;

// // 선택된 필터링 유형으로 필터링 처리된 Todo 항목 목록 전달 선택자 함수
// export const getFilteredTodos = createSelector(
//     // createSelector: selector  들을 연달아서 넣을 수 있음
//     [getTodos, getFilter], // getTodos, getFilter selectot에서 반환된 값이 변경될 경우에만 selecort를 호출하여 조히
//     (todos, filter) => {
//         if (filter === "ALL") {
//             return todos;
//         }
//         if (filter === "A") {
//             return todos.filter((todo) => {
//                 return todo.done === false;
//             })
//         }
//         if (filter === "B") {
//             return todos.filter((todo) => {
//                 return todo.done === true;
//             })
//         }
//     }
// );