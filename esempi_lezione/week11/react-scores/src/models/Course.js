/**
 * Object describing a course
 */
 class Course {
  /**
   * Create a new Course
   * @param {*} coursecode unique code for the course
   * @param {*} name full name of the course
   * @param {*} CFU number of CFU credits
   */
  constructor(coursecode, name, CFU) {
    this.coursecode = coursecode;
    this.name = name;
    this.CFU = CFU;
  }

  /**
   * Creates a new Course from plain (JSON) objects
   * @param {*} json a plain object (coming form JSON deserialization)
   * with the right properties
   * @return {Course} the newly created object
   */
  static from(json) {
    const course = new Course();
    delete Object.assign(course, json, {coursecode: json.code}).code;
    return course;
  }

}

export default Course;