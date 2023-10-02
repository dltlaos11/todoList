import React from 'react'
import styles from '../Todo.module.scss';
import classNames from 'classnames/bind';
import { Todo } from '../App';

interface Props{
  readonly todos?: Todo[]

}

const TodoHeader = ({todos}: Props) => {
  
  const cx = classNames.bind(styles);

  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  let dayOfWeek = week[today.getDay()];

  const dynamicClassName = dayOfWeek === '일요일' ? cx('day', 'red') : cx('day'); // 조건부 스타일

  const undoneTasks = todos?.filter(todo => !todo.done);



  return (
    <div className={styles.header}>
      
        <h1>{formattedDate}</h1>
        <div className={dynamicClassName}>{dayOfWeek}</div>
        <div className={cx({ 'tasks-left': true })}>할 일 {undoneTasks?.length} 개남음</div>
    </div>
  )
}

export default TodoHeader