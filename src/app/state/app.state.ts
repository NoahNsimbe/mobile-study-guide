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
import {SetCareers, SetPrograms, SetSubjects, SetUaceSubjects, SetUceSubjects} from './app.actions';
import {ServerService} from '../services/server.service';
import {Program} from '../models/Program';


export interface AppStateModel {
    uace: Uace[];
    uaceGrades: UaceGrades[];
    uce: Uce[];
    uceGrades: UceGrades[];
    careers: Career[];
    programs: Program[];
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
        ],
    careers: Array<Career>(),
    programs: Array<Program>()
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

    @Action(SetSubjects)
    setSubjects(context: StateContext<AppStateModel>) {
        context.dispatch(new SetUceSubjects());
        context.dispatch(new SetUaceSubjects());
    }

    @Action(SetCareers)
    setCareers(context: StateContext<AppStateModel>, action: SetUceSubjects) {
        if(context.getState().careers === [] || action.force === true)
            this.serverService.getCareers().subscribe( (data: Career[]) => {
                context.patchState({careers: data});
            }, (error => {
                console.log(error);
            }));
    }

    @Action(SetPrograms)
    setPrograms(context: StateContext<AppStateModel>, action: SetPrograms) {
        if(context.getState().programs === [] || action.force === true)
            this.serverService.getPrograms().subscribe( (data: Program[]) => {
                context.patchState({programs: data});
            }, (error => {
                console.log(error);
            }));
    }

    @Action(SetUceSubjects)
    setUceSubjects(context: StateContext<AppStateModel>, action: SetUceSubjects) {
        if(context.getState().uce === [] || action.force === true)
            this.serverService.getUceSubjects().subscribe( (data: Uce[]) => {
                context.patchState({uce : data});
            }, (error => {
                console.log(error);
            }));
    }

    @Action(SetUaceSubjects)
    setUaceSubjects(context: StateContext<AppStateModel>, action: SetUaceSubjects) {
        if(context.getState().uace === [] || action.force === true)
            this.serverService.getUaceSubjects().subscribe( (data: Uace[]) => {
                context.patchState({uace: data});
            }, (error => {
                console.log(error);
            }));
    }


}
