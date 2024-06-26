<script setup>
import $ from 'jquery'
import { ref } from 'vue'

$(document).ready(function () {
  $('.logo').css('color', 'red')
  $('.logo').addClass('fr')
  let btnMenu1 = document.querySelector('.btn-menu')
  let btnMenu = $('.btn-menu')
  btnMenu.click(function () {
    if (btnMenu.hasClass('fa-remove')) {
      // this.$router.go(-1); // 返回上一个路由
      this.$router.push('/')
    } else {
      this.$router.push('/menu')
    }
    btnMenu.toggleClass('fa-remove')
    btnMenu.toggleClass('fa-navicon')
  })
})

// let lastScrollY = 0;
// window.onresize = () => {
// let fill=$('.fill')
// var width = fill.width();
// if (width==0){
//   console.log('window Width:', );
// }
// console.log('Width:', width);
// }

/*
window.onscroll = () => {
  const currentScrollY = window.scrollY;
  const difference = currentScrollY - lastScrollY;
  lastScrollY = currentScrollY;
  if (difference > 0) {
    $(".header").addClass("hidden")
  } else if (difference < 0) {
    $(".header").removeClass("hidden")
    $(".header").addClass("active")
  }
  if (currentScrollY == 0) {
    $(".header").removeClass("active")
  }
}
*/

let linksBox = ref(null)

function demo() {
  const element = document.createElement('a')
  element.href = 'url'
  //for routerlink
  //element.setAttribute('to', finalUrl);
  element.target = link.target || '_blank'
  element.textContent = link.name
  linksBox.value.appendChild(element)
}
</script>

<template></template>

<style scoped lang="less"></style>
