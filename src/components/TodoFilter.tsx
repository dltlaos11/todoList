import React from 'react'
import styles from "../Todo.module.css"

// props ts 인터페이스 정의
interface Props {
    readonly filter: string;
    readonly onChangeFilter: (filter: string) => void;
}


// filter, onChangeFilter Props로 수신
const TodoFilter = ({filter, onChangeFilter}: Props) => {

    // 필터링 유형 변경 이벤트 처리 함수
    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => onChangeFilter(e.target.value);


// 필터링 유형 변경 이벤트 처리 함수 지정 
  return (
    <div className={styles.filter}>
        <input 
            type="radio"
            value="ALL"
            checked={filter === "ALL"}
            onChange={handleFilter}
        />
        전체
        <input 
            type="radio"
            value="A"
            checked={filter === "A"}
            onChange={handleFilter}
        />
        미완료
        <input 
            type="radio"
            value="B"
            checked={filter === "B"}
            onChange={handleFilter}
        />
        완료
    </div>

  )
}

export default TodoFilter