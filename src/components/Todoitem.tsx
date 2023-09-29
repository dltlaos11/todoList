import React, { useEffect, useState, useCallback, useRef } from 'react'
import styles from '../Todo.module.css';
// ts 인터페이스 임포트
import { Todo } from "../App"

import { useSelector, useDispatch } from 'react-redux';
import { setEditingId, resetEditingId } from '../modules/todos'; // 액션 생성 함수 
import { TodoState } from '../modules/todos'; // 상태 인터페이스 

// props 인터페이스 정의
interface Props {
    readonly todo: Todo;
    // 함수 타입 추가
    readonly onRemove: (id: number) => void;
    readonly onToggle: (id: number) => void;
    readonly onEdit: (id:number, input: string) => void;
}

const Todoitem = ({ todo, onRemove, onToggle, onEdit }: Props) => {

    // todo 객체 속성 분리 저장
    const {id, text, done } = todo;

    // 스토어 상태 조회
    const { editingId } = useSelector((state: TodoState) => ({
        editingId: state.editingId,
    }))

    // 편집 입력 요소 표시여부
    const [showInput, setShowInput] = useState(false);
    
    // 편집 입력값 상태
    const [inputText, setInputText] = useState("");

    // createRef 함수를 통해서 ref를 설정하여 돔 요소에 접근
    const editInput: React.RefObject<HTMLInputElement> = React.createRef();

    // 스토어 dispatch 사용 가능
    const dispatch = useDispatch();

    // 편집 항목 ID 설정 액션 디스패치 함수
    const onSetEditingId = useCallback((id: number) => dispatch(setEditingId(id)), [dispatch]);
    // 편집 항목 ID 리셋 액션 디스패치 함수
    const onResetEditingId = useCallback(() => dispatch(resetEditingId()), [dispatch]);

    const onDoubleClick = () => {
        console.log("onDoubleClick");

        // 편집 항목 ID 설정
        onSetEditingId(id);

        setInputText(text);
        // /* 
        setShowInput(true);
        // */
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("onChange " + e.target.value);

        setInputText(e.target.value);
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter"){
            console.log("handleKeyPress Enter inputText : " + inputText);
            
            // Todo 항목 수정
            onEdit(id, inputText);

            // 편집 항목 ID 리셋
            onResetEditingId();
            // /* 
            setShowInput(false);
            // */
        }
    }

    // 입력 요소 포커스가 사라지면 편집 입력 요소를 숨김
    const handleBlur = () => {
        console.log("handleBlut inputText: "+ inputText);

        // 편집 항목 ID 리셋
        onResetEditingId();
        // /* 
        setShowInput(false);
        // */
    }

    // 마운트
    useEffect(() => {
        console.log("useEffect todo = " + todo);

        if (todo) {
            console.log("todo.text = "+ todo.text);
            
            setInputText(todo.text);
        }
    }, [todo])

    // Ref를 설정해 준 DOM에 접근하려면 속서 current를 조회. 마운트 될 때  편집 입력 요소가 유효하면 포커스
    useEffect(() => {
        if (editInput.current) {
            editInput.current.focus();
        }
    }, [editInput])

  return (
    <div className={styles.item}>
        <input type='checkbox' checked={done} onChange={() => onToggle(id)}/>
        {/* 편집 상태일 떄 ref 사용한 입력 요소 표시 */}
        {showInput && (
            <input 
                value={inputText}
                onChange={onChange}
                onKeyPress={handleKeyPress}
                onBlur={handleBlur}
                ref={editInput}
            />
        )}
        {/* 편집 상태가 아닐 떄 span 요소 표시 */}
        {!showInput && <span onDoubleClick={onDoubleClick}>{text}</span>}
        {/* 
        Todo 항목 텍스트 표시 
        <span>{todo.text}</span>
        */}
        <button onClick={() => onRemove(id)}>삭제</button>
    </div>
  )
}

export default Todoitem