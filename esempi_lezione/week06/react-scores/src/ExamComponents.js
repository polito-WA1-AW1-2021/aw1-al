import { Table } from 'react-bootstrap';
import { useState } from 'react';
import { iconDelete, iconEdit } from './icons';

// ExamTable
//   ExamRow (1 o piu')
//     ExamRowData
//     RowControl

function ExamTable(props) {

    const [exams, setExams] = useState(props.exams);

    const deleteExams = (coursecode) => {
        setExams((exs) => exs.filter((ex) => ex.coursecode !== coursecode));
    };

    return <Table striped bordered>
        <thead>
            <tr><th>Exam</th>
                <th>Score</th>
                <th>Date</th>
                <th>Actions</th></tr>
        </thead>
        <tbody>
            {
                exams.map((ex) =>
                    <ExamRow 
                        exam={ex} 
                        examName={props.courses.filter( c => c.coursecode===ex.coursecode)[0].name} 
                        deleteExam={deleteExams} 
                        key={ex.coursecode}>

                        </ExamRow>
                )
            }
        </tbody>
    </Table>;
}


function ExamRow(props) {
    return <tr>
        <ExamRowData examName={props.examName} exam={props.exam} ></ExamRowData>
        <RowControl deleteExam={props.deleteExam} exam={props.exam} ></RowControl>
    </tr>;
}

function ExamRowData(props) {
    return <>
        <td>{props.examName}</td>
        <td>{props.exam.score}</td>
        <td>{props.exam.date.format('DD MMM YYYY')}</td>
    </>
}

function RowControl(props) {
    return <td>
        {iconEdit} <span onClick={() => { props.deleteExam(props.exam.coursecode) }}>{iconDelete}</span>
    </td>
}

export default ExamTable;