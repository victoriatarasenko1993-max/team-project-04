import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
import '../css/faq.css';

const faqAccordion = document.querySelector('.faq-accordion');

if (faqAccordion) {
  new Accordion(faqAccordion, {
    duration: 400,
    showMultiple: false,
    openOnInit: [],
  });
}