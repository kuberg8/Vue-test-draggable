import Vue from "vue";
import Vuex from "vuex";
import CardController from "../controllers/CardController";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cards: CardController.items,
    selectedCard: {},
    showMode: false,
  },
  actions: {
    addCard({ commit }, card) {
      CardController.addItem(card);
      commit("ADD_CARD", card);
    },
    setCards({ commit }, cards) {
      CardController.setItems(cards);
      commit("SET_CARDS", cards);
    },
    showSelectedCard({ commit }, card) {
      commit("SET_SELECTED_CARD", card);
      commit("SET_SHOW_MODE", true);
    },
  },
  getters: {},
  mutations: {
    SET_SHOW_MODE(state, mode) {
      state.showMode = mode;
    },
    SET_SELECTED_CARD(state, card) {
      state.selectedCard = card;
    },
    SET_CARDS(state, cards) {
      state.cards = cards;
    },
    ADD_CARD(state, card) {
      state.cards.push(card);
    },
  },
});
