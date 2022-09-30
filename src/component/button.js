import React  from 'react';

const Button = (props) => {
    const result = props.data.result;
    const setResult = props.data.setResult;
    const number1 = props.data.number1;
    const setNumber1 = props.data.setNumber1;
    const setNumber2 = props.data.setNumber2;
    const number2 = props.data.number2;
    const operation = props.data.operation;
    const setOperation = props.data.setOperation;

    const checkOp = (op) => {
        // 연산 버튼 누를때 마다 호출
        if(number1 !== undefined && number2 !== undefined) {
            if(op !== operation){
                // 연산자가 선택된 상태에서 다른 연산자 누르면 연산자만 교체
                setOperation(op);
                return;
            }
            setNumber2(undefined);
            runOp(operation);
        } else {
            setOperation(op);
        }
    }

    const runOp = (op) => {
        // 계산하는 함수
        let run = new Function('a', 'b', 'return a' + op + 'b')(number1, number2 === undefined ? number1 : number2 );
        setResult(String(run));
        setNumber1(Number(run));
    }
    const percentage = () => {
        // % 버튼 호출 함수
        if(number2 !== undefined) {
            setNumber2((number2/100)*number1);
            setResult(String((number2/100)*number1));
        } else if(number1 !== 0 && operation === "") {
            setNumber1(number1/100);
            setResult(String(number1/100));
        } else if(number1 !== 0 && operation !== ""){
            return ;
        }
    }

    const clear = () => {
        // C버튼 현제 입력값 초기화
        document.getElementById('clear').value = "AC";
        document.getElementById('clear').textContent = "AC";
        setResult("0");
        if(number2 !== undefined) {
            setNumber2(undefined);
        } else {
            setNumber1(0);
        }
        
    }

    const allClear = () => {
        // AC버튼 전체 초기화
        setResult("0");
        setOperation("");
        setNumber1(0);
        setNumber2(undefined);
    }

    const minus = () => {
        //음수/양수 전환
        // 123 + 456 입력후 c는 
        // 123 + 만 남는다.
        // 즉 여기서 1 = 을 하면 124
        const number = Number(result);
        setResult(String(number*-1));
        if(number1 === number) {
            setNumber1(number*-1);
        } else{
            setNumber2(number*-1);
        }
    }

    const point = () => {
        // 숫자에 소숫점 붙이기
        if(result.includes('.')){
           return;
        }
        setResult(result+".");
        if(number2 === undefined) {
            setNumber1(result);
        } else{
            setNumber2(result);
        }
        
    }

    const click = (e) => {
        // 버튼 클릭시
        // 계산기 끝난후 숫자 입력은 새로 입력받는다.
        // ex) 123 + 1 = 124 에서 789 입력후 = 790

        // 1 + 2 = 3  여기서  = 누르면 5 = 7
        // 1 + 2 + 3 여기서 = 6
        // 1 + 2 = 3 + = 6
        // 1 + 2 = 3 여기서 2= 4

        // 1+2*3 되게하기..

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
                runOp(operation);
                break;
            case "." :
                point();
                break;
            default : 
                document.getElementById('clear').value = "C";
                document.getElementById('clear').textContent = "C";
                if(operation === '' && number1 === 0) {
                    setNumber1(Number(value));
                    setResult(value);
                } else if(operation === '' && number1 !== undefined){
                    setNumber1(Number(result + value));
                    setResult(result + value);
                } else if(operation !== '' && number2 === undefined) {
                    setNumber2(Number(value));
                    setResult(value);
                } else if(operation !== '' && number2 !== undefined) {
                    setNumber2(Number(result + value));
                    setResult(result + value);
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