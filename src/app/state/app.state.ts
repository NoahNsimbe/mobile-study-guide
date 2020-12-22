import {Action, Selector, State, StateContext} from '@ngxs/store';
// import {  ConfirmOrder, OrderFailed, OrderSuccess, AddToCart, RemoveFromCart, SetCart, SetOrders, UpdateAmount } from './orders.actions';
// import { OrderService } from '../services/order.service';
// import { Order, OrderItem } from '../models/order';
// import { StoreItem } from '../models/store-items';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MessageComponent } from '../message/message.component';
// import { StoresStateModel, StoresState } from './stores.state';
import {Uace, UaceGrades} from '../models/uace';
import {Uce, UceGrades} from '../models/uce';
import {Career} from '../models/Career';
import {SetArticles, SetCareers, SetPrograms, SetSubjects, SetUaceSubjects, SetUceSubjects} from './app.actions';
import {ServerService} from '../services/server.service';
import {Program} from '../models/Program';
import {Article} from "../models/Article";


export interface AppStateModel {
    uace: Uace[];
    uaceGrades: UaceGrades[];
    uce: Uce[];
    uceGrades: UceGrades[];
    careers: Career[];
    programs: Program[];
    articles: Article[];
}

const defaults: AppStateModel = {
    uace: Array<Uace>(),
    uce: Array<Uce>(),
    uaceGrades: [
        {name : 'A', value : 6},
        {name : 'B', value : 5},
        {name : 'C', value : 4},
        {name : 'D', value : 3},
        {name : 'E', value : 2},
        {name : 'F', value : 1},
    ],
    uceGrades: [
        {name : 'D1', value : 1},
        {name : 'D2', value : 2},
        {name : 'C3', value : 3},
        {name : 'C4', value : 4},
        {name : 'C5', value : 5},
        {name : 'C6', value : 6},
        {name : 'P7', value : 7},
        {name : 'P8', value : 8},
        {name : 'F9', value : 9},
        ],
    careers: Array<Career>(),
    programs: Array<Program>(),
    articles: Array<Article>()
};

@State<AppStateModel>({
    name: 'app',
    defaults
})
export class AppState {
    constructor(private serverService: ServerService) {}

    @Selector()
    static getUaceSubjects(state: AppStateModel) {
        return state.uace;
    }

    @Selector()
    static getPrograms(state: AppStateModel) {
        return state.programs;
    }

    @Selector()
    static getArticles(state: AppStateModel) {
        return state.articles;
    }

    @Selector()
    static getArticle(id : number, state?: AppStateModel) : Article {
        return state.articles.find(value => {
            return value.id === id
        });
    }

    @Selector()
    static getUaceGrades(state: AppStateModel) {
        return state.uaceGrades;
    }

    @Selector()
    static getUceGrades(state: AppStateModel) {
        return state.uceGrades;
    }

    @Selector()
    static getCareers(state: AppStateModel) {
        return state.careers;
    }

    @Selector()
    static getUceSubjects(state: AppStateModel) {
        return state.uce;
    }

    @Selector()
    static getCompulsoryUceSubjects(state: AppStateModel) {
        return state.uce.filter(value =>
            value.category.toUpperCase() === 'COMPULSORY'
        );
    }

    @Selector()
    static getElectiveUceSubjects(state: AppStateModel) {
        return state.uce.filter(value =>
            value.category.toUpperCase() === 'ELECTIVE'
        );
    }


    // @Selector()
    // static findUceSubjectByName(subject: string, state: AppStateModel): Uce{
    //     state.uce.forEach(value => {
    //         if(value.name.trim().toUpperCase() === subject){
    //             return value;
    //         }
    //     })
    //     return null;
    // }
    @Action(SetSubjects)
    setSubjects(context: StateContext<AppStateModel>) {
        context.dispatch(new SetUceSubjects());
        context.dispatch(new SetUaceSubjects());
    }

    @Action(SetCareers)
    setCareers(context: StateContext<AppStateModel>, action: SetCareers) {
        if(context.getState().careers.length === 0 || action.force === true)
            this.serverService.getCareers().then( (data: Career[]) => {
                context.patchState({careers: data});
            }, (error => {
                console.log(error);
            }));
    }

    @Action(SetArticles)
    setArticles(context: StateContext<AppStateModel>, action: SetArticles) {
        if(context.getState().articles.length === 0 || action.force === true)
            this.serverService.getArticles().then( (data: Article[]) => {
                context.patchState({articles: data});
            }, (error => {
                console.log(error);
            }));
    }

    @Action(SetPrograms)
    setPrograms(context: StateContext<AppStateModel>, action: SetPrograms) {
        if(context.getState().programs.length === 0 || action.force === true)
            this.serverService.getPrograms().then( (data: Program[]) => {
                context.patchState({programs: data});
            }, (error => {
                console.log(error);
            }));
    }

    @Action(SetUceSubjects)
    setUceSubjects(context: StateContext<AppStateModel>, action: SetUceSubjects) {
        if(context.getState().uce.length === 0 || action.force === true)
            this.serverService.getUceSubjects().then( (data: Uce[]) => {
                context.patchState({uce : data});
            }, (error => {
                console.log(error);
            }));
    }

    @Action(SetUaceSubjects)
    setUaceSubjects(context: StateContext<AppStateModel>, action: SetUaceSubjects) {
        if(context.getState().uace.length === 0 || action.force === true)
            this.serverService.getUaceSubjects().then( (data: Uace[]) => {
                context.patchState({uace: data});
            }, (error => {
                console.log(error);
            }));
    }


}
