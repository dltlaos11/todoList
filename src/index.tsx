import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import todos from "./modules/todos";
import { composeWithDevTools } from 'redux-devtools-extension';

// 리듀서를 전달받아 스토어를 생성. composeWithDevTools 함수는 Redux DevTools의 기능을 사용 가능
const store = createStore(todos, composeWithDevTools());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* Provider 컴포넌트를 사용하여 프로젝트에 리덕스 적용. 
    리액트 컴포넌트에서 스토어를 사용할 수 있도록 App 컴포넌트를 Provider로 감싸 주고 store를 속성값으로 전달 */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
