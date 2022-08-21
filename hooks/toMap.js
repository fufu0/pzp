import { mapState, mapMutations , mapActions,useStore,mapGetters } from 'vuex';
import {computed} from 'vue';
let toMapState = function(name,data) {
      const store = useStore();
      const storeStateFns = mapState(name,data);
   
      const storeState = {};
      Object.keys(storeStateFns).forEach(fnKey => {
        const fn = storeStateFns[fnKey].bind({ $store: store });
        storeState[fnKey] = computed(fn);
      });
   
      return storeState
}

let toMapActions = function(name,data) {
      const store = useStore();
      const storeActionsFns = mapActions(name,data);
   
      const storeActions = {};
      Object.keys(storeActionsFns).forEach(fnKey => {
        const fn = storeActionsFns[fnKey].bind({ $store: store });
        storeActions[fnKey] = fn;
      });
   
      return storeActions
}

let toMapMutations = function(name,data) {
      const store = useStore();
      const storeMutationsFns = mapMutations(name,data);
   
      const storeMutations = {};
      Object.keys(storeMutationsFns).forEach(fnKey => {
        const fn = storeMutationsFns[fnKey].bind({ $store: store });
        storeMutations[fnKey] = fn;
      });
   
      return storeMutations
}

let toMapGetters = function(name,data) {
      const store = useStore();
      const storeGettersFns = mapGetters(name,data);
   
      const storeGetters = {};
      Object.keys(storeGettersFns).forEach(fnKey => {
        const fn = storeGettersFns[fnKey].bind({ $store: store });
        storeGetters[fnKey] = computed(fn);
      });
   
      return storeGetters
}

export {toMapState, toMapActions, toMapGetters,toMapMutations}