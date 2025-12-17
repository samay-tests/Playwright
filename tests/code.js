let string= `Bug 10274: Events/ Announcements: Name is changed, 's' is removed from title
Bug 10250: Leaves/Admin/All Accruals: The count of the cards double when Admin removes all the filters
Bug 10260: Clients: The total count remains the same when the records are filtered
Bug 10262: Payroll/Monthly Payroll: No records found message does not appears when no record is present\
Bug 10266: Petty Cash/Vouchers: No records found message does not appears
Bug 10245: Daily Report: Incorrect cards count on heading when a timesheet contains multiple projects
Bug 10246: Leaves: user is able to apply leave multiple times for a day from Self/Leave Requests`

let x= string.split('Bug')
console.log(x[1])