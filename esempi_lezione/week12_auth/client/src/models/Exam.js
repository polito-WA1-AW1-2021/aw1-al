/**
 * Information about an exam being passed
 */
 class Exam {
  /**
   * Constructs a new Exam object
   * @param {String} coursecode unique code for the course being passed
   * @param {Number} score achieved score (18..31)
   * @param {Date} date date of the exam
   */
  constructor(coursecode, score, date) {
    this.coursecode = coursecode;
    this.score = score;
    this.date = date;
  }

  /**
   * Construct an Exam from a plain object
   * @param {{}} json 
   * @return {Exam} the newly created Exam object
   */
  static from(json) {
    return new Exam(json.code, json.score, json.date);
  }
}

export default Exam;