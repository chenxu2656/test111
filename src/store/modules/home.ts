import { ref } from "vue";
import { defineStore } from "pinia";

export const useHomeStore = defineStore("homeStore", () => {
  const clickedTag = ref("");
  const clickedService = ref("");
  const setclickedTag = (value: string) => {
    clickedTag.value = value;
  };
  const setClickedService = (value: string) => {
    clickedService.value = value;
  };
  return {
    clickedTag,
    clickedService,
    setclickedTag,
    setClickedService,
  };
});
