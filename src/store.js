import Rx from 'rxjs/Rx';

export const store = {
    ids: {
        store: 'store_',
        storeGlobal: 'storeGlobal_',
        subject: 'subject$',
    },
    subscribe(component) {
        const name = this.getName(component);
        this[name.comp] = component; // new react context

        if (!this[name.store]) {
            this[name.store] = {};
            this[name.subject] = new Rx.Subject();
            this[name.subject].subscribe(result => {
                this[name.store][result.key] = this.objectAssign(result.value);
                if (result.storeGlobal) {
                    this[this.ids.storeGlobal][result.key] = this[name.store][result.key];
                }
            });
        }
    },
    dispatch(component, key, value, cbs={}) {
        const { comp, subject } = this.getName(component);
        const storeGlobal = cbs.storeGlobal;

        cbs.onSuccess = cbs.onSuccess || (value => {
            this[comp].setState({ [key]: value });
            return value;
        });

        cbs.onError = cbs.onError || (error => {
            this[comp].setState({ [`error${key}`]: error });
            return error;
        });
        
        cbs.onComplete = cbs.onComplete || (() => {});

        Rx.Observable.from(value)
            .subscribe(
                value => {
                    this[subject].next({ storeGlobal, key, value: cbs.onSuccess(value) });
                },
                error => {
                    this[subject].next({ storeGlobal, key, value: cbs.onSuccess(error) });
                },
                comlpete => {
                    cbs.onComplete(value);
                }
            );
    },
    get(component, key) {
        const { store } = this.getName(component);
        return this[store][key];
    },
    getGlobal(key) {
        return this[this.ids.storeGlobal][key];
    },
    getName(component) {
        const comp = component.constructor.name,
            store = this.ids['store'] + comp, // store: component's namespace
            subject = this.ids['subject'] + comp; // Rx subject: identifier
        return { comp, store, subject };
    },
    objectAssign(object) {
        return JSON.parse(JSON.stringify(object));
    }
};

(function initStore() {
    store[store.ids.storeGlobal] = {};
})();
