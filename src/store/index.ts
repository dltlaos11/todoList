import { legacy_createStore as createStore, Reducer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

/*  스토어를 생성하는 모듈 */

export default function configureStore(reducer: Reducer) {
    return createStore(reducer, composeWithDevTools());
}