// 1. Create Employee interface
interface Employee {
  id: number;
  name: string;
  position: string;
  salary: number;
}

// 2. Create Manager interface extending Employee
interface Manager extends Employee {
  teamSize: number;
}

// 3. Create Department class
class Department {
  private employees: Employee[] = [];

  addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  removeEmployee(id: number): void {
    this.employees = this.employees.filter((emp) => emp.id !== id);
  }

  getTotalSalary(): number {
    return this.employees.reduce((total, emp) => total + emp.salary, 0);
  }

  listEmployees(): void {
    console.log(this.employees);
  }
}

// 4. Implement GenericStorage<T> class
class GenericStorage<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  remove(item: T): void {
    this.items = this.items.filter((storedItem) => storedItem !== item);
  }

  getAll(): T[] {
    return this.items;
  }
}

// 5. Utility function to update salary
function updateSalary<T extends Employee>(employee: T, newSalary: number): T {
  return { ...employee, salary: newSalary };
}

// Example Usage:
const dept = new Department();
const emp1: Employee = {
  id: 1,
  name: "Alice",
  position: "Developer",
  salary: 70000,
};
const emp2: Manager = {
  id: 2,
  name: "Bob",
  position: "Manager",
  salary: 90000,
  teamSize: 5,
};

dept.addEmployee(emp1);
dept.addEmployee(emp2);

dept.listEmployees();
console.log("Total Salary:", dept.getTotalSalary());

dept.removeEmployee(1);
dept.listEmployees();

const updatedEmp = updateSalary(emp2, 95000);
console.log("Updated Employee:", updatedEmp);

/*
Output:
[
  { id: 1, name: 'Alice', position: 'Developer', salary: 70000 },
  { id: 2, name: 'Bob', position: 'Manager', salary: 90000, teamSize: 5 }
]
Total Salary: 160000
[
  { id: 2, name: 'Bob', position: 'Manager', salary: 90000, teamSize: 5 }
]
Updated Employee: { id: 2, name: 'Bob', position: 'Manager', salary: 95000, teamSize: 5 }
*/
