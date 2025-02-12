// Abstract Payment class
abstract class Payment {
  constructor(public amount: number, public transactionDate: Date) {}

  abstract processPayment(): void; // Abstract method to be implemented in subclasses
}

// CreditCardPayment subclass
class CreditCardPayment extends Payment {
  constructor(amount: number, date: string, public cardHolder: string) {
    super(amount, new Date(date));
  }

  processPayment(): void {
    console.log(
      `Credit Card Payment: $${this.amount} on ${this.transactionDate}`
    );
    console.log(`Card Holder: ${this.cardHolder}`);
  }
}

// PayPalPayment subclass
class PayPalPayment extends Payment {
  constructor(amount: number, date: string, public userId: string) {
    super(amount, new Date(date));
  }

  processPayment(): void {
    console.log(`PayPal Payment: $${this.amount} on ${this.transactionDate}`);
    console.log(`User ID: ${this.userId}`);
  }
}

// CryptoPayment subclass
class CryptoPayment extends Payment {
  constructor(amount: number, date: string, public walletAddress: string) {
    super(amount, new Date(date));
  }

  processPayment(): void {
    console.log(`Crypto Payment: $${this.amount} on ${this.transactionDate}`);
    console.log(`Wallet Address: ${this.walletAddress}`);
  }
}

// Example usage
const creditCardPayment = new CreditCardPayment(
  150.75,
  "2025-02-12",
  "John Doe"
);
const paypalPayment = new PayPalPayment(99.99, "2025-02-12", "user123");
const cryptoPayment = new CryptoPayment(
  0.25,
  "2025-02-12",
  "1A2B3C4D5E6F7G8H9I"
);

creditCardPayment.processPayment();
paypalPayment.processPayment();
cryptoPayment.processPayment();
