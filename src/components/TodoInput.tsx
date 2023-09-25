// import { useState } from 'react'
import React from 'react'
import styles from '../Todo.module.css';

interface Props {
    // readonly onInsert: (value: string) => void;
    readonly input: string;
    // readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // readonly onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    readonly onInsert: (input: string) => void;
    readonly onChangeInput: (input: string) => void;
}

const TodoInput = ({ input, onInsert, onChangeInput }: Props) => {

    // /*
    // const [value, setValue] = useState("");

    //  텍스트 입력 요소 변경이 발생하면 변경된 입력값을 컴포넌트의 상태값으로 설정
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setValue(e.target.value);
        
        // 텍스트 입력 요소 변경 이벤트 발생 시, 스토어 상태 변경 함수(onChangeInput)를 호출
        onChangeInput(e.target.value);
    }

    // submit이벤트 발생 시, 스토어 상태 변경 함수(onInsert, onChangeInput)를 호출
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // 브라우저 새로고침 방지
        e.preventDefault();

        // onInsert(value);
        // setValue("");
        onInsert(input);
        onChangeInput("");
    }
    //  */
    
  return (
    <div className={styles.input}>
        <form onSubmit={onSubmit}>
            {/* value binding */}
            <input placeholder='할 일을 입력하세요' value={input} onChange={onChange}/> 
            <button type='submit'>추가</button>
        </form>
    </div>
  )
}

export default TodoInput