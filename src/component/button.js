import React from 'react';

const Button = (props) => {
    const edit = props.data.edit;
    const setEdit = props.data.setEdit;
    const inputText = props.data.inputText;
    const setInputText = props.data.setInputText;
    const number1 = props.data.number1;
    const setNumber1 = props.data.setNumber1;
    const setNumber2 = props.data.setNumber2;
    const number2 = props.data.number2;
    const operation = props.data.operation;
    const setOperation = props.data.setOperation;
    const waiting = props.data.waiting;
    const setWaiting = props.data.setWaiting;

    const checkOp = (op) => {
        // 연산 버튼 누를때 마다 호출
        if(number1 !== undefined && number2 !== undefined) {
            if((operation === "+" || operation === "-") && (op === "/" || op === "*")) {
                setWaiting(number1 + operation + number2 + op);
                return ;
            } else if(waiting !== "") {
                isNaN(waiting.charAt(waiting.length-1)) ? setWaiting(()=> "") : runWaiting(waiting);
            }
            runOp(op);
        }
        setOperation(op);
        setNumber2(undefined);
    }

    const runOp = (op) => {
        // 계산하는 함수
        // 소수점 포함 총 9자리 제한 생각하기.
        // 자바스크립트 소수점 계산 문제 현상 수정할거 생각하기.

        if(waiting !== '' && !(op === "+" || op === "-")) {
            runWaiting(isNaN(waiting.charAt(waiting.length-1)) ? (waiting+inputText): (waiting));
            return;
        } else if(waiting !== '' && (op === "+" || op === "-") && !isNaN(waiting.charAt(waiting.length-1))) {
            runWaiting(waiting);
            return;
        }

        
        let run = new Function('a', 'b', 'return a' + operation + 'b')(
            number1 === undefined ? Number(inputText) : number1, 
            number2 === undefined ? (number1 === undefined ? Number(inputText) : number1) : number2 
        );

        setInputText(String(run));
        setNumber1(undefined);
        setWaiting("");
    }

    const runWaiting = (text) => {
        // 보류했던 계산식을 계산
        let run = new Function('',"return " + text)();

        setInputText(String(run));
        setWaiting("");
        setNumber1(undefined);
        setNumber2(undefined);
    }

    const percentage = () => {
        // % 버튼 호출 함수
        if(number2 !== undefined) {
            setNumber2((number2/100)*number1);
            setInputText(String((number2/100)*number1));
        } else if(number1 !== 0 && operation === "") {
            setNumber1(number1/100);
            setInputText(String(number1/100));
        } else if(number1 !== 0 && operation !== ""){
            return ;
        }
    }

    const clear = () => {
        // C버튼 현제 입력값 초기화
        document.getElementById('clear').value = "AC";
        document.getElementById('clear').textContent = "AC";
        setInputText("0");
        setWaiting("")
        
        if(number2 !== undefined) {
            setNumber2(undefined);
        } else {
            setNumber1(undefined);
        }
        
    }

    const allClear = () => {
        // AC버튼 전체 초기화
        setInputText("0");
        setOperation("");
        setNumber1(undefined);
        setNumber2(undefined);
        setWaiting("");
        
    }

    const minus = () => {
        //음수/양수 전환
        const number = Number(inputText);
        setInputText(String(number*-1));
        if(number1 === number) {
            setNumber1(number*-1);
        } else{
            setNumber2(number*-1);
        }
    }

    const point = () => {
        // 숫자에 소숫점 붙이기
        if(inputText.includes('.')){
           return;
        }
        setInputText(inputText+".");
        if(number2 === undefined) {
            setNumber1(inputText);
        } else{
            setNumber2(inputText);
        }
        
    }

    const click = (e) => {
        // 버튼 클릭시
        const value = e.target.value; 

        switch(value) {
            case "×" : 
                checkOp('*'); 
                break;
            case "÷" : 
                checkOp('/');
                break;
            case "+" : 
                checkOp('+'); 
                break;
            case "−" : 
                checkOp('-'); 
                break;
            case "AC" : 
                allClear();
                break;
            case "C" :
                clear();
                break;
            case "+/-" : 
                minus();
                break;
            case "%" : 
                percentage();
                break;
            case "=" : 
                runOp("=");
                break;
            case "." :
                point();
                break;
            default : 
                document.getElementById('clear').value = "C";
                document.getElementById('clear').textContent = "C";
                if(number1 === undefined) {
                    setNumber1(Number(value));
                    setEdit(1);
                    setInputText(value);
                } else if(waiting !== "" && edit !== 3) {
                    setEdit(3);
                    setInputText(value);
                    setWaiting(waiting+value);
                } else if(waiting !== "" && edit === 3) {
                    setInputText(inputText + value);
                    setWaiting(waiting+value);
                }
                  else if(operation === '' && number1 !== undefined && edit === 1 && (inputText + value).length <= 9){
                    setNumber1(Number(inputText + value));
                    setInputText(inputText + value);
                } else if(operation !== '' && number2 === undefined) {
                    setNumber2(Number(value));
                    setEdit(2);
                    setInputText(value);
                } else if(operation !== '' && number2 !== undefined && edit === 2 && (inputText + value).length <= 9) {
                    setNumber2(Number(inputText + value));
                    setInputText(inputText + value);
                } else if(number1 && number2){
                    edit === 1 ? setNumber1(Number(inputText + value)) : setNumber2(Number(inputText + value));
                    setInputText(inputText + value);
                } 
        }
    }
    return (
        <button id={props.id} value={props.value} className={props.className} onClick={click}>
            {props.value} 
        </button>
    )
}

export default Button