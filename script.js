document.addEventListener('DOMContentLoaded', function () {

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  /* ---- Booking tabs: Grooming vs Médico ---- */
  var tabButtons = document.querySelectorAll('.booking-tabs .k-tab');
  var groomingForm = document.getElementById('groomingForm');
  var medicoForm = document.getElementById('medicoForm');

  function activateTab(target) {
    tabButtons.forEach(function (btn) {
      var isActive = btn.getAttribute('data-tab') === target;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    if (target === 'grooming') {
      groomingForm.classList.remove('hidden');
      medicoForm.classList.add('hidden');
    } else {
      medicoForm.classList.remove('hidden');
      groomingForm.classList.add('hidden');
    }
  }

  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activateTab(btn.getAttribute('data-tab'));
    });
  });

  /* ---- Hero CTA buttons jump straight to the right tab ---- */
  document.querySelectorAll('[data-tab-target]').forEach(function (link) {
    link.addEventListener('click', function () {
      var target = link.getAttribute('data-tab-target');
      // slight delay so the smooth-scroll has started before we swap panels
      setTimeout(function () { activateTab(target); }, 150);
    });
  });

});
