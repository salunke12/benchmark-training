"use strict";
var Category;
(function (Category) {
    Category["Food"] = "Food";
    Category["Travel"] = "Travel";
    Category["Bills"] = "Bills";
    Category["Shopping"] = "Shopping";
})(Category || (Category = {}));
class ExpenseTracker {
    constructor() {
        this.expenses = [];
        this.loadExpenses();
        this.renderExpenses();
        document
            .getElementById("expense-form")
            .addEventListener("submit", this.addExpense.bind(this));
        document
            .getElementById("filter-category")
            .addEventListener("change", this.renderExpenses.bind(this));
        document
            .getElementById("filter-date")
            .addEventListener("input", this.renderExpenses.bind(this));
    }
    loadExpenses() {
        const savedExpenses = localStorage.getItem("expenses");
        this.expenses = savedExpenses ? JSON.parse(savedExpenses) : [];
    }
    saveExpenses() {
        localStorage.setItem("expenses", JSON.stringify(this.expenses));
    }
    addExpense(event) {
        event.preventDefault();
        const amount = parseFloat(document.getElementById("amount").value);
        const category = document.getElementById("category")
            .value;
        const date = document.getElementById("date").value;
        const description = document.getElementById("description").value;
        if (!amount || !category || !date) {
            alert("Please fill in all required fields.");
            return;
        }
        const newExpense = {
            id: Date.now(),
            amount,
            category,
            date,
            description,
        };
        this.expenses.push(newExpense);
        this.saveExpenses();
        this.renderExpenses();
        document.getElementById("expense-form").reset();
    }
    renderExpenses() {
        const list = document.getElementById("expense-list");
        list.innerHTML = "";
        const filterCategory = document.getElementById("filter-category").value;
        const filterDate = document.getElementById("filter-date").value;
        const filteredExpenses = this.expenses.filter((expense) => (filterCategory === "" || expense.category === filterCategory) &&
            (filterDate === "" || expense.date === filterDate));
        filteredExpenses.forEach((expense) => {
            const li = document.createElement("li");
            li.textContent = `${expense.date} - ${expense.category}: ₹${expense.amount} (${expense.description})`;
            list.appendChild(li);
        });
    }
}
new ExpenseTracker();
//# sourceMappingURL=script.js.map