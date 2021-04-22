import { Col, Table, Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { iconDelete, iconEdit } from './icons';
import dayjs from 'dayjs';


function ExamScores(props) {
  return <Col>
    <ExamTable exams={props.exams} courses={props.courses} />
  </Col>;
}

function ExamTable(props) {
  const [exams, setExams] = useState([...props.exams]);
  const [showForm, setShowForm] = useState(false);


  const deleteExam = (coursecode) => {
    setExams((exs) => exs.filter(ex => ex.coursecode !== coursecode))
  }

  const addExam = (exam) => {
    setExams(oldExams => [...oldExams, exam]);
  }



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
        exams.map((ex) => <ExamRow key={ex.coursecode}
          exam={ex}
          examName={props.courses.filter(c => c.coursecode === ex.coursecode)[0].name}
          deleteExam={deleteExam}
        />)
        /* NOTE: exam={{...ex, name: (the above expression)}} could be a quicker (and dirtier) way to add the .name property to the exam, instead of passing the examName prop */
      }
      </tbody>
    </Table>
    {showForm ? <ExamForm courses={props.courses}
      addExam={(exam) => { addExam(exam); }} cancel={() => setShowForm(false)}
    ></ExamForm> : <Button variant='success' onClick={() => setShowForm(true)}>Add</Button>}
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
    {iconEdit} <span onClick={() => { props.deleteExam(props.exam.coursecode) }}>{iconDelete}</span>
  </td>
}

function ExamForm(props) {
  const [course, setCourse] = useState('');
  const [score, setScore] = useState('');
  const [date, setDate] = useState(dayjs());

  const [error, setError] = useState('');

  const handleSumbit = (event) => {
    event.preventDefault();
    if (score >= 18) {
      const exam = { coursecode: course, score: score, date: date };
      props.addExam(exam);
    } else {
      console.log('Errore voto: ' + score);
      setError('Errore voto');
    }
  }

  const handleScore = (event) => {
    const val = event.target.value;
    setScore(val);
    /* Careful with validation: either validate at the end in handleSubmit, or when focus is lost,
       or consider that partial input may be invalid (difficult)
        if (val<31)
          setScore(31);
        else
          setScore(val);
    */
  }

  return (
    <>
      {error ? <Alert variant='danger' onClose={() => setError('')} dismissible>{error}</Alert> : false}
      <Form>
        <Form.Group controlID='selectedCourse'>
          <Form.Label>Course</Form.Label>
          <Form.Control as="select" defaultValue='' value={course} onChange={ev => setCourse(ev.target.value)}>
            <option disabled hidden value=''>choose...</option>
            {props.courses.map(course => <option key={course.coursecode} value={course.coursecode}>{course.name}</option>)}
            {/* improvement: don't insert courses already passed */}
          </Form.Control>
        </Form.Group>
        <Form.Group controlID='selectedScore'>
          <Form.Label>Score</Form.Label>
          <Form.Control type='number' min={18} max={31} value={score} onChange={ev => handleScore(ev)} />
        </Form.Group>
        <Form.Group controlID='selectedDate'>
          <Form.Label>Date</Form.Label>
          <Form.Control type='date' value={date.format('YYYY-MM-DD')} onChange={ev => setDate(dayjs(ev.target.value))} />
        </Form.Group>
        <Button onClick={handleSumbit}>Save</Button>
        <Button variant='secondary' onClick={props.cancel}>Cancel</Button>
      </Form>
    </>
  )

}

/* ALTERNATIVE IMPLEMENTATION, WITH "NATIVE" HTML CONTROLS (WITHOUT BOOTSTRAP) */
function ExamForm_native(props) {
  const [course, setCourse] = useState('');
  const [score, setScore] = useState(30);
  const [date, setDate] = useState(dayjs());

  const handleSumbit = (event) => {
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
      <button onClick={handleSumbit}>Save</button> <button onClick={props.cancel}>Cancel</button>
    </form >
  )
}

export default ExamScores;