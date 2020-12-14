<template>
  <nav class="wrapper">
    <ul>
      <li><router-link to="/planter">Planter</router-link></li>
      <li><router-link to="/catalogue">Catalogue</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
nav.wrapper {
  width: 10rem;
}

a {
  text-decoration: none;
  color: #f391e3;
  opacity: 0.8;
  display: inline-block;
  padding-bottom: 0.5rem;
}

a:active,
a:hover,
a.router-link-active {
  opacity: 1;
  border-bottom: 1px solid #f391e3;
}

ul {
  list-style: none;
  margin: 1rem 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

li {
  width: 100%;
  padding: 0.5rem 2rem;
  border: 1px solid transparent;
}
</style>

