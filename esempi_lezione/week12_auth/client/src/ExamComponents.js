import { Col, Table, Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { iconDelete, iconEdit } from './icons';
import dayjs from 'dayjs';
import {Link, Redirect, useLocation} from 'react-router-dom';


function ExamScores(props) {
  return <Col>
    <ExamTable exams={props.exams} courses={props.courses} deleteExam={props.deleteExam}/>
  </Col>;
}

function ExamTable(props) {

  return (<>
    <Table striped bordered>
      <thead>
        <tr>
          <th>Exam</th>
          <th>Score</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{
        props.exams.map((ex) => <ExamRow key={ex.coursecode}
          exam={ex}
          examName={props.courses.filter(c => c.coursecode === ex.coursecode)[0].name}
          deleteExam={props.deleteExam}
        />)
        /* NOTE: exam={{...ex, name: (the above expression)}} could be a quicker (and dirtier) way to add the .name property to the exam, instead of passing the examName prop */
      }
      </tbody>
    </Table>

    <Link to="/add"><Button variant='success'>Add</Button></Link>
  </>

  );
}

function ExamRow(props) {
  let statusClass = null;
  
  switch(props.exam.status) {
    case 'added':
      statusClass = 'table-success';
      break;
    case 'deleted':
      statusClass = 'table-danger';
      break;
    case 'updated':
      statusClass = 'table-warning';
      break;
    default:
      break;
  }

  return <tr className={statusClass}><ExamRowData exam={props.exam} examName={props.examName} />{ !props.exam.status ? <RowControls exam={props.exam} deleteExam={props.deleteExam} />: <td></td>}</tr>
}

function ExamRowData(props) {
  

  return <>
    <td>{props.examName}</td>
    <td>{props.exam.score}</td>
    <td>{dayjs(props.exam.date).format('DD MMM YYYY')}</td>
  </>;
}

function RowControls(props) {
  return <td>
    <Link to={{
      pathname: "/update",
      state: { exam: props.exam }
    }}>{iconEdit}
  </Link> <span onClick={() => { props.deleteExam(props.exam.coursecode) }}>{iconDelete}</span>
  </td>
}

function ExamForm(props) {
  const location = useLocation();
  const [course, setCourse] = useState(location.state ? location.state.exam.coursecode : '');
  const [score, setScore] = useState(location.state ? location.state.exam.score : 30);
  const [date, setDate] = useState(location.state ? location.state.exam.date : dayjs().format('YYYY-MM-DD'));
  const [errorMessage, setErrorMessage] = useState('') ;
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (event) => {
      event.preventDefault();
      const exam = { coursecode: course, score: score, date: dayjs(date).format('YYYY-MM-DD') };
      
      // SOME VALIDATION, ADD MORE!!!
      let valid = true;
      if(course === '' || score === '')
          valid = false;
      const scorenumber = +score ;
      if(scorenumber < 18 || scorenumber > 31)
          valid = false;
      
      if(valid)
      {
        props.addOrUpdateExam(exam);
        setSubmitted(true);
      }
      else {
        // show a better error message...
        setErrorMessage('Error(s) in the form, please fix it.')
      }
  };

  return (
    <> {submitted ? <Redirect to="/"/> :
      <Form>
          {errorMessage ? <Alert variant='danger'>{errorMessage}</Alert> : ''}
          <Form.Group controlId='selectedCourse'>
              <Form.Label>Course</Form.Label>
              <Form.Control as="select" value={course} onChange={ev => setCourse(ev.target.value)} disabled={location.state}>
                <option disabled hidden value=''>choose...</option>
                {props.courses.map(course => <option key={course.coursecode} value={course.coursecode} >{course.name} </option>)}
              </Form.Control>
          </Form.Group>
          <Form.Group controlId='selectedScore'>
              <Form.Label>Score</Form.Label>
              <Form.Control type='number' min={18} max={31} value={score} onChange={ev => setScore(ev.target.value)} />
          </Form.Group>
          <Form.Group controlId='selectedDate'>
              <Form.Label>Date</Form.Label>
              <Form.Control type='date' value={date} onChange={ev => setDate(ev.target.value)} />
          </Form.Group>
          <Button onClick={handleSubmit}>Save</Button> <Link to="/"><Button variant='secondary'>Cancel</Button></Link>
      </Form>
    }
    </>)
}

export {ExamScores, ExamForm};