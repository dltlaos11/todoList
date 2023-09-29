// 컨테이너 컴포넌트: 리덕스 스토어와 연동된 컴포넌트를 컨테이너 컴포넌트
// 프리젠테이셔널 컴포넌트: 리덕스와 연동되어있지 않고, 온전히 뷰만 담당하는 컴포넌트
// 현재는 Hook을 통해 동일한 작업을 할 수 있기 때문에 더 이상 컴포넌트의 구분이 불필요
// Hook을 통해서 기능별로 리덕스의 상태와 액션을 사용하는 Custom Hook을 만들어 사용해야

import React, { useCallback } from "react";

// 액션 생성 함수 임포트
import {
    changeTodoInput,
    addTodo,
    toggleTodoStatus,
    removeTodo,
    clearAllTodos,
    changeFilter, // 필터링 유형 변경 액션 생성 함수를 불러옴
    editTodo
} from "../actions/todos"


// Todos 컴포넌트 임포트
import Todos from "../components/Todos"

// 상태 인터페이스 임포트
import { TodoState } from "../reducers/todos";

import { useSelector, useDispatch } from "react-redux";
/* 
import { Todo } from "../App";
*/
// getFilteredTodos 선택자 함수 임포트
import { getFilteredTodos } from "../selectors/todos";

// 스토어 상태와 스토어 상태 변경 함수에 대한 타입스크립트 타입을 정의
/*
type PropsState = ReturnType<typeof mapStateToProps>;
type PropsDispatch = ReturnType<typeof mapDispatchToProps>;
*/

// props 타입스크립트 인터페이스 정의
/* interface Props extends PropsState, PropsDispatch {} */
// useSelector ,useDispatch
/* 
interface Props {
    readonly input: string;
    readonly todos: Todo[];
    readonly removeTodo: (id: number) => void;
    readonly toggleTodoStatus: (id: number) => void;
    readonly clearAllTodos: () => void;
    readonly addTodo: (input: string) => void;
    readonly changeTodoInput: (input: string) => void;
}
*/

// connect 함수에 의해 상태와 스토어 상태 변경 함수를 props로 전달받음
/*
// useSelector ,useDispatch
const TodosContainer = ({
    input,
    todos,
    changeTodoInput,
    toggleTodoStatus,
    addTodo,
    removeTodo,
    clearAllTodos,
}:Props) => {
    // 전달받은 Props를 그대로 Todos 컴포넌트에 props로 전달
    return (
        <Todos 
        input={input}
        todos={todos}
        onChangeInput={changeTodoInput}
        onInsert={addTodo}
        onToggle={toggleTodoStatus}
        onRemove={removeTodo}
        onClearAll={clearAllTodos}
        />
    )
}
*/
const TodosContainer = () => {
    /* 
    // 스토어 상태 조회
    // useSelector Hook을 사용하면 connect 함수를 대신하여 스토어 상태를 조회 가능
    const { input, todos, filter } = useSelector((state: TodoState) => ({
        input: state.input,
        todos: state.todos,
        filter: state.filter // 스토어의 필터링 유형 상태값을 filter 변수로 가져옴
    }));
    */

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

    /*
    // 필터링 처리 된 Todo 목록 반환
    const getFilteredTodos = (todos: Todo[], filter: string) => {
        if (filter === "ALL") {
            return todos;
        }

        if (filter === "A") {
            return todos.filter((todo) => {
                return todo.done === false;
            });
        }

        if (filter === "B") {
            return todos.filter((todo) => {
                return todo.done === true;
            });
        }
    }

    const filteredTodos = getFilteredTodos(todos, filter)
    */

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

/*
// 리덕스 스토어 안의 상태를 컴포넌트의 props로 매핑(넘겨주기 위해 사용하는 함수)
const mapStateToProps = (state: TodoState) => ({
    input: state.input,
    todos: state.todos,
})

// 스토어 상태 변경 함수를 컴포넌트의 props로 매핑(넘겨주기 위해 사용)
const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeTodoInput: (input: string) => {
        dispatch(changeTodoInput(input));
    },
    addTodo: (input: string) => {
        dispatch(addTodo(input));
    },
    toggleTodoStatus: (id: number) => {
        dispatch(toggleTodoStatus(id))
    },
    removeTodo: (id: number) => {
        dispatch(removeTodo(id));
    },
    clearAllTodos: () => {
        dispatch(clearAllTodos());
    }
})

// 리덕스와 연동된 컴포넌트 반환
// connect 함수가 반환한 함수에 컴포넌트를 함수인자로 전달하면 리덕스와 연동된 컴포넌트(컨테이너)가 만들어진다
// mapStateToProps와 mapDispatchToProps에서 반환하는 객체 속성 값들은 컴포넌트의 props로 전달
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodosContainer);
*/

// 리덕스의 상태값과 상태 변경 함수를 컴포넌트에서 이용하기 위해 connect함수를 사용
// 익명 함수로 처리
/*
export default connect(
    (state: TodoState) => ({
        input: state.input,
        todos: state.todos,
    }),
    (dispatch) => ({
        changeTodoInput: (input: string) => dispatch(changeTodoInput(input)),
        addTodo: (input: string) => dispatch(addTodo(input)),
        toggleTodoStatus: (id: number) => dispatch(toggleTodoStatus(id)),
        removeTodo: (id: number) => dispatch(removeTodo(id)),
        clearAllTodos: () => dispatch(clearAllTodos())
    })
)(TodosContainer);
*/

// bindActionCreators 유틸 함수를 사용하여 액션 생성 함수를 호출하여 디스패치하는 코드를 간결하게 작성가능
/*
export default connect(
    (state: TodoState) => ({
        input: state.input,
        todos: state.todos,
    }),
    (dispatch) => (
        bindActionCreators(
            {
                changeTodoInput,
                addTodo,
                toggleTodoStatus,
                removeTodo,
                clearAllTodos
            },
            dispatch
        )
    )
)(TodosContainer);
*/

// connect 함수의 두 번째 파라미터의 값을 객체 형태로 전달하면 내부에서 bindActionCreators 함수 실행을 대신
/*
export default connect(
    (state: TodoState) => ({
        input: state.input,
        todos: state.todos,
    }),
    {
        changeTodoInput,
        addTodo,
        toggleTodoStatus,
        removeTodo,
        clearAllTodos
    },
)(TodosContainer);
*/