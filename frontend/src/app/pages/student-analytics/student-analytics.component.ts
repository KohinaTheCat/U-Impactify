import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { Chart } from 'chart.js';
import { Assessment } from 'src/app/models/assessment.model';
import seedrandom from 'seedrandom';

@Component({
  selector: 'app-student-analytics',
  templateUrl: './student-analytics.component.html',
  styleUrls: ['./student-analytics.component.css'],
})
export class StudentAnalyticsComponent implements OnInit {
  courseId: string;
  targets: any[];
  assessments: Assessment[];
  marks: Array<any>;
  marksMap: Map<string, Map<string, number>>;

  constructor(
    private router: Router,
    private courseService: CourseService,
    private UserService: UserService,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.params['id'];

    this.courseId = id;
  }

  ngOnInit() {
    this.courseService.getAllAssessments(this.courseId).subscribe((res) => {
      this.assessments = res;

      this.marksMap = new Map<string, Map<string, number>>();
      
      for (var i=0; i < this.assessments.length; i++) {

        var assessmentName = this.assessments[i].name;


        var studentMarksMap = new Map<string, number>();

        for (var j=0; j < this.assessments[i].studentSubmissions.length; j++ ) {

          var studentName = this.assessments[i].studentSubmissions[j]["studentId"];
          var mark = this.assessments[i].studentSubmissions[j]["mark"];

          studentMarksMap.set(studentName, mark);
        }

        this.marksMap.set(assessmentName, studentMarksMap);
      }
      
      var assessmentNames = [];
      var studentNames = [];

      this.marksMap = new Map([...this.marksMap.entries()].sort());
      // Get all student names first
  
      for (let assessment of this.marksMap) {
        assessmentNames.push(assessment[0]);

        for (let entry of assessment[1].entries()) {
          if(!studentNames.includes(entry[0])) {
            studentNames.push(entry[0]);
          }
        }

      }
      
      // for each student, populate their dataset with their grades according to the assessment

      var dataSetValue = [];

      for (var i=0; i < studentNames.length; i++) {

        var grades = [];

        for (var j=0; j < assessmentNames.length; j++) {
          
          var grade = this.marksMap.get(assessmentNames[j]).get(studentNames[i]);
        
          if (grade > 0) {
            grades.push(grade);
          } else {
            grades.push(0);
          }

        }


        var rng = seedrandom(studentNames[i]);

        var rngVal = (rng()).toString();
        
        var r = parseInt(rngVal.substring(2, 5)) % 255;
        var g = parseInt(rngVal.substring(5, 8)) % 255;
        var b = parseInt(rngVal.substring(8, 11)) % 255;

        var barFill = [];
        var barOutline = [];
        var hoverColor = [];
        
        for (var k=0; k < assessmentNames.length; k++) {
          barFill.push(['rgba(' + r.toString() + ',' + g.toString() + ',' + b.toString() + ',' + '0.2)'])
        }

        for (var k=0; k < assessmentNames.length; k++) {
          barOutline.push(['rgba(' + r.toString() + ',' + g.toString() + ',' + b.toString() + ',' + '1)'])
        }

        dataSetValue[i] = {
          label: studentNames[i],
          data: grades,
          borderWidth: 1,
          backgroundColor: barFill,
          borderColor: barOutline,
          hoverBackgroundColor: barFill,
          hoverBorderColor: barOutline
        };
      }

      var myChart = new Chart('myChart', {
        type: 'bar',
        data: {
          labels: assessmentNames,
          datasets: dataSetValue,
        },
        options: {
          title: {
            display: true,
            text: 'Student Marks'
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  suggestedMax: 100,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Assessment'
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Mark (%)' 
                },
              },
            ],
          },
        },
      });
    });
  }

  back() {
    this.router.navigate([`course/${this.courseId}`]);
  }
}
