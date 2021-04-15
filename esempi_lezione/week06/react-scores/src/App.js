import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
//import { iconDelete, iconEdit } from './icons';
//import dayjs from 'dayjs';
import ExamTable from './ExamComponents';

import { fakeExams, fakeCourses } from './FakeData';

function App() {
  return (
    <Container className="App">
      <Row>
        <Col>
          <h1>Your Exams</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <ExamTable exams={fakeExams} courses={fakeCourses}></ExamTable>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
