
import { State, Action, StateContext, Selector, Store, Select } from '@ngxs/store';
//import {  ConfirmOrder, OrderFailed, OrderSuccess, AddToCart, RemoveFromCart, SetCart, SetOrders, UpdateAmount } from './orders.actions';
import { tap} from 'rxjs/operators';
// import { OrderService } from '../services/order.service';
// import { Order, OrderItem } from '../models/order';

// import { StoreItem } from '../models/store-items';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MessageComponent } from '../message/message.component';
// import { StoresStateModel, StoresState } from './stores.state';
import { Observable } from 'rxjs';
import { Uace, UaceGrades } from '../models/uace';
import { Uce, UceGrades } from '../models/uce';
import { Career } from '../models/Career';
import {SetCareers, SetSubjects} from './app.actions';
import { ServerService } from '../services/server.service';


export interface AppStateModel {
    uace: Uace[];
    uaceGrades: UaceGrades[];
    uce: Uce[];
    uceGrades: UceGrades[];
    careers: Career[];
}

const defaults: AppStateModel = {
    uace: Array<Uace>(),
    uce: Array<Uce>(),
    uaceGrades: Array<UaceGrades>(),
    uceGrades: Array<UceGrades>(),
    careers: Array<Career>()
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
    static getCareers(state: AppStateModel) {
        return state.careers;
    }

    @Selector()
    static getUceSubjects(state: AppStateModel) {
        return state.uce;
    }

    @Selector()
    static getUceCompSubjects(state: AppStateModel) {
        return state.uce.filter(subject => subject.compulsory === true);
    }

    @Action(SetSubjects)
    setSubjects(context: StateContext<AppStateModel>) {
        this.serverService.getSubjects();
        // context.setState({uce: [], uace: [], uaceGrades: [], uceGrades: []});
    }

    @Action(SetCareers)
    setCareers(context: StateContext<AppStateModel>) {
        this.serverService.getCareers().subscribe( (careers: Career[]) => {
            context.patchState({careers});
        }, (error => {
            console.log(error);
        }));
    }
}
