import { useSelector } from 'react-redux';
import React from 'react'
import styles from '../Todo.module.scss';

import { useStore } from 'react-redux';

// 상태 인터페이스
import { TodoState } from '../reducers/todos';


interface Props {
    readonly onClearAll: () => void;
}

const TodoFooter = ({ onClearAll }: Props) => {

    // useSelector Hook을 통해 스토어 상태를 조회
    const { todos, nextTodoId } = useSelector((state: TodoState) => ({
        todos: state.todos,
        nextTodoId: state.nextTodoId
    }))

    // 조회한 스토어 상태값을 데이터 객체의 속성으로 지정하여 생성
    const data = {
        todos,
        nextTodoId
    }

    // useStore 훅을 사용하여 스토어 객체에 직접 접근할 수 있다
    /*
    const store = useStore();
    const state = store.getState();

    const data = {
        todos: state.todos,
        nextTodoId: state.nextTodoId
    }
    */

    // 데이터 객체를 JSON 문자열로 변환하여 로컬스토리지에 저장
    const onSave = () => {
        localStorage.setItem('todo-app-data', JSON.stringify(data))
    }

  return (
    <div className={styles.footer}>
        <button onClick={() => onClearAll()}>모두 삭제</button>
        <button onClick={onSave}>저장</button>
    </div>
  )
}

export default TodoFooter