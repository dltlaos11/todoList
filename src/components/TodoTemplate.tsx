// 컨테이너 컴포넌트: 리덕스 스토어와 연동된 컴포넌트를 컨테이너 컴포넌트
// 프리젠테이셔널 컴포넌트: 리덕스와 연동되어있지 않고, 온전히 뷰만 담당하는 컴포넌트
// 현재는 Hook을 통해 동일한 작업을 할 수 있기 때문에 더 이상 컴포넌트의 구분이 불필요
// Hook을 통해서 기능별로 리덕스의 상태와 액션을 사용하는 Custom Hook을 만들어 사용해야

// Todos 컴포넌트 임포트
import Todos from "./Todos"

import styled from "styled-components";
import useTodoList from "../hooks/useTodoList";

const TodoTemplateBlock = styled.div`
    width: 512px;
    height: 768px;

    position: relative; 
    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.25);

    margin: 0 auto;

    margin-top: 96px;
    margin-bottom: 32px;
    display: flex; 
    flex-direction: column;
`

const TodoTemplate = () => {
    const {
        input,
        filter,
        filteredTodos,
        onChangeInput,
        onInsert,
        onToggle,
        onRemove,
        onClearAll,
        onChangeFilter,
        onEdit
    } = useTodoList();

    return (
        <TodoTemplateBlock>
            <Todos 
                input={input}
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
        </TodoTemplateBlock>
    );
};

export default TodoTemplate;
