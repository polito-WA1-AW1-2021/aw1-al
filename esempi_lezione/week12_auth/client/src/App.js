import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row, Alert } from 'react-bootstrap';
import { ExamScores, ExamForm } from './ExamComponents.js';
import AppTitle from './AppTitle.js';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import API from './API';

function App() {
  const [exams, setExams] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dirty, setDirty] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(()=> {
    const getCourses = async () => {
      const courses = await API.getAllCourses();
      setCourses(courses);
    };
    getCourses()
      .catch(err => {
        setMessage({msg: "Impossible to load your exams! Please, try again later...", type: 'danger'});
        console.error(err);
      });;
  }, []);

  useEffect(()=> {
    const getExams = async () => {
      const exams = await API.getAllExams();
      setExams(exams);
    };
    if(courses.length && dirty) {
      getExams().then(() => {
        setLoading(false);
        setDirty(false);
      }).catch(err => {
        setMessage({msg: 'Impossible to load your exams! Please, try again later...', type: 'danger'});
        console.error(err);
      });;
    }
  }, [courses.length, dirty]);


  const handleErrors = (err) => {
    if(err.errors) {
      console.log(JSON.stringify(err));
          setMessage({msg: err.errors[0].msg + ': ' + err.errors[0].param, type: 'danger'});
    } else
      setMessage({msg: err.error, type: 'danger'});
    
    setDirty(true);
  }

  const deleteExam = (coursecode) => {
    // temporary set the deleted item as "in progress"
    setExams(oldExams => {
      return oldExams.map(ex => {
        if (ex.coursecode === coursecode)
          return {...ex, status: 'deleted'};
        else
          return ex;
      });
    });

    API.deleteExam(coursecode)
      .then(() => {
        setDirty(true);
      }).catch(err => handleErrors(err) );
  }

  const addExam = (exam) => {
    exam.status = 'added';
    setExams(oldExams => [...oldExams, exam]);

    API.addExam(exam)
      .then(() => {
        setDirty(true);
      }).catch(err => handleErrors(err) );
  }

  const updateExam = (exam) => {
    setExams(oldExams => {
      return oldExams.map(ex => {
        if (ex.coursecode === exam.coursecode)
          return {coursecode: exam.coursecode, score: exam.score, date: exam.date, status: 'updated'};
        else
          return ex;
      });
    });

    API.updateExam(exam)
      .then(() => {
        setDirty(true);
      }).catch(err => handleErrors(err) );;
  }

  const examCodes = exams.map(exam => exam.coursecode);

  return (<Router>
    <Container className="App">
      <Row>
        <AppTitle />
      </Row>

      <Switch>
        <Route path="/add" render={() => 
          <ExamForm courses={courses.filter(course => !examCodes.includes(course.coursecode))} addOrUpdateExam={addExam}></ExamForm>
        }/>

        {/* without useLocation():
        <Route path="/update" render={(routeProps) => 
          <ExamForm courses={courses} exam={routeProps.location.state.exam} examDate={routeProps.location.state.examDate} addOrUpdateExam={updateExam}></ExamForm>
        }/>
        */}
        {/* with useLocation() in ExamForm */}
        <Route path="/update" render={() => 
          <ExamForm courses={courses} addOrUpdateExam={updateExam}></ExamForm>
        }/>

        <Route path="/" render={() =>
        <>
          <Row>
          {message && <Alert variant='danger' onClose={() => setMessage('')} dismissible>{message.msg}</Alert>}
          </Row>
          <Row>
            {loading ? <span>🕗 Please wait, loading your exams... 🕗</span> :
            <ExamScores exams={exams} courses={courses} deleteExam={deleteExam}/> }
          </Row>
        </>
        } />
        
      </Switch>
    </Container>
  </Router>);
}

export default App;
