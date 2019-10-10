<template>
  <div id="app">
    <b-navbar class="qa-navbar-top" fixed="top" type="dark" variant="dark">
      <b-navbar-brand to="/home">home</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/about">about</b-nav-item>
          <b-nav-item to="/task">task</b-nav-item>
        </b-navbar-nav>
      </b-collapse>

    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import {
  BCollapse, BNavbar, BNavbarNav, BNavItem,
} from 'bootstrap-vue';

export default {
  name: 'app',
  components: {
    BCollapse,
    BNavbar,
    BNavbarNav,
    BNavItem,
  },
};
</script>

<style>
body, html {
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 100px;
  height: 100%;
}
</style>
