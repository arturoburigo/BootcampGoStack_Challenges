import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { transactions } = this;
    const income = transactions
      .filter(transaction => transaction.type === 'income') // filtra as transacoes que tiverem o tipo income
      .map(item => item.value) // mapeia os valores do item
      .map(item => Number(item)) // Numbher do item
      .reduce((accum, curr) => accum + curr, 0);

    const outcome = transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(item => item.value)
      .map(item => Number(item))
      .reduce((accum, curr) => accum + curr, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
