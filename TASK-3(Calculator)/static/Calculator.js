// Calculator script 

function Click(e) {
    if(!e){
        e=window.event
    }
    var target=e.target || e.srcElement    
    value=target.value      //value of button
    var display=document.getElementById('con')      //This element used to display numbers and other stuff
    el=display.innerHTML            //check any this it contain or not

    // alert(target)
    if(target=='[object HTMLInputElement]'){    //button clicked
        checkID(target, el)
        el=display.innerHTML            //Again it require to adding answer
        el+=value
        display.textContent=el
    }
    else if (target=='[object HTMLButtonElement]') {        //thoes are special button
        specialButton(target, display)
    }
}   

function specialButton(target, display) {            //This function determine each button functionality such as backspace , clearal etc.
        text=display.innerHTML  //it contain that value will be erase by one per click
        answer=document.getElementById('ans')
        if(target.value=="B"){      //it is backspace button
            text=text.substring(0, text.length-1)
            display.textContent=text 
        }    
        else if(target.value=="AC"){        //all clear button clicked
            display.textContent=''
            answer.textContent=''
        }
        else if(target.value=="EQ"){
            gotAnswer(text)
        }
        else if(target.value=="ANS"){
            display.innerHTML=ANS
        }
}

var ANS //global variable(History of Ans button)
var num=document.getElementsByClassName('num_pad')[0]   //I take div(num_pad) not every child of it to add Event lis. to reduce code
num.addEventListener('click', Click, false)


var equComponent=new Array()       //it will store values of equation by parts
function gotAnswer(equation) {
    var answer=document.getElementById('ans')
    let divans
    for(let i=0; i<equation.length; i++){
        divans=perOpretion(equation)
        break
    }
    ANS=divans
    answer.innerHTML="="+divans     //Answer
    equComponent=[]         //empty Component of equation
}

function perOpretion(eq) {      //this function perform operation
    
    let ans
    if (checkDiv(eq)) {
        divEq=eq.split('/')
        eq=divEq[0]/divEq[1]
        
        
    }
    else if (checkMul(eq)) {
        divEq=eq.split(/\*/)
        eq=divEq[0]*divEq[1]
    }
    else if (checkPlus(eq)) {
        divEq=eq.split(/\+/)
        eq=parseInt(divEq[0])+parseInt(divEq[1])
    }
    else if(checkMinus(eq)){
        divEq=eq.split('-')
        eq=divEq[0]-divEq[1]
    }
    else if (checkSR(eq)) {
        divEq=eq.split(String.fromCharCode(8730))
        eq=Math.sqrt(divEq[1])
        
    }
    return eq

}
function afterDivision(list){
    if(checkAnysym(list)){
        equComponent.push(list)
    }
    else{
        
    }
    
}
function toBool(v) {
    if(v<0)
        return false
    else if(v>=0)
        return true
   // else
 //       throw "0 can't convert to Boolean"
}

function checkAnysym(j) {           //if present basic symbols such as +,-,*,/ then return false 
    if(toBool(j.search(/\+/)))
        return false
    else if(toBool(j.search('-')))
        return false
    else if(toBool(j.search(/\*/)))
        return false
    else if(toBool(j.search('/')))
        return false
    else if(!isNaN(j))
        return true
}

function checkMinus(v) {            //It return true if '-' present in v
    return toBool(v.search('-'))
}

function checkPlus(v) {             //It return true if '+' present in v
    return toBool(v.search(/\+/))
}

function checkMul(v) {              //It return true if '*' present in v
    return toBool(v.search(/\*/))
}

function checkDiv(v) {            //It return true if '/' present in v
    return toBool(v.search('/'))
}
function checkSR(v) {
    return toBool(v.search(String.fromCharCode(8730)))      //8730 is ASCII code of √   
}

function checkID(target, value) {      //check any of four symbol click or not
    stat=document.getElementById('con')

    if (target.id=="MI" || target.id=="MU" || target.id=="PL" || target.id=="DI" || target.id=="SQ") {
        if (!checkAnysym(value)) {
            ans=perOpretion(value)
            stat.innerHTML=ans
            
        }
    }
    
}
