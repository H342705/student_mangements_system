// Making a Student Mangement system using  Conversational CLI User Interface
import inquirer from "inquirer";
import chalk from "chalk";
import gradient from "gradient-string";

class Choice {
  name: string;
  prev_institute: string;
  course: string;
  fees: string;
  user_portal: string;

  constructor() {
    this.name = "";
    this.prev_institute = "";
    this.course = "";
    this.fees = "";
    this.user_portal = "";
    console.log("Welcome to the Registration Form");
  }

  async menu() {
    while (true) {
      const dictio = {
        1: "Enroll",
        2: "select_course",
        3: "portal",
        4: "exit",
      };

      const { choice } = await inquirer.prompt({
        type: "input",
        name: "choice",
        message: `Enter your choice ${JSON.stringify(dictio)}`,
      });

      if (choice === "1") {
        await this.enroll();
      } else if (choice === "2") {
        await this.select_course();
      } else if (choice === "3") {
        await this.student_portal();
      } else if (choice === "4") {
        break;
      } else {
        console.log("Invalid choice. Please enter 1, 2, or 3.");
      }
    }
  }

  async enroll() {
    const { name, prev_institute } = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enrollment form \nEnter your name:",
      },
      {
        type: "input",
        name: "prev_institute",
        message: "Enter your previous institute:",
      },
    ]);

    console.log(`\nThank you, ${name}! You are now enrolled.`);
    this.name = name;
    this.prev_institute = prev_institute;
  }

  async select_course() {
    const { course_choice } = await inquirer.prompt({
      type: "input",
      name: "course_choice",
      message:
        "Enter your course choice (1. Science, 2. Engineering, 3. Medical, 4. Back to menu):",
    });

    if (
      course_choice === "1" ||
      course_choice === "2" ||
      course_choice === "3"
    ) {
      const courseOptions = ["Science", "Engineering", "Medical"];
      this.course = courseOptions[parseInt(course_choice) - 1];

      const { fees } = await inquirer.prompt({
        type: "input",
        name: "fees",
        message: `${this.course} has fees 8500. Agree? (type yes)`,
      });

      this.fees = fees === "yes" ? "8500" : "0"; // Assuming 'yes' means agreed
    } else if (course_choice === "4") {
      this.course = "Back to menu";
    }
  }

  async student_portal() {
    const portalDict = {
      "Student Name": this.name,
      "enroll id": 12345,
      "Previous Education": this.prev_institute,
      "Enrolled Course": this.course,
      "Fees Paid": this.fees,
    };

    const { user_portal } = await inquirer.prompt({
      type: "input",
      name: "user_portal",
      message: `${JSON.stringify(portalDict)}`,
    });

    this.user_portal = user_portal;
  }

  show_fee_details(course: string, fees: string) {
    console.log(`\nCourse: ${course}`);
    console.log(`Fees: ${fees}`);
    console.log("Thank you for the course!");
  }
}

const choi = new Choice();
choi.menu();
choi.student_portal();
