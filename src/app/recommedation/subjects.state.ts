
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
import { Uace, UaceGrades } from './models/uace';
import { Uce, UceGrades } from './models/uce';
import { SetSubjects } from './subjects.actions';
import { ServerService } from '../services/server.service';


export interface SubjectsStateModel {
    uace: Uace[];
    uaceGrades: UaceGrades[]
    uce: Uce[];
    uceGrades: UceGrades[];
}

const defaults: SubjectsStateModel = {
    uace: Array<Uace>(),
    uce: Array<Uce>(),
    uaceGrades: Array<UaceGrades>(),
    uceGrades: Array<UceGrades>(),
}

@State<SubjectsStateModel>({
    name: 'subjects',
    defaults
})
export class SubjectsState{
    constructor(private _server: ServerService){}

    @Selector()
    static getUaceSubjects(state: SubjectsStateModel){
        return state.uace
    }

    @Selector()
    static getUceSubjects(state: SubjectsStateModel){
        return state.uce
    }

    @Selector()
    static getUceCompSubjects(state: SubjectsStateModel){
        return state.uce.filter(subject => subject.compulsory == true)
    }

    @Action(SetSubjects)
    setSubjects(context: StateContext<SubjectsStateModel>){
        this._server.getSubjects();
        context.setState({uce: [], uace: [], uaceGrades: [], uceGrades: []});
    }
}
