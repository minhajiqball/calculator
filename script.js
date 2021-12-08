class Calculator {
    constructor(prevOperandTextElement, currentOperandTextElement) {
        this.prevOperandTextElement= prevOperandTextElement
       this  .currentOperandTextElement  = currentOperandTextElement  
    this.clear()
  }

       clear(){
           this.currentOperand = ''
           this.prevOperand = ''
           this.operation = undefined

       }

       delete() {
           this.currentOperand = this.currentOperand.toString().slice(0, -1)

       }

       appendNumber(number){
           if(number === '.' && this.currentOperand.includes('.')) return
           this.currentOperand = this.currentOperand.toString() + number.toString()

       }

       chooseOperation(operation){
           if(this.currentOperand==='')return
           if(this.prevOperand !==''){
               this.compute()
           }
           this.operation = operation
           this.prevOperand = this.currentOperand
           this.currentOperand = ''

       }


       compute(){
           let computation 
           const prev = parseFloat(this.prevOperand)
           const current = parseFloat(this.currentOperand)
           if(isNaN(prev) || isNaN(current)) return
           switch(this.operation){
            case '+':
                computation = prev + current 
                break 
                case '-':
                    computation = prev - current 
                    break 
                    case '*':
                        computation = prev * current 
                        break 
                        case '÷':
                            computation = prev / current 
                            break
                            default:
                                return 

           }
this.currentOperand = computation
this.operation = undefined
this.prevOperand = ''

       }

       getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])  
        const floatNumber = parseFloat(number)
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay 
           
           if(isNaN(floatNumber)) {
               integerDisplay = ''
           }else{
               integerDisplay = integerDigits.toLocaleString('en',{
                   maximumFractionDigits: 0
               })
           }   
           if(decimalDigits != null){
               return `${integerDisplay}.${decimalDigits}`
           }else{
               return integerDisplay
           }
       }

       updateDisplay(){
           this.currentOperandTextElement.innerText = 
 this.getDisplayNumber(this.currentOperand)
           if( this.operation !=null){
           this.prevOperandTextElement.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
           }else{
               this.prevOperandTextElement.innerText = ''
           }
}
}



const numberButtons= document.querySelectorAll('[data-number]')
const operationButtons= document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const  deleteButton = document.querySelector('[data-delete]')
const  allClearButton = document.querySelector('[data-all-clear]')
const  prevOperandTextElement = document.querySelector('[data-prev-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator( prevOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
     calculator.appendNumber(button.innerText)
     calculator.updateDisplay()   
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
     calculator.chooseOperation(button.innerText)
     calculator.updateDisplay()   
    })
})
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})