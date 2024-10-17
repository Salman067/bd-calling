// import mongoose from 'mongoose';
// import { Transaction } from './transaction.js';

// export class Wallet extends mongoose.Document {
//   constructor(userId, balance = 0) {
//     super(); 
//     this.userId = userId; 
//     this.balance = balance; 
//     this.transactions = [];
//   }

//   addTransaction(amount, date, type, ref) {
//     const transaction = new Transaction(amount, date, type, ref);
//     this.transactions.push(transaction);
    
//     if (type === 'credit') {
//       this.balance += amount; 
//     } else if (type === 'debit') {
//       this.balance -= amount; 
//     }
//   }
// }
