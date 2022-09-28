import { useState } from "react";
import Button from "./button";

const Calculator = () => {
    let data = {};
    let [result, setResult] = useState("0");
    // result input에 표시할 값 String
    let [operation, setOperation] = useState("");
    // 사칙연산
    let [number1, setNumber1] = useState(0);
    // 첫 입력 숫자 Number
    let [number2, setNumber2] = useState();
    // 두 번째 입력 숫자 Number

    data = {
        result : result,
        setResult : setResult,
        operation : operation,
        setOperation : setOperation,
        number1 : number1,
        setNumber1 : setNumber1,
        number2 : number2,
        setNumber2 : setNumber2
    }
    

    return (
        <div>
            <div>
                <input id="result" readOnly maxLength={9} value={result}></input>
            </div>
            <div> 
                <Button id="clear" className="gray" value="AC" data={data}/>
                <Button className="gray" value="+/-" data={data}/>
                <Button className="gray" value="%" data={data}/>
                <Button className="orange" value="÷" data={data}/>
            </div>
            <div>
                <Button value="7" data={data}/>
                <Button value="8" data={data}/>
                <Button value="9" data={data}/>
                <Button className="orange" value="X" data={data}/>
            </div>
            <div>
                <Button value="4" data={data}/>
                <Button value="5" data={data}/>
                <Button value="6" data={data}/>
                <Button className="orange" value="-" data={data}/>
            </div>
            <div>
                <Button value="1" data={data}/>
                <Button value="2" data={data}/>
                <Button value="3" data={data}/>
                <Button className="orange" value="+" data={data}/>
            </div>
            <div>
                <Button value="0" className="zero" data={data}/>
                <Button value="." data={data}/>
                <Button className="orange" value="=" data={data}/>
            </div>
        </div>
    )
}

export default Calculator;