// Employee Management System

class Employee {
  #baseSalary;
  constructor(empName = "John Doe", empId = 0, salary = 100) {
    this.empName = empName;
    this.empId = empId;
    this.#baseSalary = salary;
  }

  computeBonus() {
    return this.#baseSalary;
  }
  getSalary() {
    return this.#baseSalary;
  }
}

class Manager extends Employee {
  constructor(empName, empId, salary, dept) {
    super(empName, empId, salary);
    this.department = dept;
  }
  computeBonus() {
    return this.getSalary() * 0.25;
  }
}

class Engineer extends Employee {
  constructor(empName, empId, salary, assignedProject) {
    super(empName, empId, salary);
    this.project = assignedProject;
  }
  computeBonus() {
    return this.getSalary() * 0.25;
  }
}

class Intern extends Employee {
  constructor(empName, empId, salary, mentor) {
    super(empName, empId, salary);
    this.mentor = mentor;
  }
  computeBonus() {
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

// Vehicle Rental System

class Vehicle {
  constructor(brand, model, dailyRent) {
    this.brand = brand;
    this.model = model;
    this.dailyRent = Number(dailyRent);
  }
}

class Car extends Vehicle {
  constructor(brand, model, dailyRent, seatingCapacity = 4, color) {
    super(brand, model, dailyRent);
    this.seats = Number(seatingCapacity);
    this.color = color;
  }

  calculateRentalFee(days) {
    return this.dailyRent * Number(days) * (this.seats * 0.5);
  }
}

class Bike extends Vehicle {
  constructor(brand, model, dailyRent, category) {
    super(brand, model, dailyRent);
    this.category = category;
  }

  calculateRentalFee(days) {
    let extraCost = 0;
    if (this.category === "sports") extraCost = 250;
    if (this.category === "chopper") extraCost = 350;
    if (this.category === "economy") extraCost = 100;
    return this.dailyRent * Number(days) + extraCost;
  }
}

class Truck extends Vehicle {
  constructor(brand, model, dailyRent, hasExtension) {
    super(brand, model, dailyRent);
    this.hasExtension = hasExtension;
  }

  calculateRentalFee(days) {
    return this.dailyRent * days + (this.hasExtension ? 150 : 0);
  }
}

const sedan = new Car("Toyota", "Essilion", 250, 4, "Moon Silver");
const motorcycle = new Bike("Suzuki", "Crescent", 130, "sports");
const freightTruck = new Truck("Mercedes", "750TWS", 670, true);

console.log(sedan.calculateRentalFee(43));
console.log(motorcycle.calculateRentalFee(23));
console.log(freightTruck.calculateRentalFee(67));

// Online Payment System

class Payment {
  constructor(amount, date) {
    this.amount = Number(amount);
    this.transactionDate = new Date(date);
  }
  processPayment() {
    console.log(
      `Amount: ${this.amount} | Transaction Date: ${this.transactionDate}`
    );
  }
}

class CreditCardPayment extends Payment {
  #cardNumber;
  #pin;
  constructor(amount, date, cardHolder, cardNumber, pin) {
    super(amount, date);
    this.cardHolder = cardHolder;
    this.#cardNumber = cardNumber;
    this.#pin = pin;
  }
}

class PayPalPayment extends Payment {
  #password;
  constructor(amount, date, userId, email, password) {
    super(amount, date);
    this.userId = userId;
    this.email = email;
    this.#password = password;
  }
}

class CryptoPayment extends Payment {
  #privateKey;
  constructor(amount, date, privateKey, walletAddress, cryptoType) {
    super(amount, date);
    this.#privateKey = privateKey;
    this.walletAddress = walletAddress;
    this.cryptoType = cryptoType;
  }
}
