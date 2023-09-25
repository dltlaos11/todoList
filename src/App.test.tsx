import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => { // App 컴포넌트 대상으로 어떤 테스트케이스를 작성할지 선언
  it('renders tasks', () => { // 할일 목록을 렌더링
    const {container} = render(( // App을 그린 다음 container를 뽑아온다, 
      <App />
    ));

    expect(container).toHaveTextContent('아무 일도 하기 싫다');
  })
})

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
