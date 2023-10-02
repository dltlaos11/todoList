import TodoFooter from "./TodoFooter";
import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";

import { useState, useRef, useCallback } from 'react'
import { Todo } from "../App";

interface Props {
    readonly input: string;
    // readonly todos: Todo[];
    readonly todos?: Todo[]; // 배열이 아닌 값이 전달 될 수 있으므로 필수 속성 -> 선택 속성 변경

    // filter 데이터 타입 추가
    readonly filter: string;
    readonly onRemove: (id: number) => void;
    readonly onToggle: (id: number) => void;
    readonly onClearAll: () => void;
    readonly onInsert: (input: string) => void;
    readonly onChangeInput: (input: string) => void;
    // onChangeFilter 함수 타입 추가
    readonly onChangeFilter: (filter: string) => void;
    readonly onEdit: (id: number, input: string) => void;
}

const Todos = ({
    input,
    todos,
    onChangeInput,
    onInsert,
    onToggle,
    onRemove,
    onClearAll,
    filter,
    onChangeFilter,
    onEdit
}: Props) => {
// TodosContainer 컴포넌트로부터 리덕스 스토어 상태와 스토어 상태 변경 함수를 props로 전달받음

/* 
함수를 메모리제이션하고, 의존성 배열을 통해 함수가 재생성되는 것을 제어 -> 성능 향상 및 함수의 일관된 동작을 보장(이벤트 헨들러 or 자식 컴포넌트에 props로 전단되는 함수에 유용) 
useCallback: 함수형 컴포넌트에서 함수를 선언시, 컴포넌트가 리렌더링 될 때마다 새로운 함수가 생성, 이것은 불필요한 함수 생성을 유발
            이러한 함수가 자식 컴포넌트에 props로 전달될 때 성능 문제를 야기. 처음 한 번만 생성되고, 의존생 배열이 변경되지 않는 한,
            같은 함수를 재사용. 불필요한 함수의 재생성을 방지하여 성능 향상(성능 최적화)
            [] -> 어떠한 의존성도 갖지 ❌, 함수 내에서 참조하는 외부 변수나 상태가 없음. 의존성이 변경되지 않을 떄 항상 동일한 함수를
            반환하게 되며, 리렌더링이 발생해도 함수가 재생성 되지 않음(의존성 관리)
*/

    return (
    <div>
        <TodoHeader />
        <TodoInput input={input} onInsert={onInsert} onChangeInput={onChangeInput}></TodoInput>
        <TodoFilter filter={filter} onChangeFilter={onChangeFilter} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} onEdit={onEdit}/>
        <TodoFooter onClearAll={onClearAll}/>
    </div>
  )
}

export default Todos