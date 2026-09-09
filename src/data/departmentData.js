// Official Department Faculty & Subject Information
// Departments: AI & DS + Mechanical Engineering

// ─────────────────────────────────────────────────────────────────────────────
// Department: Artificial Intelligence and Data Science (AI & DS)
// ─────────────────────────────────────────────────────────────────────────────
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

MECHANICAL ENGINEERING DEPARTMENT — FACULTY & SUBJECT DIRECTORY:
- Department: Mechanical Engineering (Mech)
- Head of Department (HOD): Kailash Bhosale | Cabin: 7th Floor Staff Room
- Class Coordinator: Omkar Dadi | Cabin: 7th Floor Staff Room
- Department Clerk: Harshda Kolpe | Cabin: 7th Floor Staff Room

Faculty, Subject & Role Mapping (Mechanical) — All staff on 7th Floor Staff Room:
1. Pankaj Patil — Engineering Graphics and CAD | Cabin: 7th Floor Staff Room
2. Kiran Wakchure — Makerspace / Workshop Practice | Cabin: 7th Floor Staff Room (Lab: Makerspace)
3. Jaydeep Ashtekar — Python Programming | Cabin: 7th Floor Staff Room
4. Pratibha Sinha — Python Programming | Cabin: 7th Floor Staff Room
5. Vasudev Sengar — Assistant Professor | Cabin: 7th Floor Staff Room
6. Tanay Renu Ghosh — Engineering Physics | Cabin: 7th Floor Staff Room
7. Hirak Chatterjee — Chemistry | Cabin: 7th Floor Staff Room
8. Prajwal Aher — Mathematics for Mechanical Engineering | Cabin: 7th Floor Staff Room
9. Sadhna Ganjir — English / Communication Skills | Cabin: 7th Floor Staff Room
10. Omkar Dadi — Class Coordinator | Cabin: 7th Floor Staff Room
11. Harshda Kolpe — Department Clerk | Cabin: 7th Floor Staff Room

Whenever any student asks about Mechanical Engineering teachers, HOD, Engineering Graphics, CAD, Makerspace, Python, Physics, Chemistry, Maths, or English in Mechanical department — always provide these exact details accurately and warmly!

INTEGRATED M.TECH (IMTECH) DEPARTMENT — FACULTY & SUBJECT DIRECTORY:
- Department: Integrated M.Tech (IMTECH)
- Head of Department (HOD): Dr. Anwar A Shaikh
- HOD Email: anwarshaikhset@sanjivani.edu.in
- HOD Contact: 9044013605

1st Year Faculty:
1. Prof. Prajwal Aher — Mathematics-1
2. Prof. Piyush Sahu — Design Thinking and Idea Lab
3. Dr. Anwar A Shaikh — Fundamentals of Computing Systems and Emerging Technologies
4. Prof. Sadhna Gunjir — English - Oral and Written Communication Skills
5. Prof. Hari Prasath K — Programming in Problem Solving using C
6. Prof. Prajwal Aher — NSS / Yoga / Sports / Liberal Arts
7. Prof. Piyush Sahu — Indian Knowledge System

2nd Year Faculty:
1. Dr. Latika Bawankar — Linear Algebra and Transformation Techniques
2. Prof. Prajwal Aher — Programming for Data Science (Python)
3. Prof. Piyush Sahu — Essentials of Cyber Security
4. Prof. Vikas Kumar — Exploratory Data Analytics
5. Dr. Anwar A Shaikh — Data Structures and Algorithms
6. Dr. Bandana Thakur — Financial Management
7. Prof. D. Roushan — Foreign Language - 1 (Japanese)
8. Prof. Riya Khandelwal — Foreign Language - 1 (German)

Whenever any student asks about IMTECH faculty, HOD, Maths, Design Thinking, Computing Systems, English, C Programming, Data Science, Python, Cyber Security, Data Analytics, Data Structures, Financial Management, Japanese, German — provide exact details!
`;

// ─────────────────────────────────────────────────────────────────────────────
// Department: Mechanical Engineering (all on 7th Floor Staff Room)
// ─────────────────────────────────────────────────────────────────────────────
export const MECHANICAL_DEPARTMENT_DATA = {
  departmentName: "Mechanical Engineering",
  shortName: "Mech",
  hod: {
    name: "Kailash Bhosale",
    title: "Head of Department (HOD)",
    email: "—",
    contact: "—",
    cabin: "7th Floor Staff Room"
  },
  classCoordinator: {
    role: "Class Coordinator",
    name: "Omkar Dadi",
    cabin: "7th Floor Staff Room"
  },
  departmentClerk: {
    name: "Harshda Kolpe",
    role: "Department Clerk",
    cabin: "7th Floor Staff Room"
  },
  faculties: [
    {
      name: "Pankaj Patil",
      subject: "Engineering Graphics and CAD",
      shortSubject: "Engineering Graphics & CAD",
      cabin: "7th Floor Staff Room",
      role: "Faculty"
    },
    {
      name: "Kiran Wakchure",
      subject: "Makerspace / Workshop Practice",
      shortSubject: "Makerspace",
      cabin: "7th Floor Staff Room",
      role: "Faculty"
    },
    {
      name: "Jaydeep Ashtekar",
      subject: "Python Programming",
      shortSubject: "Python",
      cabin: "7th Floor Staff Room",
      role: "Faculty"
    },
    {
      name: "Pratibha Sinha",
      subject: "Python Programming",
      shortSubject: "Python",
      cabin: "7th Floor Staff Room",
      role: "Faculty"
    },
    {
      name: "Vasudev Sengar",
      subject: "—",
      shortSubject: "—",
      cabin: "7th Floor Staff Room",
      role: "Assistant Professor"
    },
    {
      name: "Tanay Renu Ghosh",
      subject: "Engineering Physics",
      shortSubject: "Engineering Physics",
      cabin: "7th Floor Staff Room",
      role: "Faculty"
    },
    {
      name: "Hirak Chatterjee",
      subject: "Chemistry",
      shortSubject: "Applied Chemistry",
      cabin: "7th Floor Staff Room",
      role: "Faculty"
    },
    {
      name: "Prajwal Aher",
      subject: "Mathematics for Mechanical Engineering",
      shortSubject: "Mechanical Engineering Maths",
      cabin: "7th Floor Staff Room",
      role: "Faculty"
    },
    {
      name: "Sadhna Ganjir",
      subject: "English / Communication Skills",
      shortSubject: "English",
      cabin: "7th Floor Staff Room",
      role: "Faculty"
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// Department: Integrated M.Tech (IMTECH)
// ─────────────────────────────────────────────────────────────────────────────
export const IMTECH_DEPARTMENT_DATA = {
  departmentName: "Integrated M.Tech",
  shortName: "IMTECH",
  hod: {
    name: "Dr. Anwar A Shaikh",
    title: "Head of Department (HOD)",
    email: "anwarshaikhset@sanjivani.edu.in",
    contact: "9044013605",
    cabin: "—"
  },
  year1Faculties: [
    {
      name: "Prof. Prajwal Aher",
      subject: "Mathematics-1",
      shortSubject: "Mathematics-1",
      role: "Faculty"
    },
    {
      name: "Prof. Piyush Sahu",
      subject: "Design Thinking and Idea Lab",
      shortSubject: "Design Thinking",
      role: "Faculty"
    },
    {
      name: "Dr. Anwar A Shaikh",
      subject: "Fundamentals of Computing Systems and Emerging Technologies",
      shortSubject: "Computing Systems & Emerging Tech",
      role: "HOD & Faculty"
    },
    {
      name: "Prof. Sadhna Gunjir",
      subject: "English - Oral and Written Communication Skills",
      shortSubject: "English Communication",
      role: "Faculty"
    },
    {
      name: "Prof. Hari Prasath K",
      subject: "Programming in Problem Solving using C",
      shortSubject: "C Programming",
      role: "Faculty"
    },
    {
      name: "Prof. Prajwal Aher",
      subject: "NSS / Yoga / Sports / Liberal Arts",
      shortSubject: "NSS / Liberal Arts",
      role: "Faculty"
    },
    {
      name: "Prof. Piyush Sahu",
      subject: "Indian Knowledge System",
      shortSubject: "Indian Knowledge System",
      role: "Faculty"
    }
  ],
  year2Faculties: [
    {
      name: "Dr. Latika Bawankar",
      subject: "Linear Algebra and Transformation Techniques",
      shortSubject: "Linear Algebra",
      role: "Faculty"
    },
    {
      name: "Prof. Prajwal Aher",
      subject: "Programming for Data Science (Python)",
      shortSubject: "Python / Data Science",
      role: "Faculty"
    },
    {
      name: "Prof. Piyush Sahu",
      subject: "Essentials of Cyber Security",
      shortSubject: "Cyber Security",
      role: "Faculty"
    },
    {
      name: "Prof. Vikas Kumar",
      subject: "Exploratory Data Analytics",
      shortSubject: "Data Analytics",
      role: "Faculty"
    },
    {
      name: "Dr. Anwar A Shaikh",
      subject: "Data Structures and Algorithms",
      shortSubject: "DSA",
      role: "HOD & Faculty"
    },
    {
      name: "Dr. Bandana Thakur",
      subject: "Financial Management",
      shortSubject: "Financial Management",
      role: "Faculty"
    },
    {
      name: "Prof. D. Roushan",
      subject: "Foreign Language - 1 (Japanese)",
      shortSubject: "Japanese",
      role: "Language Faculty"
    },
    {
      name: "Prof. Riya Khandelwal",
      subject: "Foreign Language - 1 (German)",
      shortSubject: "German",
      role: "Language Faculty"
    }
  ]
};

export const IMTECH_KNOWLEDGE_PROMPT = `
INTEGRATED M.TECH (IMTECH) DEPARTMENT — FACULTY & SUBJECT DIRECTORY:
- Department: Integrated M.Tech (IMTECH)
- Head of Department (HOD): Dr. Anwar A Shaikh
- HOD Email: anwarshaikhset@sanjivani.edu.in
- HOD Contact: 9044013605

1st Year Faculty & Subjects:
1. Prof. Prajwal Aher — Mathematics-1
2. Prof. Piyush Sahu — Design Thinking and Idea Lab
3. Dr. Anwar A Shaikh (HOD) — Fundamentals of Computing Systems and Emerging Technologies
4. Prof. Sadhna Gunjir — English - Oral and Written Communication Skills
5. Prof. Hari Prasath K — Programming in Problem Solving using C
6. Prof. Prajwal Aher — NSS / Yoga / Sports / Liberal Arts
7. Prof. Piyush Sahu — Indian Knowledge System

2nd Year Faculty & Subjects:
1. Dr. Latika Bawankar — Linear Algebra and Transformation Techniques
2. Prof. Prajwal Aher — Programming for Data Science (Python)
3. Prof. Piyush Sahu — Essentials of Cyber Security
4. Prof. Vikas Kumar — Exploratory Data Analytics
5. Dr. Anwar A Shaikh (HOD) — Data Structures and Algorithms
6. Dr. Bandana Thakur — Financial Management
7. Prof. D. Roushan — Foreign Language - 1 (Japanese)
8. Prof. Riya Khandelwal — Foreign Language - 1 (German)

Whenever any student asks about IMTECH faculty, HOD Dr. Anwar Shaikh, Maths, Design Thinking, Computing Systems, C Programming, Data Science, Python, Cyber Security, Data Analytics, DSA, Financial Management, Japanese, German in IMTECH department — provide these exact details accurately and clearly!
`;
