// Employee Management System in TypeScript

class Employee {
  private baseSalary: number;

  constructor(
    public empName: string = "John Doe",
    public empId: number = 0,
    salary: number = 100
  ) {
    this.baseSalary = salary;
  }

  computeBonus(): number {
    return this.baseSalary;
  }

  getSalary(): number {
    return this.baseSalary;
  }
}

class Manager extends Employee {
  constructor(
    empName: string,
    empId: number,
    salary: number,
    public department: string
  ) {
    super(empName, empId, salary);
  }

  computeBonus(): number {
    return this.getSalary() * 0.25;
  }
}

class Engineer extends Employee {
  constructor(
    empName: string,
    empId: number,
    salary: number,
    public project: string
  ) {
    super(empName, empId, salary);
  }

  computeBonus(): number {
    return this.getSalary() * 0.25;
  }
}

class Intern extends Employee {
  constructor(
    empName: string,
    empId: number,
    salary: number,
    public mentor: Engineer
  ) {
    super(empName, empId, salary);
  }

  computeBonus(): number {
    return this.getSalary() * 0.25;
  }
}

const generalEmployee = new Employee();
const mgr = new Manager("Johnathan Williams", 6, 560000, "HR");
const eng = new Engineer("Hoshiyumi Nagumo", 1, 450000, "Surgical Robot");
const intern = new Intern("Ulysses Yggrite", 2, 16000, eng);

console.log(
  `${generalEmployee.empName} Bonus: `,
  generalEmployee.computeBonus()
);
console.log(
  `${mgr.empName} (Dept: ${mgr.department}) Bonus: `,
  mgr.computeBonus()
);
console.log(
  `${eng.empName} (Project: ${eng.project}) Bonus: `,
  eng.computeBonus()
);
console.log(
  `${intern.empName} (Mentor: ${intern.mentor.empName}) Bonus: `,
  intern.computeBonus()
);
