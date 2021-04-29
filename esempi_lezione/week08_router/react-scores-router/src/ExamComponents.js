import { Col, Table, Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { iconDelete, iconEdit } from './icons';
import dayjs from 'dayjs';
import {Link, Redirect, useLocation} from 'react-router-dom';

function ExamScores(props) {
  return <Col>
    <ExamTable exams={props.exams} courses={props.courses} />
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

    <Link to='/add'><Button variant='success'>Add</Button>
    </Link>
  </>

  );
}

function ExamRow(props) {
  return <tr><ExamRowData exam={props.exam} examName={props.examName} /><RowControls exam={props.exam} deleteExam={props.deleteExam} /></tr>
}

function ExamRowData(props) {
  return <>
    <td>{props.examName}</td>
    <td>{props.exam.score}</td>
    <td>{props.exam.date.format('DD MMM YYYY')}</td>
  </>;
}

function RowControls(props) {
  return <td>
    <Link to={{
      pathname: "/update",
      state: { exam: props.exam, examDate: props.exam.date.format('YYYY-MM-DD') }
    }}>{iconEdit}
    </Link>
    <span onClick={() => { props.deleteExam(props.exam.coursecode) }}>{iconDelete}</span>
  </td>
}

function ExamForm(props) {
  const location = useLocation();
  const [course, setCourse] = useState(location.state ? location.state.exam.coursecode : '');
  const [score, setScore] = useState(location.state ? location.state.exam.score : 30);
  const [date, setDate] = useState(location.state ? location.state.examDate : dayjs().format('YYYY-MM-DD'));
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
      event.preventDefault();
      const exam = { coursecode: course, score: score, date: dayjs(date) };

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
    <>
      {submitted ? <Redirect to='/' /> :
      <Form>
          {errorMessage ? <Alert variant='danger'>{errorMessage}</Alert> : ''}
          <Form.Group controlID='selectedCourse'>
              <Form.Label>Course</Form.Label>
              <Form.Control as="select" defaultValue='' value={course} onChange={ev => setCourse(ev.target.value)} disabled={location.state}>
                  <option disabled hidden value=''>choose...</option>
                  {props.courses.map(course => <option key={course.coursecode} value={course.coursecode}>{course.name}</option>)}
                  {/* improvement: don't insert courses already passed */}
              </Form.Control>
          </Form.Group>
          <Form.Group controlID='selectedScore'>
              <Form.Label>Score</Form.Label>
              <Form.Control type='number' min={18} max={31} value={score} onChange={ev => setScore(ev.target.value)} />
          </Form.Group>
          <Form.Group controlID='selectedDate'>
              <Form.Label>Date</Form.Label>
              <Form.Control type='date' value={date} onChange={ev => setDate(ev.target.value)} />          </Form.Group>
          <Button onClick={handleSubmit}>Save</Button> 
          <Link to="/"><Button variant='secondary'>Cancel</Button></Link>
      </Form>
    }
    </>
  )
}


/* ALTERNATIVE IMPLEMENTATION, WITH "NATIVE" HTML CONTROLS (WITHOUT BOOTSTRAP) */
function ExamForm_native(props) {
  const [course, setCourse] = useState('');
  const [score, setScore] = useState(30);
  const [date, setDate] = useState(dayjs());

  const handleSubmit = (event) => {
      event.preventDefault();
      const exam = { coursecode: course, score: score, date: date };
      props.addExam(exam);
  };

  return (
      <form>
          <span style={{ display: 'inline-block', width: '5em' }}>Course:</span>
          <select value={course} onChange={ev => setCourse(ev.target.value)}>
              {props.courses.map(course => <option key={course.coursecode} value={course.coursecode}>{course.name}</option>)}
          </select><br />
          <span style={{ display: 'inline-block', width: '5em' }}>Score:</span>
          <input type='number' min={18} max={31} value={score} onChange={ev => setScore(ev.target.value)} /><br />
          <span style={{ display: 'inline-block', width: '5em' }}>Date:</span>
          <input type='date' value={date.format('YYYY-MM-DD')} onChange={ev => setDate(dayjs(ev.target.value))} /><br />
          <button onClick={handleSubmit}>Save</button> <button onClick={props.cancel}>Cancel</button>
      </form >
  )
}


export {ExamScores, ExamForm};