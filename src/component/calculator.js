import { useState } from "react";
import Button from "./button";

const Calculator = () => {
    const [inputText, setInputText ] = useState("0");
    // input에 표시할 값 String
    const [edit, setEdit] = useState(1);
    // 현재 입력중인 숫자 number1이면 1 number2이면 2
    const [operation, setOperation] = useState("");
    // 사칙연산
    const [number1, setNumber1] = useState();
    // 첫 입력 숫자 Number
    const [number2, setNumber2] = useState();
    // 두 번째 입력 숫자 Number
    const [waiting,setWaiting] = useState("");

    let data = {};
    data = {
        edit : edit,
        setEdit : setEdit,
        inputText : inputText,
        setInputText  : setInputText ,
        operation : operation,
        setOperation : setOperation,
        number1 : number1,
        setNumber1 : setNumber1,
        number2 : number2,
        setNumber2 : setNumber2,
        waiting : waiting,
        setWaiting : setWaiting
    }
    

    return (
        <div>
            <div id="inputTextDiv">
                <input id="inputText" readOnly maxLength={9} value={inputText}></input>
            </div>
            <div> 
                <Button id="clear" className="gray" value="AC" data={data}/>
                <Button className="gray" value="+/-" data={data}/>
                <Button className="gray" value="%" data={data}/>
                <Button className="orange" value="&#247;" data={data}/>
            </div>
            <div>
                <Button value="7" data={data}/>
                <Button value="8" data={data}/>
                <Button value="9" data={data}/>
                <Button className="orange" value="&#215;" data={data}/>
            </div>
            <div>
                <Button value="4" data={data}/>
                <Button value="5" data={data}/>
                <Button value="6" data={data}/>
                <Button className="orange" value="&#8722;" data={data}/>
            </div>
            <div>
                <Button value="1" data={data}/>
                <Button value="2" data={data}/>
                <Button value="3" data={data}/>
                <Button className="orange" value="&#43;" data={data}/>
            </div>
            <div>
                <Button value="0" className="zero" data={data}/>
                <Button value="." data={data}/>
                <Button className="orange" value="&#61;" data={data}/>
            </div>
        </div>
    )
}

export default Calculator;