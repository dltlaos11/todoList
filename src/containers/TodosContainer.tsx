// 컨테이너 컴포넌트: 리덕스 스토어와 연동된 컴포넌트를 컨테이너 컴포넌트
// 프리젠테이셔널 컴포넌트: 리덕스와 연동되어있지 않고, 온전히 뷰만 담당하는 컴포넌트
// 현재는 Hook을 통해 동일한 작업을 할 수 있기 때문에 더 이상 컴포넌트의 구분이 불필요
// Hook을 통해서 기능별로 리덕스의 상태와 액션을 사용하는 Custom Hook을 만들어 사용해야

import React from "react";

// connect 함수 import
import { connect } from "react-redux";

// 액션 생성 함수 임포트
import {
    changeTodoInput,
    addTodo,
    toggleTodoStatus,
    removeTodo,
    clearAllTodos
} from "../modules/todos"

// Todos 컴포넌트 임포트
import Todos from "../components/Todos"

// 상태 인터페이스 임포트
import { TodoState } from "../modules/todos";

// Dispatch 함수 타입 입포트
import { Dispatch, bindActionCreators } from 'redux'
import { Todo } from "../App";

// 스토어 상태와 스토어 상태 변경 함수에 대한 타입스크립트 타입을 정의
// type PropsState = ReturnType<typeof mapStateToProps>;
// type PropsDispatch = ReturnType<typeof mapDispatchToProps>;

// props 타입스크립트 인터페이스 정의
// interface Props extends PropsState, PropsDispatch {}
interface Props {
    readonly input: string;
    readonly todos: Todo[];
    readonly removeTodo: (id: number) => void;
    readonly toggleTodoStatus: (id: number) => void;
    readonly clearAllTodos: () => void;
    readonly addTodo: (input: string) => void;
    readonly changeTodoInput: (input: string) => void;
}

// connect 함수에 의해 상태와 스토어 상태 변경 함수를 props로 전달받음
const TodosContainer = ({
    input,
    todos,
    changeTodoInput,
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