import React from 'react'
import styles from '../Todo.module.css';
// ts 인터페이스 임포트
import { Todo } from "../App"

// props 인터페이스 정의
interface Props {
    readonly todo: Todo;
    // 함수 타입 추가
    readonly onRemove: (id: number) => void;
    readonly onToggle: (id: number) => void;
}

const Todoitem = ({ todo, onRemove, onToggle }: Props) => {

    // todo 객체 속성 분리 저장
    const {id, text, done } = todo;

  return (
    <div className={styles.item}>
        <input type='checkbox' checked={done} onChange={() => onToggle(id)}/>
        {/* Todo 항목 텍스트 표시 */}
        <span>{todo.text}</span>
        <button onClick={() => onRemove(id)}>삭제</button>
    </div>
  )
}

export default Todoitem