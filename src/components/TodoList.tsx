import {useState} from 'react'
import styles from '../Todo.module.css';
import Todoitem from './Todoitem'
// ts 인터페이스 임포트
import { Todo } from "../App";

// props 인터페이스 정의
interface Props{
    // readonly todos: Todo[]; // 컴포넌트 props에 대한 ts인터페이스 정의
    readonly todos?: Todo[] // 선택 속성으로 변경
    // 함수 타입 추가
    readonly onRemove: (id: number) => void;
    readonly onToggle: (id: number) => void;
    readonly onEdit: (id:number, input: string) => void;
}

// TodoList 컴포넌트 속성 정의
const TodoList = ({todos, onRemove, onToggle, onEdit}: Props) => {

    // const [todos] = useState(["todoItem1", "todoItem2", "todoItem3"]);

  return (
    <div className={styles.list}>
        {/*
         {todos.map((todo) => (
            <Todoitem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle}/>
        ))} 
        */
        todos && todos.map((todo) => (
            <Todoitem 
                todo={todo}
                key={todo.id}
                onRemove={onRemove}
                onToggle={onToggle}
                onEdit={onEdit}
            />
        ))
        }
    </div>
  )
}

export default TodoList