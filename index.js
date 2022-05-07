// Your code here
function createEmployeeRecord(employee) {

    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3], 
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
   return employees.map(employee => createEmployeeRecord(employee)) 
}

function createTimeInEvent(employee, event) {
    let [date, hour] = event.split(" ")
    let eventObj = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    }
    employee.timeInEvents.push(eventObj)
    return employee
}

function createTimeOutEvent(employee, event) {
    let [date, hour] = event.split(" ")
    let eventObj = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    }
    employee.timeOutEvents.push(eventObj)
    return employee
}

const hoursWorkedOnDate = (array, date) => {
    let hours;
    for (let i = 0; i < array.timeInEvents.length; i++) {
        if (array.timeInEvents[i].date === date) {
            if (array.timeOutEvents[i].date === date) {
                hours = array.timeOutEvents[i].hour - array.timeInEvents[i].hour
            }
        }
    }
    return hours/100
}

function wagesEarnedOnDate(array, date) {
    return (hoursWorkedOnDate(array, date)) * array.payPerHour
}

const allWagesFor = (targetDate) => {
    let allPay = [];
    let allDates = [];

    for (let i =0; i < targetDate.timeInEvents.length; i++) {
        allDates.push(targetDate.timeInEvents[i].date)
    }

    allDates.forEach(date => {
        allPay.push(wagesEarnedOnDate(targetDate, date))
    })

    return allPay.reduce((previousValue, currentValue) => previousValue + currentValue)
}

const calculatePayroll = (arrayRecordObj) => {
    let payroll = [];

    arrayRecordObj.forEach(employee => {
        payroll.push(allWagesFor(employee))
    });
    return payroll.reduce((previousValue, currentValue) => previousValue + currentValue)
}