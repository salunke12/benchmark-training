// Vehicle Rental System in TypeScript

class Vehicle {
  constructor(
    public brand: string,
    public model: string,
    protected dailyRent: number
  ) {}
}

class Car extends Vehicle {
  constructor(
    brand: string,
    model: string,
    dailyRent: number,
    public seats: number = 4,
    public color: string
  ) {
    super(brand, model, dailyRent);
  }

  calculateRentalFee(days: number): number {
    return this.dailyRent * days * (this.seats * 0.5);
  }
}

class Bike extends Vehicle {
  constructor(
    brand: string,
    model: string,
    dailyRent: number,
    public category: "sports" | "chopper" | "economy"
  ) {
    super(brand, model, dailyRent);
  }

  calculateRentalFee(days: number): number {
    let extraCost = 0;
    switch (this.category) {
      case "sports":
        extraCost = 250;
        break;
      case "chopper":
        extraCost = 350;
        break;
      case "economy":
        extraCost = 100;
        break;
    }
    return this.dailyRent * days + extraCost;
  }
}

class Truck extends Vehicle {
  constructor(
    brand: string,
    model: string,
    dailyRent: number,
    public hasExtension: boolean
  ) {
    super(brand, model, dailyRent);
  }

  calculateRentalFee(days: number): number {
    return this.dailyRent * days + (this.hasExtension ? 150 : 0);
  }
}

const sedan = new Car("Toyota", "Essilion", 250, 4, "Moon Silver");
const motorcycle = new Bike("Suzuki", "Crescent", 130, "sports");
const freightTruck = new Truck("Mercedes", "750TWS", 670, true);

console.log(sedan.calculateRentalFee(43));
console.log(motorcycle.calculateRentalFee(23));
console.log(freightTruck.calculateRentalFee(67));
