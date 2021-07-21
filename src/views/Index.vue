<template>
  <div>
    <section style="margin: 20px auto">
      <button
        type="button"
        class="btn btn-outline-primary btn-lg"
        @click="$router.push('/create-card')"
        style="margin-bottom: 20px"
      >
        Добавить
      </button>
      <div class="form-check form-switch">
        <input
          v-model="draggable"
          class="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault"
        />
        <label class="form-check-label" for="flexSwitchCheckDefault"
          >Click&drag</label
        >
      </div>
    </section>

    <section class="cards">
      <Card
        v-for="(card, index) in cards"
        :key="index"
        :name="card.name"
        :description="card.description"
        @click="showSelectedCard(card)"
        @dragstart="take($event, index)"
        @drop="move($event, index)"
        style="cursor: pointer; max-height: 190px; min-height: 190px; overflow: auto"
        :draggable="draggable"
      />
    </section>

    <Modal
      v-if="showMode"
      width="350px"
      height="300px"
      @close="SET_SHOW_MODE(false)"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title title">{{ selectedCard.name }}</h5>
          <button @click="SET_SHOW_MODE(false)" class="btn-close"></button>
        </div>
        <div class="modal-body" style="overflow: auto; word-wrap: break-word;">
          <p>{{ selectedCard.description }}</p>
        </div>
        <div class="modal-footer">
          <button @click="SET_SHOW_MODE(false)" class="btn btn-secondary">
            Закрыть
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import Modal from "../components/Modal.vue";
import CardController from "../controllers/CardController";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  components: { Card, Modal },
  mounted() {
    if (!CardController.items.length)
      this.setCards([
        { name: "Наименование1", description: "Описание1" },
        { name: "Наименование2", description: "Описание2" },
      ]);

    this.setCards(this.cards);
  },
  data() {
    return {
      draggable: false,
    };
  },
  methods: {
    ...mapActions(["showSelectedCard", "setCards"]),
    ...mapMutations(["SET_SHOW_MODE"]),
    move(event, index) {
      const transferIndex = event.dataTransfer.getData("index");

      const from = { ...this.cards[transferIndex] };
      const to = { ...this.cards[index] };

      const replacedCards = [...this.cards];

      replacedCards[index] = from;
      replacedCards[transferIndex] = to;

      this.setCards(replacedCards);
    },
    take(event, index) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("index", index.toString());
    },
  },
  computed: {
    ...mapState(["cards", "showMode", "selectedCard"]),
  },
};
</script>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
</style>
