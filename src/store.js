import Rx from 'rxjs/Rx';
import { SafexString } from './constants';

export const store = {
    // namespace prefixes
    // ids: {
    //     store: '$',
    //     storeGlobal: '$$',
    //     subject: 'subject$',
    // },
    subscribe(component) {
        const name = this.getName(component);
        this.$[name.comp] = component; // new react context

        if (!this.$[name.store]) {
            this.$[name.store] = {};
            this.$[name.subject] = new Rx.Subject();
            this.$[name.subject].subscribe(
                value => {
                    const key = value.key || value.errorKey;
                    const val = value.value;
                    this.$[name.store][key] = this.objectAssign(val);
                    if (value.storeGlobal) {
                        this.$$[key] = this.$[name.store][key];
                    }
                    console.log('key:', key);
                    console.log(this.$);
                }
            );
        }
    },
    complete(component) {
        // @TODO cleanup
    },
    dispatch(component, key, value, cbs={}) {
        const { comp, subject } = this.getName(component);
        const errorKey = `error${new SafexString(key).toUpperFirst()}`;
        const storeGlobal = cbs.storeGlobal;

        cbs.onSuccess = isCbGiven(cbs.onSuccess) || (value => {
            this.$[comp].setState({ [key]: value });
            return value;
        });

        cbs.onError = isCbGiven(cbs.onError) || (error => {
            this.$[comp].setState({ [errorKey]: error.message });
            return error;
        });
        
        cbs.onComplete = isCbGiven(cbs.onComplete) || (() => {});

        return Rx.Observable.from(value)
            .subscribe(
                value => this.$[subject].next({ storeGlobal, key, value: cbs.onSuccess(value) || value }),
                error => this.$[subject].next({ storeGlobal, errorKey, value: cbs.onError(error) || error }),
                comlpete => cbs.onComplete(value)
            );

        function isCbGiven(f) {
            return ['function', 'object'].includes(typeof f) && f;
        }
    },
    get(component, key) {
        const { store } = this.getName(component);
        return this.$[store][key];
    },
    getGlobal(key) {
        return this.$$[key];
    },
    getName(component) {
        var comp = component.constructor.name;
        const store = '$' + comp; // store: component's namespace
        const subject = 'subject$' + comp; // Rx subject: identifier
        comp = 'component' + store;
        return { comp, store, subject };
    },
    objectAssign(object) {
        return JSON.parse(JSON.stringify(object));
    }
};

(function initStore() {
    store.$ = {};
    store.$$ = {};
})();
