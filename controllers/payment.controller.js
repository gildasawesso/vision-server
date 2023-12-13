const moment = require('moment');

const context = require('../services/db_context');
const { userSchool } = require('../services/users.service');
const { paymentAmountForFee, reductionAmountForFee, feePayedByTranche, otherPaymentsAmount } = require('../services/payment.service');

module.exports = {

  integration: async (req, res) => {
    let payments = await context.payments.find({});
    payments = payments.map(payment => {
      payment.paymentLines = payment.paymentLines.map(line => {
        return {
          feeId: line.fee._id,
          amount: line.amount,
        };
      });
      delete payment.createdAt;
      return payment;
    });

    let cpt = 0;
    for (let payment of payments) {
      await context.payments.update(payment._id, payment);
      cpt += 1;
    }
    console.log(cpt);

    return res.json(cpt);
  },

  get: async (req, res) => {
    const payments = await context.payments.Model
      .find({ school: req.school, schoolYear: req.schoolYear })
      .sort({ _id: -1 })
      .lean()
      .populate('_student', 'firstname lastname')
      .populate('_classroom', 'name');


    return res.json(payments);
  },

  one: async (req, res) => {
    const payments = await context.payments.one(req.params.id);

    return res.json(payments);
  },

  student: async (req, res) => {
    const payments = await context.payments.find({ student: req.params.id, schoolYear: req.schoolYear });
    return res.json(payments);
  },

  feePayments: async (req, res) => {
    const payments = await context.payments.find({
      student: req.params.id,
      schoolYear: req.schoolYear,
      'paymentLines.feeId': req.params.feeId,
    });
    const paymentLines = payments.map(payment => payment.paymentLines.find(line => line.feeId === req.params.feeId));
    const amount = paymentLines.reduce((acc, cur) => acc + (+cur.amount), 0);
    return res.json(amount);
  },

  feeRemainingPayment: async (req, res) => {
    const payments = await context.payments.find({
      student: req.params.id,
      schoolYear: req.schoolYear,
      'paymentLines.feeId': req.params.feeId,
    });
    return res.json(payments);
  },

  test: async (req, res) => {
    const p = otherPaymentsAmount();
  },

  stateback: async (req, res) => {
    const { schoolYear } = req;
    const { school } = req;
    const classrooms = await context.classrooms.find({ school });

    const registrationsPerClassroom = await Promise.all(classrooms.map(async classroom => {
      let registrations = await context.registrations.Model
        .find({ classroom, schoolYear })
        .lean()
        .populate('student', 'firstname lastname');
      registrations = registrations.filter(registration => registration.student != null);
      return [classroom._id, registrations]
    }));

    const allClassroomsState = await Promise.all(registrationsPerClassroom.map(async classroomRegistrations => {

    }));

    res.json(registrationsPerClassroom);



    // const allClassroomsState = await Promise.all(
    //   classrooms.map(async classroom => {
    //     let registrations = await context.registrations.Model
    //       .find({ classroom, schoolYear })
    //       .lean()
    //       .populate('student', 'firstname lastname');
    //     registrations = registrations.filter(registration => registration.student != null);
    //
    //     const currentClassroomStudentsState = []
    //
    //     for (let registration of registrations) {
    //         const { student, reductions } = registration;
    //         if (student === undefined || student == null) return [null, null];
    //         const isNewStudent = registration.isNewStudent || !registration.isReregistration;
    //         const registrationFee = isNewStudent ? await context.fees.one(classroom.registrationFee) : await context.fees.one(classroom.reregistrationFee);
    //         const schoolFee = await context.fees.one(classroom.schoolFee);
    //
    //         const studentPayments = await context.payments.find({ student, classroom, schoolYear });
    //         const registrationFeePayed = paymentAmountForFee(classroom.registrationFee, studentPayments) + paymentAmountForFee(classroom.reregistrationFee, studentPayments);
    //
    //         const registrationFeeReduction = reductionAmount(registrationFee, reductions);
    //
    //         const registrationFeeToPay = registrationFee.amount - registrationFeeReduction;
    //
    //         const schoolFeePayed = paymentAmountForFee(schoolFee._id, studentPayments);
    //         const schoolFeeReduction = await reductionAmountForFee(classroom.schoolFee, reductions);
    //         const schoolFeeToPay = schoolFee.amount - schoolFeeReduction;
    //         const schoolFeePayedByTranches = feePayedByTranche(schoolFeePayed + schoolFeeReduction, schoolFee.tranches);
    //
    //         const otherPayments = otherPaymentsAmount(classroom, studentPayments);
    //
    //         const totalPayed = registrationFeePayed + schoolFeePayed + otherPayments;
    //
    //         const studentPaymentsState = {
    //           name: `${student.firstname} ${student.lastname}`,
    //           registrationFeePayed,
    //           registrationFeeReduction,
    //           registrationFeeToPay,
    //           registrationFeeRemaining: registrationFeeToPay - registrationFeePayed,
    //           schoolFeePayed,
    //           schoolFeeReduction,
    //           schoolFeeToPay,
    //           schoolFeeRemaining: schoolFeeToPay - schoolFeePayed,
    //           otherPayments,
    //           totalPayed,
    //           tranches: schoolFeePayedByTranches,
    //         };
    //       currentClassroomStudentsState.push([student._id, studentPaymentsState]);
    //     }
    //
    //
    //
    //
    //     const currentClassroomState = currentClassroomStudentsState.reduce((acc, studentState) => {
    //       return {
    //         name: `${classroom.name}`,
    //         registrationFeePayed: acc.registrationFeePayed + studentState[1].registrationFeePayed,
    //         registrationFeeReduction: acc.registrationFeeReduction + studentState[1].registrationFeeReduction,
    //         registrationFeeToPay: acc.registrationFeeToPay + studentState[1].registrationFeeToPay,
    //         registrationFeeRemaining: acc.registrationFeeRemaining + studentState[1].registrationFeeRemaining,
    //         schoolFeePayed: acc.schoolFeePayed + studentState[1].schoolFeePayed,
    //         schoolFeeReduction: acc.schoolFeeReduction + studentState[1].schoolFeeReduction,
    //         schoolFeeToPay: acc.schoolFeeToPay + studentState[1].schoolFeeToPay,
    //         schoolFeeRemaining: acc.schoolFeeRemaining + studentState[1].schoolFeeRemaining,
    //         otherPayments: acc.otherPayments + studentState[1].otherPayments,
    //         totalPayed: acc.totalPayed + studentState[1].totalPayed,
    //         tranches: studentState[1].tranches.map((tranche, index) => {
    //           return {
    //             name: tranche?.name ?? 0,
    //             trancheAmount: tranche?.trancheAmount ?? 0 + (acc.tranches[index]?.trancheAmount ?? 0),
    //             payed: tranche?.payed ?? 0 + (acc.tranches[index]?.payed ?? 0),
    //           };
    //         }),
    //       };
    //     }, emptyClassroomState(classroom));
    //
    //     return [classroom._id, {
    //       ...currentClassroomState,
    //       students: Object.fromEntries(currentClassroomStudentsState),
    //     }];
    //   }),
    // );
    //
    // const schoolYearPaymentsState = allClassroomsState.reduce((acc, classroomState) => {
    //   return {
    //     name: ``,
    //     registrationFeePayed: acc.registrationFeePayed + classroomState[1].registrationFeePayed,
    //     registrationFeeReduction: acc.registrationFeeReduction + classroomState[1].registrationFeeReduction,
    //     registrationFeeToPay: acc.registrationFeeToPay + classroomState[1].registrationFeeToPay,
    //     registrationFeeRemaining: acc.registrationFeeRemaining + classroomState[1].registrationFeeRemaining,
    //     schoolFeePayed: acc.schoolFeePayed + classroomState[1].schoolFeePayed,
    //     schoolFeeReduction: acc.schoolFeeReduction + classroomState[1].schoolFeeReduction,
    //     schoolFeeToPay: acc.schoolFeeToPay + classroomState[1].schoolFeeToPay,
    //     schoolFeeRemaining: acc.schoolFeeRemaining + classroomState[1].schoolFeeRemaining,
    //     otherPayments: acc.otherPayments + classroomState[1].otherPayments,
    //     totalPayed: acc.totalPayed + classroomState[1].totalPayed,
    //     tranches: classroomState[1].tranches.map((tranche, index) => {
    //       return {
    //         name: tranche.name,
    //         trancheAmount: tranche.trancheAmount + (acc.tranches[index]?.trancheAmount ?? 0),
    //         payed: tranche.payed + (acc.tranches[index]?.payed ?? 0),
    //       };
    //     }),
    //   };
    // }, emptyClassroomState());
    //
    // return res.json({ ...schoolYearPaymentsState, classrooms: Object.fromEntries(allClassroomsState) });
  },

  state: async (req, res) => {
    const { schoolYear } = req;
    const { school } = req;
    const classrooms = await context.classrooms.find({ school });
    const allClassroomsState = await Promise.all(classrooms.map(async classroom => {
        let registrations = await context.registrations.Model
          .find({ classroom, schoolYear })
          .lean()
          .populate('student', 'firstname lastname');
        registrations = registrations.filter(registration => registration.student != null);


        const currentClassroomStudentsState = await Promise.all(
          registrations.map(async registration => {
            const { student } = registration;
            if (student === undefined || student == null) return [null, null];
            const isNewStudent = registration.isNewStudent || !registration.isReregistration;
            const registrationFee = isNewStudent ? await context.fees.one(classroom.registrationFee) : await context.fees.one(classroom.reregistrationFee);
            const schoolFee = await context.fees.one(classroom.schoolFee);

            const studentPayments = await context.payments.find({ student, classroom, schoolYear });
            const registrationFeePayed = paymentAmountForFee(classroom.registrationFee, studentPayments) + paymentAmountForFee(classroom.reregistrationFee, studentPayments);

            const registrationFeeReduction = reductionAmountForFee(registrationFee, registration.reductions);

            const registrationFeeToPay = registrationFee.amount - registrationFeeReduction;

            const schoolFeePayed = paymentAmountForFee(schoolFee._id, studentPayments);
            const schoolFeeReduction = reductionAmountForFee(schoolFee, registration.reductions);
            const schoolFeeToPay = schoolFee.amount - schoolFeeReduction;
            const schoolFeePayedByTranches = feePayedByTranche(schoolFeePayed + schoolFeeReduction, schoolFee.tranches);

            const otherPayments = otherPaymentsAmount(classroom, studentPayments);

            const totalPayed = registrationFeePayed + schoolFeePayed + otherPayments;

            const studentPaymentsState = {
              name: `${student.firstname} ${student.lastname}`,
              registrationFeePayed,
              registrationFeeReduction,
              registrationFeeToPay,
              registrationFeeAmount: registrationFee.amount,
              registrationFeeRemaining: registrationFeeToPay - registrationFeePayed,
              schoolFeePayed,
              schoolFeeReduction,
              schoolFeeToPay,
              schoolFeeRemaining: schoolFeeToPay - schoolFeePayed,
              otherPayments,
              totalPayed,
              tranches: schoolFeePayedByTranches,
            };

            return [student._id, studentPaymentsState];
          }),
        );

        const currentClassroomState = currentClassroomStudentsState.reduce((acc, studentState) => {
          return {
            name: `${classroom.name}`,
            registrationFeePayed: acc.registrationFeePayed + studentState[1].registrationFeePayed,
            registrationFeeReduction: acc.registrationFeeReduction + studentState[1].registrationFeeReduction,
            registrationFeeToPay: acc.registrationFeeToPay + studentState[1].registrationFeeToPay,
            registrationFeeAmount: acc.registrationFeeAmount + studentState[1].registrationFeeAmount,
            registrationFeeRemaining: acc.registrationFeeRemaining + studentState[1].registrationFeeRemaining,
            schoolFeePayed: acc.schoolFeePayed + studentState[1].schoolFeePayed,
            schoolFeeReduction: acc.schoolFeeReduction + studentState[1].schoolFeeReduction,
            schoolFeeToPay: acc.schoolFeeToPay + studentState[1].schoolFeeToPay,
            schoolFeeRemaining: acc.schoolFeeRemaining + studentState[1].schoolFeeRemaining,
            otherPayments: acc.otherPayments + studentState[1].otherPayments,
            totalPayed: acc.totalPayed + studentState[1].totalPayed,
            tranches: studentState[1].tranches.map((tranche, index) => {
              return {
                name: tranche?.name ?? 0,
                trancheAmount: tranche?.trancheAmount ?? 0 + (acc.tranches[index]?.trancheAmount ?? 0),
                payed: tranche?.payed ?? 0 + (acc.tranches[index]?.payed ?? 0),
              };
            }),
          };
        }, emptyClassroomState(classroom));

        return [classroom._id, {
          ...currentClassroomState,
          students: Object.fromEntries(currentClassroomStudentsState),
        }];
      }),
    );

    const schoolYearPaymentsState = allClassroomsState.reduce((acc, classroomState) => {
      return {
        name: ``,
        registrationFeePayed: acc.registrationFeePayed + classroomState[1].registrationFeePayed,
        registrationFeeReduction: acc.registrationFeeReduction + classroomState[1].registrationFeeReduction,
        registrationFeeToPay: acc.registrationFeeToPay + classroomState[1].registrationFeeToPay,
        registrationFeeAmount: acc.registrationFeeAmount + classroomState[1].registrationFeeAmount,
        registrationFeeRemaining: acc.registrationFeeRemaining + classroomState[1].registrationFeeRemaining,
        schoolFeePayed: acc.schoolFeePayed + classroomState[1].schoolFeePayed,
        schoolFeeReduction: acc.schoolFeeReduction + classroomState[1].schoolFeeReduction,
        schoolFeeToPay: acc.schoolFeeToPay + classroomState[1].schoolFeeToPay,
        schoolFeeRemaining: acc.schoolFeeRemaining + classroomState[1].schoolFeeRemaining,
        otherPayments: acc.otherPayments + classroomState[1].otherPayments,
        totalPayed: acc.totalPayed + classroomState[1].totalPayed,
        tranches: classroomState[1].tranches.map((tranche, index) => {
          return {
            name: tranche.name,
            trancheAmount: tranche.trancheAmount + (acc.tranches[index]?.trancheAmount ?? 0),
            payed: tranche.payed + (acc.tranches[index]?.payed ?? 0),
          };
        }),
      };
    }, emptyClassroomState());

    return res.json({ ...schoolYearPaymentsState, classrooms: Object.fromEntries(allClassroomsState) });
  },

  classrooms: async (req, res) => {
    const { schoolYear } = req;
    const { school } = req;
    const classrooms = await context.classrooms.find({ school });
    const classroomPayments = await Promise.all(
      classrooms.map(async classroom => {
        const registrations = await context.registrations.find({ classroom, schoolYear });
        const classroomStudentspayments = await Promise.all(
          registrations.map(async registration => {
            const { student } = registration;

            if (student === undefined || student == null) return [null, null];

            const studentPayments = await context.payments.find({ student, classroom, schoolYear });

            return [student._id, studentPayments];
          }),
        );

        return [classroom._id, { students: Object.fromEntries(classroomStudentspayments) }];
      }),
    );

    return res.json({
      classrooms: Object.fromEntries(classroomPayments),
    });
  },

  update: async (req, res) => {
    const body = req.body;
    await context.payments.update(req.params.id, body);
    const payment = await context.payments.Model.findById(req.params.id)
      .populate('_student', 'firstname lastname')
      .populate('_classroom', 'name');
    res.json(payment);
  },

  add: async (req, res) => {
    const payload = req.body;
    const payment = await context.payments.add(payload);

    res.json(payment);
  },

  delete: async (req, res) => {
    const result = await context.payments.delete(req.params.id);
    res.json(result);
  },
};

function reductionAmount(fee, reductions) {
  if (reductions == null) return 0;
  const feeReduction = reductions.find(r => {
    return r.fee.toString() === fee._id.toString();
  });
  if (feeReduction === undefined || feeReduction.amount === undefined || feeReduction.reduction === undefined) return 0;

  if (feeReduction.reductionType === 'percentage') {
    return feeReduction.reduction / 100 * fee.amount;
  } else {
    return feeReduction.reduction;
  }
}

function emptyClassroomState(classroom) {
  return {
    name: `${classroom?.name}`,
    registrationFeePayed: 0,
    registrationFeeReduction: 0,
    registrationFeeToPay: 0,
    registrationFeeAmount: 0,
    registrationFeeRemaining: 0,
    schoolFeePayed: 0,
    schoolFeeReduction: 0,
    schoolFeeToPay: 0,
    schoolFeeRemaining: 0,
    otherPayments: 0,
    totalPayed: 0,
    tranches: [],
  };
}
