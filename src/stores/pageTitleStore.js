import { defineStore } from 'pinia';

export const usePageTitleStore = defineStore('pageTitle', {
  state: () =>({
    title: 'Inicio'
  }),
  actions: {
    setTitle(newTitle){
      this.title = newTitle;
    }
  }
});
