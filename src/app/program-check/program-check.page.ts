import { Component, OnInit } from '@angular/core';
import {Program} from "../models/Program";
import {Select, Store} from "@ngxs/store";
import {AppState} from "../state/app.state";
import {Observable} from "rxjs";
import {Uace, UaceGrades} from "../models/uace";
import {Uce, UceGrades} from "../models/uce";
import {SetPrograms} from "../state/app.actions";
import {ProgramCheck} from "../models/Recommendation";

@Component({
  selector: 'app-program-check',
  templateUrl: './program-check.page.html',
  styleUrls: ['./program-check.page.scss'],
})
export class ProgramCheckPage implements OnInit {

  programs: Program[];
  display: Program[];
  submission: ProgramCheck;

  @Select(AppState.getPrograms) programs$: Observable<Program[]>;
  @Select(AppState.getUaceSubjects) uaceSubjects$: Observable<Uace[]>;

  @Select(AppState.getCompulsoryUceSubjects) uceCompulsorySubjects$: Observable<Uce[]>;
  @Select(AppState.getElectiveUceSubjects) uceElectiveSubjects$: Observable<Uce[]>;

  @Select(AppState.getUceGrades) uceGrades$: Observable<UceGrades[]>;
  @Select(AppState.getUaceGrades) uaceGrades$: Observable<UaceGrades[]>;

  constructor(private appStore: Store) {
    this.submission = new class implements ProgramCheck {
      admission_type: string;
      gender: string;
      program_code: string;
      uace_results: string;
      uce_results: string;

      constructor() {
        this.program_code = '';
      }
    }

  }

  async ngOnInit() {
    await this.initialize();
  }

  async initialize() {
    await this.appStore.dispatch(new SetPrograms());
    this.programs$.subscribe((data: Program[]) => {
      this.programs = data;
    });
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.display = Array<Program>();

    requestAnimationFrame(() => {
      this.programs.forEach(program => {
        const shouldShow = program.name.toLowerCase().indexOf(query) > -1;
        if (shouldShow) {
          this.display.push(program);
        }
      });
    });
  }

  selectProgram(program: Program) {
    this.submission.program_code = program.code;
    this.display = Array<Program>();
  }

}
