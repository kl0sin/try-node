<template>
  <div class="form columns">
    <form class="column is-6" v-on:submit.prevent="submit()">
      <h2>Add new user</h2>
      <label class="form__label" for="firstName">
        First name
      </label>
      <input class="form__input" type="text" name="firstName" v-model="firstName" placeholder="First name">
      <label class="form__label" for="lastName">
        Last name
      </label>
      <input class="form__input" type="text" name="lastName" v-model="lastName" placeholder="Last name">
      <button class="form__submit" type="submit">
        Submit
      </button>
    </form>
  </div>
  
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      firstName: '',
      lastName: '' 
    }
  },
  methods: {
    submit() {
      const user = {
        firstName: this.firstName,
        lastName: this.lastName
      }
      this.$http.post('http://localhost:3000/user', user).then(function(response) {
      }, function(response) {
        console.log('errors!')
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/styles/helloWorld";
</style>
