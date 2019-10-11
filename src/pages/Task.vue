<template>
  <main>
    <b-container class="h-100">
      <h1>Task</h1>
      <p>Exchange rate status: {{ status }}.</p>

      <b-row class="justify-content-center align-items-center h-75">
        <b-form class="qa-form-currency" @submit="onSubmit" inline>
          <label class="qa-label-currency sr-only m-2" for="input-currency">Currency</label>
          <b-form-select
            class="qa-input-currency mb-2 mr-sm-2 mb-sm-0"
            id="input-currency"
            :value="'0'"
            :options="currencies"
            @change="setCurrency"
          >
          </b-form-select>

          <label class="qa-label-amount sr-only m-2" for="input-amount">Amount</label>
          <b-form-input
            class="qa-input-amount"
            id="input-amount"
            min="0.01"
            placeholder="Please enter an amount."
            required
            step="0.01"
            type="number"
            @change="setAmount"
          ></b-form-input>

          <b-button class="qa-button-submit m-2" type="submit" variant="dark">Submit</b-button>
        </b-form>
      </b-row>
      <p class="qa-form-submit-value">{{ submitValue }}</p>
    </b-container>
  </main>
</template>

<script>
import { BForm, BFormInput } from 'bootstrap-vue';
import { mapState } from 'vuex';

export default {
  components: {
    BForm,
    BFormInput,
  },

  computed: mapState('currency', {
    currencies: state => state.exchange.currencyOptions,
    status: state => state.exchange.status,
    submitValue: state => state.formData.submitValue,
  }),

  methods: {
    setAmount: function setAmountFn(value) {
      this.$store.commit('currency/setAmount', value);
    },

    setCurrency: function setCurrencyFn(value) {
      this.$store.commit('currency/setActiveCurrency', value);
    },

    onSubmit: function onSubmitFn(e) {
      e.preventDefault();
      this.$store.dispatch('currency/submitAmount');
    },
  },

  mounted: async function mountedFn() {
    this.$store.dispatch('currency/refreshExchange');
  },
};
</script>

<style>
main {
  height: 100%;
}
</style>
