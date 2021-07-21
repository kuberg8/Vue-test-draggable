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
          v-model="clickAndDrag"
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
        @click="checkCard(card)"
        @dragstart="take($event, index)"
        @drop="move($event, index)"
        style="cursor: pointer; max-height: 190px; min-height: 190px; overflow: auto"
        :draggable="clickAndDrag"
      />
    </section>

    <Modal
      v-if="showModal"
      width="350px"
      height="300px"
      @close="showModal = false"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title title">{{ selectedCard.name }}</h5>
          <button @click="showModal = false" class="btn-close"></button>
        </div>
        <div class="modal-body" style="overflow: auto; word-wrap: break-word;">
          <p>{{ selectedCard.description }}</p>
        </div>
        <div class="modal-footer">
          <button @click="showModal = false" class="btn btn-secondary">
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
import Vue from "vue";

export default {
  components: { Card, Modal },
  mounted() {
    if (!CardController.items.length)
      this.cards = [
        { name: "Наименование1", description: "Описание1" },
        { name: "Наименование2", description: "Описание2" },
      ];
    CardController.setItems(this.cards);
  },
  data() {
    return {
      cards: CardController.items,
      selectedCard: {},
      showModal: false,
      clickAndDrag: false,
    };
  },
  methods: {
    checkCard(card) {
      this.selectedCard = card;
      this.showModal = true;
    },
    move(event, index) {
      const transferIndex = event.dataTransfer.getData("index");

      const from = { ...this.cards[transferIndex] };
      const to = { ...this.cards[index] };

      Vue.set(this.cards, index, from);
      Vue.set(this.cards, transferIndex, to);
      CardController.setItems(this.cards);
    },
    take(event, index) {
      if (this.clickAndDrag) {
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("index", index.toString());
      }
    },
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
