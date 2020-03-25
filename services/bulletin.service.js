const moment = require('moment');

const { User, Examination, Classroom, SchoolSession, SchoolYear } = require('../models');
const { studentsForClassroom } = require('../services/classroom.service');
const DbContext = require('../services/db_context');

const Examinations = new DbContext(Examination);
const Classrooms = new DbContext(Classroom);
const SchoolSessions = new DbContext(SchoolSession);
const SchoolYears = new DbContext(SchoolYear);

function getExaminationSession(examination, schoolYear) {
  for (let session of schoolYear.sessions) {
    if (moment(examination.examinationDate).isBetween(moment(session.startDate), moment(session.endDate), 'day', '[]')) {
      return session;
    }
  }
}

function sortMarks(mark1, mark2) {
  return mark2.mark - mark1.mark;
}

async function buildSessionNotesTree(school, schoolYear) {
  const notesTree = {};
  const examinations = await Examinations.find({ schoolYear: schoolYear._id });

  for(const examination of examinations) {
    const examinationSession = getExaminationSession(examination, schoolYear);
    const classroomCoef = examination.classroom.subjects.reduce((acc, cur) => acc + cur.coefficient, 0);
    if (!notesTree[examinationSession.name]) {
      notesTree[examinationSession.name] = {};
    }

    if (!notesTree[examinationSession.name][examination.classroom._id]) {
      notesTree[examinationSession.name][examination.classroom._id] = {
        subjects: {},
        totalCoef: classroomCoef,
        students: {}
      };
    }

    // const currentClassroom = notesTree[examinationSession.name][examination.classroom._id];
    const currentClassroomStudents = notesTree[examinationSession.name][examination.classroom._id].students;
    const currentClassroomSubjects = notesTree[examinationSession.name][examination.classroom._id].subjects;
    if (!currentClassroomSubjects[examination.subject._id]) {
      currentClassroomSubjects[examination.subject._id] = {
        examinationTypes: {},
        students: {}
      };
    }

    const currentSubject = currentClassroomSubjects[examination.subject._id].examinationTypes;
    let currentSubjectStudents = currentClassroomSubjects[examination.subject._id].students;
    if (!currentSubject[examination.type._id]) {
      currentSubject[examination.type._id] = {
        students: {}
      };
    }
    const currentSubjectExaminationTypes = currentSubject[examination.type._id].students;
    examination.marks.forEach(mark => {
      if (!currentSubjectExaminationTypes[mark.student._id]) {
        currentSubjectExaminationTypes[mark.student._id] = { notes: [] };
      }

      if (mark.mark != null) {
        currentSubjectExaminationTypes[mark.student._id].notes.push(mark.mark);
        const sum = currentSubjectExaminationTypes[mark.student._id].notes.reduce((acc, cur) => acc + cur, 0);
        currentSubjectExaminationTypes[mark.student._id].mean = sum / currentSubjectExaminationTypes[mark.student._id].notes.length;
        if (!currentSubjectStudents[mark.student._id]) {
          currentSubjectStudents[mark.student._id] = {
            examinationTypes: [],
            notes: []
          };
        }

        if (!currentSubjectStudents[mark.student._id].examinationTypes.includes(examination.type._id)) {
          currentSubjectStudents[mark.student._id].notes.push(currentSubjectExaminationTypes[mark.student._id].mean);
          currentSubjectStudents[mark.student._id].examinationTypes.push(examination.type._id);

          const allSubjectsNotes = currentSubjectStudents[mark.student._id].notes.reduce((acc, cur) => acc + cur, 0);
          currentSubjectStudents[mark.student._id].mean = allSubjectsNotes / currentSubjectStudents[mark.student._id].notes.length;
        }

        if (!currentClassroomStudents[mark.student._id]) {
          currentClassroomStudents[mark.student._id] = {
            subjects: {},
            grandTotal: 0.0,
            generalMean: 0.0,
            realCoef: 0,
          };
        }

        if (!currentClassroomStudents[mark.student._id].subjects[examination.subject._id]) {
          currentClassroomStudents[mark.student._id].subjects[examination.subject._id] = {
            note: 0,
            coef: 0,
            totalWithCoef: 0
          }
        }

        currentClassroomStudents[mark.student._id].subjects[examination.subject._id].note = currentSubjectStudents[mark.student._id].mean;
        currentClassroomStudents[mark.student._id].subjects[examination.subject._id].coef = examination.subject.coefficient;

        currentClassroomStudents[mark.student._id].subjects[examination.subject._id].totalWithCoef = currentSubjectStudents[mark.student._id].mean * examination.subject.coefficient;
        currentClassroomStudents[mark.student._id].subjects[examination.subject._id].totalWithCoef = currentSubjectStudents[mark.student._id].mean * examination.subject.coefficient;

        const notes = Object.values(currentClassroomStudents[mark.student._id].subjects);
        const grandTotal = notes.reduce((acc, cur) => acc + cur.totalWithCoef, 0);
        const currentStudentCoef = notes.reduce((acc, cur) => acc + cur.coef, 0);
        const generalMean = grandTotal / currentStudentCoef;
        currentClassroomStudents[mark.student._id].grandTotal = grandTotal;
        currentClassroomStudents[mark.student._id].generalMean = generalMean;
        currentClassroomStudents[mark.student._id].realCoef = currentStudentCoef;
      }
    });


  }

  return notesTree;
}

module.exports = {
  getBulletins: async (school, schoolYearId) => {
    const schoolYear = await SchoolYears.one(schoolYearId);

    return buildSessionNotesTree(school, schoolYear);
  },
};
