import eventBus from '@/eventBus';

export default function goToPage(pageName, pageParams) {
  setTimeout(() => {
    eventBus.$emit('goToPage', pageName, pageParams);
  }, 1000);
}
