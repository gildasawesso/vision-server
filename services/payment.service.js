const moment = require('moment');

const context = require('./db_context');

module.exports = {
  studentPayments: async studentId => {
    const payments = await context.payments.find({ student: studentId });
  },

  paymentAmountForFee: (feeId, payments) => {
    const feePayments = payments.map(p => {
      const paymentLine = p.paymentLines.find(line => line.fee.toString() === feeId.toString());
      return paymentLine ? paymentLine.amount : 0;
    });
    return feePayments.reduce((acc, cur) => acc + cur, 0);
  },

  otherPaymentsAmount: (classroom, payments) => {
    const paymentLines = payments.flatMap(payment => payment.paymentLines);
    const otherPaymentLines = paymentLines
      .filter(line => line.fee.toString() !== classroom.registrationFee.toString() &&
        line.fee.toString() !== classroom.reregistrationFee.toString() &&
        line.fee.toString() !== classroom.schoolFee.toString()
      );
    return otherPaymentLines.reduce((acc, cur) => acc + cur.amount, 0);
  },

  feePayedByTranche: (amountPayed, tranches) => {
    let payed = amountPayed;
    return tranches.map(tranche => {
      if (payed < tranche.amount) {
        const payedTranche =  {
          name: tranche.name,
          trancheAmount: tranche.amount,
          payed
        }
        payed = 0;
        return payedTranche;
      }

      if (payed >= tranche.amount) {
        const payedTranche = {
          name: tranche.name,
          trancheAmount: tranche.amount,
          payed: tranche.amount
        }
        payed = payed - tranche.amount;
        return payedTranche;
      }
    });
  },

  reductionAmountForFee: async (feeId, reductions) => {
    const feeReduction = reductions.find(r => r.fee.toString() === feeId.toString());
    if (feeReduction === undefined) return 0;

    const fee = await context.fees.one(feeId);
    if (feeReduction.reductionType === 'percentage') {
      return feeReduction.reduction / 100 * fee.amount;
    } else {
      return feeReduction.reduction;
    }
  }
};
