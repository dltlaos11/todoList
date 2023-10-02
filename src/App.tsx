import './App.css';
import Todos from './components/Todos';
import TodosContainer from './components/TodoTemplate';
import { createGlobalStyle } from "styled-components";

  // 상위 컴포넌트의 상태 데이터를 컴포넌트 속성(props)을 통해 하위 컴포넌트에 전달
  // 애플리케이션 전반에서 사용되는 ts인터페이스이므로 최상단 컴포넌트에 정의
  export interface Todo {
    id: number;
    text: string;
    done: boolean;
  }

  const GlobalStyle = createGlobalStyle`
    body {
      background: #e9ecef;
    }
  `

const App = () => {


  return (
    <>
    <GlobalStyle />
    <TodosContainer />
    </>
  );
}

export default App;
