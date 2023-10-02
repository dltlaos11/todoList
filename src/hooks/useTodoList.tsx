import { useDispatch, useSelector } from "react-redux";
import { getFilteredTodos } from "../selectors/todos";
import { TodoState } from "../reducers/todos";
import { useCallback } from "react";
// 액션 생성 함수 임포트
import { addTodo, changeFilter, changeTodoInput, clearAllTodos, editTodo, removeTodo, toggleTodoStatus } from "../actions/todos";

const useTodoList = () => {
        // 스토어 상태 조회
    // useSelector Hook을 사용하면 connect 함수를 대신하여 스토어 상태를 조회 가능

    // 선택자 함수로 상태 데이터 필터링
   const { input, filter, filteredTodos } = useSelector((state: TodoState) => ({
    input: state.input,
    filter: state.filter,
    filteredTodos: getFilteredTodos(state),
   }))

    // 스토어 dispatch 사용 가능
    // useDispatch는 컴포넌트 내부에서 스토어의 내장 함수 dispatch를 사용할 수 있게 해주는 Hook
    // 스토어 상태 변경 함수 작성
    // 액션을 생성하여 디스패치하는 스토어 상태 변경 함수 작성
    /*
    const onChangeInput = useCallback((input: string) => dispatch(changeTodoInput(input)), [dispatch]);
    const onInsert = useCallback((input: string) => dispatch(addTodo(input)), [dispatch]);
    const onToggle = useCallback((id: number) => dispatch(toggleTodoStatus(id)), [dispatch]);
    const onRemove = useCallback((id: number) => dispatch(removeTodo(id)), [dispatch]);
    const onClearAll = useCallback(() => dispatch(clearAllTodos()), [dispatch]);
    const onChangeFilter = useCallback((filter: string) => dispatch(changeFilter(filter)), [dispatch]);
    const onEdit = useCallback((id: number, input: string) => dispatch(editTodo(id, input)), [dispatch]);
   */

    // 재네릭 사용으로 코드 중복 간편화
    const dispatch = useDispatch();

    function useActionHandler<T>(actionCreator: (args: T) => any) {
   
     const handler = useCallback((args: T) => {
       dispatch(actionCreator(args));
     }, [dispatch, actionCreator]);
   
     return handler;
 }
 
     // 사용 예시
     const onChangeInput = useActionHandler<string>(changeTodoInput);
     const onInsert = useActionHandler<string>(addTodo);
     const onToggle = useActionHandler<number>(toggleTodoStatus);
     const onRemove = useActionHandler<number>(removeTodo);
     const onClearAll = useActionHandler<void>(() => clearAllTodos()); // 수정
     const onChangeFilter = useActionHandler<string>(changeFilter);
     const onEdit = useCallback((id: number, input: string) => dispatch(editTodo(id, input)), [dispatch]);

    return {
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
    }
}

export default useTodoList;


// 재네릭 사용
// custom hooks