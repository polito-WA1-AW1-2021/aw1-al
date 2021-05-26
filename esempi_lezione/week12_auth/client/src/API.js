/**
 * All the API calls
 */
import Course from './models/Course';
import Exam from './models/Exam';

const BASEURL = '/api';

async function getAllCourses() {
  // call: GET /api/courses
  const response = await fetch(BASEURL + '/courses');
  const coursesJson = await response.json();
  if (response.ok) {
    return coursesJson.map((co) => Course.from(co));
  } else {
    throw coursesJson;  // an object with the error coming from the server
  }
}

async function getAllExams() {
  // call: GET /api/exams
  const response = await fetch(BASEURL + '/exams');
  const examsJson = await response.json();
  if (response.ok) {
    return examsJson.map((ex) => Exam.from(ex));
  } else {
    throw examsJson;  // an object with the error coming from the server
  }
}

function deleteExam(coursecode) {
  // call: DELETE /api/exams/:coursecode
  return new Promise((resolve, reject) => {
    fetch(BASEURL + '/exams/' + coursecode, {
      method: 'DELETE',
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
        }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

function addExam(exam) {
  // call: POST /api/exams
  return new Promise((resolve, reject) => {
    fetch(BASEURL + '/exams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({code: exam.coursecode, score: exam.score, date: exam.date}),
      }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response.json()
            .then((message) => { reject(message); }) // error message in the response body
            .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
        }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

function updateExam(exam) {
  // call: PUT /api/exams/:coursecode
  return new Promise((resolve, reject) => {
    fetch(BASEURL + '/exams/' + exam.coursecode, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({code: exam.coursecode, score: exam.score, date: exam.date}),
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response.json()
          .then((obj) => { reject(obj); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

const API = {getAllCourses, getAllExams, deleteExam, addExam, updateExam};
export default API;