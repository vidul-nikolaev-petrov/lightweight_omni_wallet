import Rx from 'rxjs/Rx';

export const store = {
    subscribe(component) {
        const name = this.getName(component);
        this[name.comp] = component; // new react context

        if (!this[name.store]) {
            this[name.store] = {};
            this[name.subject] = new Rx.Subject();
            this[name.subject].subscribe(result => {
                console.log('observer:', result.value);
                this[name.store][result.target] = result.value;
            });
        }
    },
    dispatch(component, target, value, cbs={}) {
        const { comp, subject } = this.getName(component);

        cbs.onSuccess = cbs.onSuccess || (value => {
            this[comp].setState({ [target]: value });
            return value;
        });

        cbs.onError = cbs.onError || (error => {
            this[comp].setState({ [`error${target}`]: error });
            return error;
        });
        
        cbs.onComplete = cbs.onComplete || (() => {});

        Rx.Observable.from(value)
            .subscribe(
                value => {
                    this[subject].next({ target, value: cbs.onSuccess(value) });
                },
                error => {
                    this[subject].next({ target, value: cbs.onSuccess(error) });
                },
                comlpete => {
                    cbs.onComplete();
                }
            );
    },
    getVal(component, target) {
        const { store } = this.getName(component);
        return this[store][target];
    },
    getName(component) {
        const comp = component.constructor.name,
            store = '__' + comp,
            subject = '_' + comp;
        return { comp, store, subject };
    },
};