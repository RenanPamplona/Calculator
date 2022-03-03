class Calculator {
   constructor(previousNumberElement, currentNumberElement) {
      this.previousNumberElement = previousNumberElement
      this.currentNumberElement = currentNumberElement
      this.clear()
   }

   clear() {
      this.previousNumberText = ''
      this.currentNumberText = ''
      this.operation = undefined
   }

   delete() {
      this.currentNumberText = this.currentNumberText.toString().slice(0, -1)
   }

   addNumber(number) {
      if (number == '.' && this.currentNumberText.includes('.')) return
      this.currentNumberText = (this.currentNumberText).toString() + (number).toString()
   }

   chooseOperation(operation) {
      if (this.currentNumberText.toString() === '') return
      if (this.previousNumberText != '') {
         this.operate()
      }
      this.operation = operation
      this.previousNumberText = this.currentNumberText
      this.currentNumberText = ''
   }

   operate() {
      let previous = parseFloat(this.previousNumberText)
      let current = parseFloat(this.currentNumberText)
      let result
      if (isNaN(previous) || isNaN(current)) return
      switch (this.operation) {
         case '÷':
            result = previous / current
            break
         case 'x':
            result = previous * current
            break
         case '+':
            result = previous + current
            break
         case '-':
            result = previous - current
            break
         default:
            return
      }
      this.currentNumberText = result
      this.operation = undefined
      this.previousNumberText = ''
   }

   getDisplayNumber(number){
      const numberToString = number.toString()
      const integerDigits = parseFloat(numberToString.split('.')[0])
      const decimalDigits = numberToString.split('.')[1]
      let integerDisplay
      if(isNaN(integerDigits)){
         integerDisplay = ''
      } else {
         integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
      }
      if(decimalDigits != null){
         return `${integerDisplay}.${decimalDigits}`
      } else {
         return integerDisplay
      }
   }

   updateDisplay() {
      this.currentNumberElement.innerHTML = this.getDisplayNumber(this.currentNumberText)
      if(this.operation != null){
         this.previousNumberElement.innerHTML = `${this.getDisplayNumber(this.previousNumberText)} ${this.operation}`
      } else {
         this.previousNumberElement.innerHTML = ''
      }
      
   }
}



const previousNumberElement = document.querySelector('span.previous-number')
const currentNumberElement = document.querySelector('span.current-number')
const numberButtons = document.querySelectorAll('button.number')
const operationButtons = document.querySelectorAll('button.operation')
const allClearButton = document.querySelector('button.ac')
const delButton = document.querySelector('button.del')
const equalsButton = document.querySelector('button.equal')

const calculator = new Calculator(previousNumberElement, currentNumberElement)

numberButtons.forEach(button => {
   button.addEventListener('click', () => {
      calculator.addNumber(button.innerHTML)
      calculator.updateDisplay()
   })
})

allClearButton.addEventListener('click', () => {
   calculator.clear()
   calculator.updateDisplay()
})

delButton.addEventListener('click', () => {
   calculator.delete()
   calculator.updateDisplay()
})

operationButtons.forEach(button => {
   button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerHTML)
      calculator.updateDisplay()
   })
})

equalsButton.addEventListener('click', () => {
   calculator.operate()
   calculator.updateDisplay()
})

document.addEventListener('keydown', function(event) {
   if(event.keyCode == 48){
      Array.from(document.querySelectorAll('button')).find(el => el.textContent === '0').click()
   }
   if(event.keyCode == 49){
      Array.from(document.querySelectorAll('button')).find(el => el.textContent === '1').click()
   }
   if(event.keyCode == 50){
      Array.from(document.querySelectorAll('button')).find(el => el.textContent === '2').click()
   }
   if(event.keyCode == 51){
      Array.from(document.querySelectorAll('button')).find(el => el.textContent === '3').click()
   }
   if(event.keyCode == 52){
      Array.from(document.querySelectorAll('button')).find(el => el.textContent === '4').click()
   }
   if(event.keyCode == 53){
      Array.from(document.querySelectorAll('button')).find(el => el.textContent === '5').click()
   }
   if(event.keyCode == 54){
      Array.from(document.querySelectorAll('button')).find(el => el.textContent === '6').click()
   }
   if(event.keyCode == 55){
      Array.from(document.querySelectorAll('button')).find(el => el.textContent === '7').click()
   }
   if(event.keyCode == 56){
      Array.from(document.querySelectorAll('button')).find(el => el.textContent === '8').click()
   }
   if(event.keyCode == 57){
      Array.from(document.querySelectorAll('button')).find(el => el.textContent === '9').click()
   }
   if(event.keyCode == 8){
      Array.from(document.querySelectorAll('button')).find(el => el.textContent === 'Del').click()
   }
})
