<template>
  <div class="flash flash--success">
    This is a flash message
    <span class="closebtn">&times;</span>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.flash {
  position: fixed;
  bottom: 15px;
  right: 15px;
  width: 500px;
  padding: 20px;
  color: white;
  opacity: 1;
  transition: opacity 0.6s;
}

.flash--success {
  background-color: #DBEFDB;
  color: #005a00;
}

.flash--success .closebtn {
  color: #005a00;
}

.flash--info {
  background-color: #CCEFFC;
  color: #0056a0;
}

.closebtn {
  margin-left: 15px;
  color: inherit;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
  opacity: 0.7;
}

.closebtn:hover {
  opacity: 1;
}
</style>