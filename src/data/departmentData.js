// Official Department Faculty & Subject Information
// Department: Artificial Intelligence and Data Science (AI & DS)

export const DEPARTMENT_DATA = {
  departmentName: "Artificial Intelligence and Data Science",
  shortName: "AI & DS",
  hod: {
    name: "Dr. Kishor Jhadav",
    title: "Head of Department (HOD)",
    email: "—",
    contact: "9890423309"
  },
  classCoordinator: {
    role: "First Year Class Coordinator",
    name: "Dr. Shreeparna Das",
    cabin: "9th Floor"
  },
  faculties: [
    {
      name: "Dr. Vishwesh Nagamalla",
      subject: "Introduction to Programming and Data Structure",
      shortSubject: "Programming & Data Structures",
      cabin: "9th Floor",
      role: "Faculty"
    },
    {
      name: "Prashant Kamkar",
      designation: "IBM Faculty",
      subject: "Python",
      shortSubject: "Python",
      cabin: "— (IBM Center / Lab)",
      role: "IBM Industry Expert Faculty"
    },
    {
      name: "Ganesh Phopase",
      subject: "Technical and Professional Communication Skills",
      shortSubject: "Communication Skills",
      cabin: "—",
      role: "Faculty"
    },
    {
      name: "Sarvjeet Singh",
      subject: "Engineering Mathematics",
      shortSubject: "Engineering Maths",
      cabin: "2nd Floor",
      role: "Faculty"
    },
    {
      name: "Dr. Tanay Ghosh",
      subject: "Applied Physics (Theory)",
      shortSubject: "Applied Physics (Theory)",
      cabin: "2nd Floor",
      role: "Faculty"
    },
    {
      name: "Mrs. Sarika Maske",
      subject: "Applied Physics (Practical)",
      shortSubject: "Applied Physics (Practical)",
      cabin: "Extension Building",
      role: "Faculty"
    },
    {
      name: "Dr. Hirak Chatterjee",
      subject: "Applied Chemistry (Theory and Practical)",
      shortSubject: "Applied Chemistry",
      cabin: "10th Floor",
      role: "Faculty"
    },
    {
      name: "Ms. Tanvi Chatse",
      subject: "German",
      shortSubject: "German Foreign Language",
      cabin: "—",
      role: "Language Faculty"
    },
    {
      name: "Dr. Shreeparna Das",
      subject: "First Year Class Coordinator",
      shortSubject: "First Year Coordinator",
      cabin: "9th Floor",
      role: "Class Coordinator & Faculty"
    }
  ]
};

export const DEPARTMENT_KNOWLEDGE_PROMPT = `
DEPARTMENT FACULTY & SUBJECT DIRECTORY:
- Department: Artificial Intelligence and Data Science (AI & DS)
- Head of Department (HOD): Dr. Kishor Jhadav (Contact: 9890423309)
- First Year Class Coordinator: Dr. Shreeparna Das (Cabin: 9th Floor)

Faculty, Subject & Cabin Mapping:
1. Dr. Vishwesh Nagamalla — Introduction to Programming and Data Structure | Cabin: 9th Floor
2. Prashant Kamkar (IBM Faculty) — Python | Industry Expert Faculty (IBM)
3. Ganesh Phopase — Technical and Professional Communication Skills
4. Sarvjeet Singh — Engineering Mathematics | Cabin: 2nd Floor
5. Dr. Tanay Ghosh — Applied Physics (Theory) | Cabin: 2nd Floor
6. Mrs. Sarika Maske — Applied Physics (Practical) | Cabin: Extension Building
7. Dr. Hirak Chatterjee — Applied Chemistry (Theory and Practical) | Cabin: 10th Floor
8. Ms. Tanvi Chatse — German (Foreign Language)
9. Dr. Shreeparna Das — First Year Class Coordinator | Cabin: 9th Floor

Whenever any student or user asks about teachers, professors, faculties, HOD, cabin locations, contact numbers, or who teaches which subject (e.g., Python, Maths, Physics, Chemistry, Data Structures, German, Communication Skills) in the AI & DS department, always provide these exact details accurately, warmly, and clearly!
`;
