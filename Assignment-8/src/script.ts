interface Expense {
  id: number;
  amount: number;
  category: Category;
  date: string;
  description: string;
}

enum Category {
  Food = "Food",
  Travel = "Travel",
  Bills = "Bills",
  Shopping = "Shopping",
}

class ExpenseTracker {
  private expenses: Expense[] = [];

  constructor() {
    this.loadExpenses();
    this.renderExpenses();
    document
      .getElementById("expense-form")!
      .addEventListener("submit", this.addExpense.bind(this));
    document
      .getElementById("filter-category")!
      .addEventListener("change", this.renderExpenses.bind(this));
    document
      .getElementById("filter-date")!
      .addEventListener("input", this.renderExpenses.bind(this));
  }

  private loadExpenses(): void {
    const savedExpenses = localStorage.getItem("expenses");
    this.expenses = savedExpenses ? JSON.parse(savedExpenses) : [];
  }

  private saveExpenses(): void {
    localStorage.setItem("expenses", JSON.stringify(this.expenses));
  }

  private addExpense(event: Event): void {
    event.preventDefault();
    const amount = parseFloat(
      (document.getElementById("amount") as HTMLInputElement).value
    );
    const category = (document.getElementById("category") as HTMLSelectElement)
      .value as Category;
    const date = (document.getElementById("date") as HTMLInputElement).value;
    const description = (
      document.getElementById("description") as HTMLInputElement
    ).value;

    if (!amount || !category || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    const newExpense: Expense = {
      id: Date.now(),
      amount,
      category,
      date,
      description,
    };

    this.expenses.push(newExpense);
    this.saveExpenses();
    this.renderExpenses();
    (document.getElementById("expense-form") as HTMLFormElement).reset();
  }

  private renderExpenses(): void {
    const list = document.getElementById("expense-list")!;
    list.innerHTML = "";

    const filterCategory = (
      document.getElementById("filter-category") as HTMLSelectElement
    ).value;
    const filterDate = (
      document.getElementById("filter-date") as HTMLInputElement
    ).value;

    const filteredExpenses = this.expenses.filter(
      (expense) =>
        (filterCategory === "" || expense.category === filterCategory) &&
        (filterDate === "" || expense.date === filterDate)
    );

    filteredExpenses.forEach((expense) => {
      const li = document.createElement("li");
      li.textContent = `${expense.date} - ${expense.category}: ₹${expense.amount} (${expense.description})`;
      list.appendChild(li);
    });
  }
}

new ExpenseTracker();
