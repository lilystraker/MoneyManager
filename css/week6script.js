// 22052506
// Lily Straker
// Thurs 1pm PS 
// COMP2020

// Code modified from exercise 6 and 6a of week 5 exercises

function newPage() {
    // Focus on the first field of the form
    document.getElementById('month').focus();
}

/**
* @param  {DOM Element} theForm 
* @return {Boolean} 
*/

let valid = true;
let isDayValid = true;
let isAmountValid = true;
let isCategoryValid = true;

// Global variables for all commonly used elements
var dayRow;
var day;
var dayValueError;
var categoryRow;
var amountRow;
var amount;
var amountValueError;
var rowErrorMessages;
var amountColl;

// already have 3 (0, 1, 2) elements on page
var elementNumIn = 2;
var elementNumOut = 2;

// Check whether fields in a row are mandatory or not when user inputs data in that row
function checkRow(obj, direction) {
    var elementNum = 0;
    isCategoryValid = true;
    
    // The user can submit any number of rows, from 0+.
    // I am assuming that if the user has no income or expenses to record, they may still want to submit data to their database...
    // ...for that month
    
    // Check whether user is inputting INCOME or EXPENSE values
    checkDirection(direction);
    
    // Find the current element and get its index number
    // Used to reference corresponding elements (e.g. get index number of day in order to reference the corresponding amount field)
    for (var i = 0; i < dayRow.length; i++) {
        if (obj == dayRow[i] || obj == categoryRow[i] || obj == amountRow[i]) {
            elementNum = i;
        }
    }
    
    // Check if a row does not have all fields filled out 
    // If any field is not empty, then the other fields on the same row must be required
    if ((dayRow[elementNum].value.length >= 1) || (categoryRow[elementNum].value != "No category chosen") || (amountRow[elementNum].value.length >= 1)) {
        // If the day field has not been selected 
        if (!dayRow[elementNum].value.length) {
            valid = false;     
            isDayValid = false;
            // Display error                                             
            rowErrorMessages[elementNum].style.display = "block";  
            // Apply red border to day field 
            dayRow[elementNum].style.border = "1px solid #ff0000";
            // Apply red background to day field
            dayRow[elementNum].style.backgroundColor = "#FF7272";  
        }
        // If the category field has not been selected 
        if ((categoryRow[elementNum].value == "No category chosen")) {
            valid = false;        
            isCategoryValid = false;                                             
            rowErrorMessages[elementNum].style.display = "block";  
            categoryRow[elementNum].style.border = "1px solid #ff0000 ";  
            categoryRow[elementNum].style.backgroundColor = "#FF7272";  
        }
        // If the amount field has not been selected 
        if ((!amountRow[elementNum].value.length)) {
            valid = false;   
            isAmountValid = false;                                                  
            rowErrorMessages[elementNum].style.display = "block"; 
            amountRow[elementNum].style.border = "1px solid #ff0000";  
            amountRow[elementNum].style.backgroundColor = "#FF7272";   
        }  
    } 
    else {
        // ensure error is hidden
        rowErrorMessages[elementNum].style.display = "none";    
    }
    // Check again if a row is still invalid
    // If not, reset styling of the relevant input box
    if (dayRow[elementNum].value.length >= 1 && isDayValid) {
        dayRow[elementNum].style.border = "1px solid #ccc";
        dayRow[elementNum].style.backgroundColor = "#FFF";  
    }
    if (categoryRow[elementNum].value != "No category chosen") {
        categoryRow[elementNum].style.border = "1px solid #ccc";
        categoryRow[elementNum].style.backgroundColor = "#FFF";  
    }
    
    if (amountRow[elementNum].value.length >= 1 && isAmountValid) {
        amountRow[elementNum].style.border = "1px solid #ccc";
        amountRow[elementNum].style.backgroundColor = "#FFF";  
    }
    // If all fields have data, error should not be prompted
    if ((dayRow[elementNum].value.length >= 1) && (categoryRow[elementNum].value != "No category chosen") && (amountRow[elementNum].value.length >= 1)) {
        rowErrorMessages[elementNum].style.display = "none";
    }

    return valid;
}

// Full form validation
// Triggered when user attempts to submit form
function validate (theForm) {
    var dayIn = document.getElementsByClassName("dayIn");
    var dayOut = document.getElementsByClassName("dayOut");
    var categoryIn = document.getElementsByClassName("categoryIn");
    var amountIn = document.getElementsByClassName("amountIn");
    var categoryOut = document.getElementsByClassName("categoryOut");
    var amountOut = document.getElementsByClassName("amountOut");
    
    // Check the validity of all inputs again
    if (!checkMonth() || !checkYear()) {
        return (valid = false);
    }
    
    // For all income rows
    for (var i = 0; i < dayIn.length; i++) {
        checkDayValid(dayIn[i], 'in', i);
        checkAmount(amountIn[i], 'in', i);
        checkRow(dayIn[i], 'in');
        checkRow(categoryIn[i], 'in');
        checkRow(amountIn[i], 'in');
        
        if (!isDayValid || !isAmountValid || !isCategoryValid) {
            return (valid = false);
        }
    }
    // For all expense rows
    for (var i = 0; i < dayOut.length; i++) {
        checkDayValid(dayOut[i], 'out', i);
        checkAmount(amountOut[i], 'out', i);
        checkRow(dayOut[i], 'out');
        checkRow(categoryOut[i], 'out');
        checkRow(amountOut[i], 'out');
        
        if (!isDayValid || !isAmountValid || !isCategoryValid) {
            return (valid = false);
        }
    }
    
    return valid;
}

// === MONTH ===
// Check validity of month input
// Prompted when user adjusts input in month box
function checkMonth() {
    const month = document.getElementById('month');
    const monthError = document.getElementById('monthValueError');

    // Month field is a required field
    // If empty, throw error
    if (!month.value.length) {
        valid = false;                                                          
        monthError.style.display = "block";  
        month.style.border = "1px solid #ff0000";  
    } else {
        monthError.style.display = "none";         
        month.style.border = "1px solid #ccc";
        
        // Check the month field has numbers between 1 and 12 inclusive 
        if ((month.value.length >= 1) && (month.value > 12 || month.value < 1)) {
            valid = false;                                                        
            monthError.style.display = "block";
            month.style.border = "1px solid #ff0000";                         
        } else {
            monthError.style.display = "none";        
            month.style.border = "1px solid #ccc";
            
            // Only allow 1 or 2 numerical digits
            const monthNumbers = /^[0-9]{1,2}$/;
            // test regex expression against user input
            const isMonthValid = monthNumbers.test(document.getElementById('month').value);
            
            // Show error if month does not only contain 1 or 2 integers
            if (!isMonthValid) {
                valid = false;                                                          
                monthError.style.display = "block";  
                month.style.border = "1px solid #ff0000";                        
            } else {
                monthError.style.display = "none";          
                month.style.border = "1px solid #ccc";                            
            }
            
        }
    }
    return valid;
}

// === YEAR ===
// Checks validity of year input
// Triggers when user enters input in year field
function checkYear() {
    // set maximum number for year input
    var currYear = 2023;

    const year = document.getElementById('year');
    const yearError = document.getElementById('yearValueError');

    // If year field is empty, show error as it is a required field
    if (!year.value.length) {
        valid = false;                                                          
        yearError.style.display = "block";  
        year.style.border = "1px solid #ff0000";                         
    } else {
        yearError.style.display = "none";        
        year.style.border = "1px solid #ccc";
        
        // Check it only accepts numbers
        if ((year.value < 1900) || (year.value > currYear)) {
            valid = false;                                                        
            yearError.style.display = "block";
            year.style.border = "1px solid #ff0000";                         
        } else {
            yearError.style.display = "none";        
            year.style.border = "1px solid #ccc";
            
            // Only allow 4 numerical digits
            const yearNumbers = /^[0-9]{4}$/;
            const isYearValid = yearNumbers.test(document.getElementById('year').value);
            
            // Check the year field only contains digits
            if (!isYearValid) {
                valid = false;                                                          
                yearError.style.display = "block";  
                year.style.border = "1px solid #ff0000";                        
            } else {
                yearError.style.display = "none";          
                year.style.border = "1px solid #ccc";                            
            }
            
        }
    } 
    return valid;
}

// === DAY ===
// Check day input
function checkDayValid(obj, direction, elementNum) {
    isDayValid = true;
    let i = elementNum;

    checkDirection(direction);
    const year = document.getElementById('year');
  	const month = document.getElementById('month');
    
    // Months with 30 days
    const smallMonths = ['4', '6', '9', '11'];
    
    // If month and day combo does not exist, show error
    if (((smallMonths.includes(month.value)) && (day[i].value == 31)) || ((month.value == '2') && (day[i].value > 28))) {
        // if leap year
        if ((parseInt(year.value) % 4 == 0)) {
            if (day[i].value > 29) {
                isDayValid = false;
            }
        }
        else {
            isDayValid = false;
        }
        
    }
    
    // Only allow 1 or 2 digit integers
    const dayNumbers = /^[0-9]{1,2}$/;
    const isInputValid = dayNumbers.test(day[i].value);
    
    // field must not be empty to check this
    if (day[i].value.length >= 1) {
        // if input is invalid
        if (!isInputValid) {
            isDayValid = false;
        }
        // check number is no more than 31 (for bigger months) and no less than 1
        else if (day[i].value < 1 || day[i].value > 31) {
            isDayValid = false;
        }
    }
    
    // Call function to activate errors if input is invalid 
    dayErrors(direction, i);
    valid = isDayValid;
    return valid;
}

// === AMOUNT ===
// Check amount field validity
function checkAmount(obj, direction, elementNum) { 
    // reinitialise whenever user changes amount input
    isAmountValid = true;
    // var isAmountValid = true;
    checkDirection(direction);
    
    // Following regex expression modified from Amadan's comment on StackOverflow:
    // https://stackoverflow.com/questions/65697060/regex-to-accept-15-digits-with-or-without-decimal
    // Allows any integer or decimal number (1 or 2 d.p.) with a maximum of 15 digits
    const amountNumbers = /^(?=(?:\d\D*){0,15}$)\d+(?:[.,]\d{1,2})?$/;
    const isInputValid = amountNumbers.test(obj.value);
    
    // field must not be empty to trigger a value error
    if (obj.value.length >= 1) {
        // if input is invalid
        if (!isInputValid) {
            isAmountValid = false;
        }
    }
  
    // Show amount errors if amount is not valid
    amountErrors(direction, elementNum);
    valid = isAmountValid;
    return valid;
}

// Calculate total income, total expenses, and savings
// Occurs whenever a user enters in an amount
function calculateIncomeExpenses(direction) {
    checkDirection(direction);
    
    let totalAmount = 0;
    
    for (var i = 0; i < amountColl.length; i++) {
        if (!amountColl[i].value.length || amountColl[i].value < 0 || isNaN(amountColl[i].value)) {
            // If amount is empty, negative, or not a number, then act like it has a value of 0
            totalAmount += 0;
        }
        else {
            // if amount is a valid number, add to total amount
            totalAmount += parseFloat(amountColl[i].value);
        }
    }
    
    // Adjust text on screen for income or expense sum (to 2 decimal places)
    if (direction == 'in') {
        document.getElementById("totalIncome").innerHTML = "$" + totalAmount.toFixed(2);
    }
    else {
        document.getElementById("totalExpenses").innerHTML = "$" + totalAmount.toFixed(2);
    }
    
    return totalAmount;
}

// Savings = Total Income - Total Expenses
// Calculate whenever a user enters in an amount
function calculateSavings() {
    var income = calculateIncomeExpenses('in');
    var expenses = calculateIncomeExpenses('out');
    // equation
    var savings = income - expenses;
    
    var savingsAmount = document.getElementById("savingsAmount");
    var savingsContainer = document.getElementById("savings");
    savingsAmount.innerHTML = "$" + savings.toFixed(2);
    
    var quarter = income / 4;
    // If savings is at least 25% of income, turn green
    if (savings >= quarter) {
        savingsContainer.style.backgroundColor = "#45c240"; 
        savingsContainer.style.color = "#202124"; 
    }
    // If savings is more than 0 but less than 25% of income, turn orange
    else if ((savings >= 0) && (savings < quarter)) {
        savingsContainer.style.backgroundColor = "#ffba70"; 
    }
    // If savings is negative, turn red
    else if (savings < 0) {
        savingsContainer.style.backgroundColor = "#ff7272"; 
    }
    // Default styling
    else {
        savingsContainer.style.backgroundColor = "#202124";
        savingsContainer.style.color = "white";  
    }
}

// This function enables the user to add another row of income fields
// These are identical to those already on the web page
// Occurs when user presses respective button
function afterTextIncome() {
    // every time a row is added, its element number will be increased to match its position
    elementNumIn++;

    // new content will be added to the addNewI container
    const incomeContainer = document.getElementById("addNewI");
    const newIncomeRow = document.createElement("div");
    // Add a new incomeRow as a div
    newIncomeRow.classList.add("incomeRow");
    // New content to be added
    newIncomeRow.innerHTML = `
    <div class = "inputDevice">
    <input name = "dayIn" type = "text" id = "day" class = "dayIn" min = "1" max = "31" placeholder = "dd" onblur = "checkRow(this, 'in'); checkDayValid(this, 'in', ` + elementNumIn + `);">
    </div>
    
    <div class = "inputDevice">
    <select name = "incomeType" id = "incomeType" class = "categoryIn" onblur = "checkRow(this, 'in')">
    <option selected>No category chosen</option>
    <option value = "wages">Salary/Wages</option>
    <option value = "tips">Tips</option>
    <option value = "interest">Interest</option>
    <option value = "dividends">Dividends</option>
    <option value = "other">Other</option>
    </select>
    </div>
    <div class = "inputDevice">
    <input type = "text" name = "amountIn" class = "amountIn" step = "any" placeholder="0.00" id = "amount" min = "0" onblur = "checkRow(this, 'in'); checkAmount(this, 'in', ` + elementNumIn + `); calculateIncomeExpenses('in'); calculateSavings();">
    </div>
    
    <br><br><span class = "rowInErrorMessages" id = "rowError">* Fill out the rest of this row</span>  
    <span class = "amountInValueError"><br>Only enter positive numbers for the amount<br>(max 15 digits and up to 2 decimal places)</span> 
    <span class = "dayInValueError">Only enter numbers between 1 and the last day of the month</span>
    `;
    
    // Add new content to page
    incomeContainer.append(newIncomeRow);
}

// This function enables the user to add another row of expense fields
// Occurs when user presses respective button
function afterTextExpenses() {
    elementNumOut++;

    const expensesContainer = document.getElementById("addNewE");
    const newExpensesRow = document.createElement("div");
    newExpensesRow.classList.add("expenseRow");
    newExpensesRow.innerHTML = `                                                     
    <div class = "inputDevice">
    <!-- <input type = "date" id = "date"> -->
    <input name = "dayOut" type = "text" id = "day" class = "dayOut" min = "1" max = "31" placeholder = "dd" onblur = "checkRow(this, 'out'); checkDayValid(this, 'out', ` + elementNumOut + `);"> 
    </div>
    
    <div class = "inputDevice">
    <select name = "expenseType" id = "expenseType" class = "categoryOut" onblur = "checkRow(this, 'out')">
    <option selected>No category chosen</option>
    <option value = "rent">Rent/Mortgage</option>
    <option value = "transport">Transport</option>
    <option value = "food">Food</option>
    <option value = "health">Health</option>
    <option value = "education">Education</option>
    <option value = "lifestyle">Lifestyle</option>
    <option value = "other">Other</option>
    </select>
    </div>
    <div class = "inputDevice">
    <input type = "text" name = "amountOut" class = "amountOut" step = "any" placeholder="0.00" id = "amount" min = "0" onblur = "checkRow(this, 'out'); checkAmount(this, 'out',` + elementNumOut + `); calculateIncomeExpenses('out'); calculateSavings();">
    </div>
    <br><br>
    <span class = "rowOutErrorMessages" id = "rowError">* Fill out the rest of this row</span>  
    <span class = "amountOutValueError"><br>Only enter positive numbers for the amount<br>(max 15 digits and up to 2 decimal places)</span>  
    <span class = "dayOutValueError">Only enter numbers between 1 and the last day of the month</span>
    
    `;
    expensesContainer.append(newExpensesRow);
}

// If day input is invalid, show an error 
function dayErrors(direction, i) {
    
    checkDirection(direction);
    
    if (!isDayValid) {
        dayValueError[i].style.display = "block";
        day[i].style.border = "1px solid #ff0000";  
        day[i].style.backgroundColor = "#FF7272";   
    }
    else {
        dayValueError[i].style.display = "none";          
        day[i].style.border = "1px solid #ccc"; 
        day[i].style.backgroundColor = "white";   
    }
}

// This function checks whether the user is entering into an income field or expense field
// The rows in the income group and the rows in the expenses group are treated like two different arrays
// incomeRows: [incomeRow, incomeRow, incomeRow, ...]
// expenseRows: [expenseRow, expenseRow, expenseRow, ...]
// This allows for more rows to be added to each 'array'
// Thus, we need a function to check whether we want to use income elements or expense elements 
function checkDirection(direction) {
    // Income fields
    var dayRowIn = document.getElementsByClassName("dayIn");
    var dayValueErrorIn = document.getElementsByClassName("dayInValueError");
    var categoryRowIn = document.getElementsByClassName("categoryIn");
    var amountIn = document.getElementsByClassName("amountIn");
    var amountValueErrorIn = document.getElementsByClassName("amountInValueError");
    var rowErrorMessagesIn = document.getElementsByClassName("rowInErrorMessages");
    
    // Expense fields
    var dayRowOut = document.getElementsByClassName("dayOut");
    var dayValueErrorOut = document.getElementsByClassName("dayOutValueError");
    var categoryRowOut = document.getElementsByClassName("categoryOut");
    var amountOut = document.getElementsByClassName("amountOut");
    var amountValueErrorOut = document.getElementsByClassName("amountOutValueError");
    var rowErrorMessagesOut = document.getElementsByClassName("rowOutErrorMessages");
    
    // If entering into income field
    if (direction == 'in') {
        dayRow = dayRowIn;
        day = dayRowIn;
        dayValueError = dayValueErrorIn;
        categoryRow = categoryRowIn;
        amountRow = amountIn;
        amount = amountIn;
        amountColl = amountIn;
        amountValueError = amountValueErrorIn;
        rowErrorMessages = rowErrorMessagesIn; 
    }
    // If entering into expense field
    else {
        day = dayRowOut;
        dayRow = dayRowOut;
        dayValueError = dayValueErrorOut;
        categoryRow = categoryRowOut;
        amount = amountOut;
        amountRow = amountOut;
        amountColl = amountOut;
        amountValueError = amountValueErrorOut;
        rowErrorMessages = rowErrorMessagesOut; 
    }
    
}

// Show errors if the amount value is invalid
function amountErrors(direction, i) {
    // Get appropriate elements
    checkDirection(direction);
    
    if (!isAmountValid) {
        amountValueError[i].style.display = "block";
        amount[i].style.border = "1px solid #ff0000";  
        amount[i].style.backgroundColor = "#FF7272";   
    }
    else {
        amountValueError[i].style.display = "none";          
        amount[i].style.border = "1px solid #ccc"; 
        amount[i].style.backgroundColor = "white";   
    }
}