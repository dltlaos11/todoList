// import { useState } from 'react'
import React, { useState } from 'react'
import styles from '../Todo.module.scss';

import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';

interface Props {
    // readonly onInsert: (value: string) => void;
    readonly input: string;
    // readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // readonly onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    readonly onInsert: (input: string) => void;
    readonly onChangeInput: (input: string) => void;
}

interface CircleButtonProps {
    readonly open: boolean;
}

const CircleButton = styled.button<CircleButtonProps>`
    background: #38d9a9;
    &:hover {
    background: #63e6be;
    }
    &:active {
    background: #20c997;
    }

    z-index: 5;
    cursor: pointer;
    width: 80px;
    height: 80px;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    padding-top: 8px;
    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, 50%);
    color: white;
    border-radius: 50%;
    border: none;
    outline: none;


    transition: 0.125s all ease-in;
    ${props =>
    props.open &&
    css`
        background: #ff6b6b;
        &:hover {
        background: #ff8787;
        }
        &:active {
        background: #fa5252;
        }
        transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
    width: 100%;
    bottom: 0;
    left: 0;
    position: absolute;
`;

const InsertForm = styled.form`
    background: #f8f9fa;
    padding-left: 32px;
    padding-top: 32px;
    padding-right: 32px;
    padding-bottom: 72px;

    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 100%;
    outline: none;
    font-size: 18px;
    box-sizing: border-box;
`;

const TodoInput = ({ input, onInsert, onChangeInput }: Props) => {

    // /*
    // const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    const onToggle = () => setOpen(!open);
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
        setOpen(false);
    }
    //  */
    
  return (
    <>
        {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input
              autoFocus
              placeholder="할 일을 입력 후, Enter 를 누르세요"
              onChange={onChange}
              value={input}
            />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  )
}

export default React.memo(TodoInput);