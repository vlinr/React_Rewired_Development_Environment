import {
    TEST_DEFAULT,
} from '../constants/test';

interface ReduxTestType{
    type:string,
    name:string
}

export const reduxTest = (name:string):ReduxTestType => ({
    type: TEST_DEFAULT,
    name
});