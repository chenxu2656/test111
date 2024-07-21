import { ref } from "vue";
import { defineStore } from "pinia";

export const useHomeStore = defineStore("homeStore", () => {
  const clickedTag = ref("");
  const setclickedTag = (value: string) => {
    clickedTag.value = value;
  };
  return {
    clickedTag,
    setclickedTag,
  };
});
