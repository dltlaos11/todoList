// 컨테이너 컴포넌트: 리덕스 스토어와 연동된 컴포넌트를 컨테이너 컴포넌트
// 프리젠테이셔널 컴포넌트: 리덕스와 연동되어있지 않고, 온전히 뷰만 담당하는 컴포넌트
// 현재는 Hook을 통해 동일한 작업을 할 수 있기 때문에 더 이상 컴포넌트의 구분이 불필요
// Hook을 통해서 기능별로 리덕스의 상태와 액션을 사용하는 Custom Hook을 만들어 사용해야

import React, { useCallback } from "react";

// connect 함수 import
/* 
import { connect } from "react-redux";
*/

// 액션 생성 함수 임포트
import {
    changeTodoInput,
    addTodo,
    toggleTodoStatus,
    removeTodo,
    clearAllTodos,
    changeFilter, // 필터링 유형 변경 액션 생성 함수를 불러옴
    editTodo
} from "../modules/todos"


// Todos 컴포넌트 임포트
import Todos from "../components/Todos"

// 상태 인터페이스 임포트
import { TodoState } from "../modules/todos";

// Dispatch 함수 타입 입포트

import { useSelector, useDispatch } from "react-redux";

// getFilteredTodos 선택자 함수 임포트
import { getFilteredTodos } from "../modules/selector";


const TodosContainer = () => {

    // 선택자 함수로 상태 데이터 필터링
   const { input, filter, filteredTodos } = useSelector((state: TodoState) => ({
    input: state.input,
    filter: state.filter,
    filteredTodos: getFilteredTodos(state),
   }))

    // 스토어 dispatch 사용 가능
    // useDispatch는 컴포넌트 내부에서 스토어의 내장 함수 dispatch를 사용할 수 있게 해주는 Hook
    const dispatch = useDispatch();

    // 스토어 상태 변경 함수 작성
    // 액션을 생성하여 디스패치하는 스토어 상태 변경 함수 작성
    const onChangeInput = useCallback((input: string) => dispatch(changeTodoInput(input)), [dispatch]);
    const onInsert = useCallback((input: string) => dispatch(addTodo(input)), [dispatch]);
    const onToggle = useCallback((id: number) => dispatch(toggleTodoStatus(id)), [dispatch]);
    const onRemove = useCallback((id: number) => dispatch(removeTodo(id)), [dispatch]);
    const onClearAll = useCallback(() => dispatch(clearAllTodos()), [dispatch]);
    const onChangeFilter = useCallback((filter: string) => dispatch(changeFilter(filter)), [dispatch]);
    const onEdit = useCallback((id: number, input: string) => dispatch(editTodo(id, input)), [dispatch]);

    return (
        <Todos 
            input={input}
            // todos={todos}
            todos={filteredTodos}
            onChangeInput={onChangeInput}
            onInsert={onInsert}
            onToggle={onToggle}
            onRemove={onRemove}
            onClearAll={onClearAll}
            filter={filter}
            onChangeFilter={onChangeFilter}
            onEdit={onEdit}
        />
    );
};

export default TodosContainer;
