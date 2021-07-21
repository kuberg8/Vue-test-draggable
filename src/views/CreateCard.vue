<template>
  <div>
    <form @submit.prevent="add" style="width: 100%" class="needs-validation">
      <div>
        <label for="validationCustom01" class="form-label">Наименование</label>
        <input
          v-model="card.name"
          type="text"
          placeholder="Наименование"
          :class="[
            'form-control',
            { 'is-invalid': $v.card.name.$dirty && $v.card.name.$error },
          ]"
        />
        <span
          class="invalid-feedback"
          v-show="$v.card.name.$dirty && $v.card.name.$error"
          >Поле обязательно</span
        >
      </div>
      <div>
        <label for="validationCustom01" class="form-label">Описание</label>
        <textarea
          v-model="card.description"
          placeholder="Описание"
          :class="[
            'form-control',
            {
              'is-invalid':
                $v.card.description.$dirty && $v.card.description.$error,
            },
          ]"
        />
        <span
          class="invalid-feedback"
          v-show="$v.card.description.$dirty && $v.card.description.$error"
          >Поле обязательно</span
        >
      </div>
      <section
        style="display: flex; justify-content: center; width: 100%; margin: 20px 0"
      >
        <button
          type="submit"
          class="btn btn-primary"
          style="margin-right: 20px"
        >
          Добавить
        </button>
        <button
          type="reset"
          class="btn btn-secondary"
          @click="$router.push('/')"
        >
          Отмена
        </button>
      </section>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  validations: {
    card: {
      name: { required },
      description: { required },
    },
  },
  data() {
    return {
      card: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    ...mapActions(["addCard"]),
    add() {
      if (this.$v.card.$invalid) {
        this.$v.$touch();
        return;
      }

      this.addCard(this.card);
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
form div {
  margin-bottom: 30px;
}

form span {
  position: absolute;
}
</style>
