import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row } from 'react-bootstrap';
import ExamScores from './ExamComponents.js';
import AppTitle from './AppTitle.js';
import dayjs from 'dayjs';

const fakeExams = [
  {coursecode: '01TYMOV', score: 28, date: dayjs('2021-03-01')},
  {coursecode: '01SQJOV', score: 29, date: dayjs('2021-06-03')},
  {coursecode: '04GSPOV', score: 18, date: dayjs('2021-05-24')},
  {coursecode: '01TXYOV', score: 24, date: dayjs('2021-06-21')},
];

const fakeCourses = [
  {coursecode: '01TYMOV', name: 'Information systems security'},
  {coursecode: '02LSEOV', name: 'Computer architectures'},
  {coursecode: '01SQJOV', name: 'Data Science and Database Technology'},
  {coursecode: '01OTWOV', name: 'Computer network technologies and services'},
  {coursecode: '04GSPOV', name: 'Software Engineering'},
  {coursecode: '01TXYOV', name: 'Web Applications I'},
  {coursecode: '01NYHOV', name: 'System and device programming'},
  {coursecode: '01TYDOV', name: 'Cloud Computing'},
  {coursecode: '01SQPOV', name: 'Software Networking'},
];

function App() {
  return (
    <Container className="App">
      <Row>
        <AppTitle />
      </Row>
      <Row>
        <ExamScores exams={fakeExams} courses={fakeCourses} />
      </Row>
    </Container>
  );
}

export default App;
