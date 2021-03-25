'use strict';
const dayjs = require('dayjs');


/**
 * Creates a new Exam object
 * @param {string} code course code
 * @param {string} name course name
 * @param {number} CFU number of credits
 * @param {number} score attained score
 * @param {boolean} laude attained the honors?
 * @param {Date} date date of exam
 */
function Exam(code, name, CFU, score, laude, date) {
    this.code = code;
    this.name = name;
    this.CFU = CFU;
    this.score = score;
    this.laude = laude;
    this.date = date;
}

/**
 * ExamList - creates and manages a list of exams
 */
function ExamList() {
    this.list = [];

    this.add = (e) => {
        this.list.push(e);
    };

    this.find = (code) => {
        for (const c of this.list) {
            if (c.code === code) {
                return c;
            }
        }
        return undefined;
    };

    this.afterDate = (date) => {
        let v = [];
        for (let obj of this.list)
            if (obj.date.isAfter(date))
                v.push(obj);
        return v;
        //return this.list.filter((c)=>(c.date.isAfter(date)));
    };

    this.remap = (score) => {
        if (score >= 27) return 'A';
        else if (score >= 24) return 'B';
        else if (score >= 19) return 'C';
        else return 'D';
    }

    this.convertUs = () => {
        return this.list.map(({ score, ...e }) => ({ score: this.remap(score), ...e }));
    }
}

//const newobj = Array.of({}, obj, {score: nuovoscore});

const wa1 = new Exam('01KTF', 'Web Applications I', 6,
    30, false, dayjs('2021-06-01'));
const aw1 = new Exam('01KTG', 'Applicationi Web I', 6,
    29, false, dayjs('2021-06-02'));
const sdp = new Exam('01XXX', 'System and Device Programming', 10,
    21, false, dayjs('2021-07-01'));

const exams = new ExamList();
exams.add(wa1);
exams.add(aw1);
exams.add(sdp);

console.log(exams.find('01KTF'));
console.log(exams.find('031KTF'));

console.log(exams.afterDate(dayjs('2021-05-15')));

console.log('------------');
const usExams = exams.convertUs();
const usScores = usExams.map(e => e.score);
const four = usScores.filter(score => score === 'A').map(x => 4);
const three = usScores.filter(score => score === 'B').map( x => 3);
const two = usScores.filter(score => score === 'C').map(x => 2);
const one = usScores.filter(score => score === 'D').map(x => 1);

const gpa = [...four, ...three, ...two, ...one].reduce( (sum, score, _, arr) => sum+score/arr.length, 0 )

console.log(usScores);
console.log(four, three, two, one);
console.log(gpa);

debugger;
