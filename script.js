const API = '/.netlify/functions/feedback';

// Mobile nav toggle
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// Gallery tabs
function toggleDKDC(btn) {
  const subBtns = document.getElementById('dkdcSubBtns');
  const isOpen = subBtns.classList.contains('open');
  btn.classList.toggle('active', !isOpen);
  subBtns.classList.toggle('open', !isOpen);
  if (isOpen) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('#dkdcSubBtns .tab-btn').forEach(el => el.classList.remove('active'));
  }
}

function showTab(tab, btn) {
  const content = document.getElementById(tab);
  const isOpen = content.classList.contains('active');
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  if (!isOpen) {
    content.classList.add('active');
    btn.classList.add('active');
  }
}

// Submit feedback via EmailJS
async function submitFeedback(e) {
  e.preventDefault();
  const btn = document.querySelector('#feedbackForm button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending...';

  const params = {
    name: document.getElementById('fb-name').value.trim(),
    email: document.getElementById('fb-email').value.trim(),
    subject: document.getElementById('fb-subject').value.trim(),
    message: document.getElementById('fb-message').value.trim()
  };

  try {
    await emailjs.send('service_8nv50dn', 'template_cyczpkr', params);
    document.getElementById('feedbackForm').reset();
    const msg = document.getElementById('fb-success');
    msg.style.display = 'block';
    setTimeout(() => msg.style.display = 'none', 4000);
  } catch (err) {
    console.error('EmailJS error:', err);
    alert('Failed to send feedback. Please try again.');
  }

  btn.disabled = false;
  btn.innerHTML = 'Send Feedback <i class="fa-solid fa-paper-plane"></i>';
}


// Team batch tabs
function showTeamTab(tab, btn) {
  const content = document.getElementById(tab);
  const isOpen = content.classList.contains('active');
  document.querySelectorAll('.team-tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.team-tab-btn').forEach(el => el.classList.remove('active'));
  if (!isOpen) {
    content.classList.add('active');
    btn.classList.add('active');
  }
}

// Toggle department members
function toggleDept(btn) {
  const members = btn.nextElementSibling;
  btn.classList.toggle('open');
  members.classList.toggle('open');
}

// Navbar active highlight on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) current = sec.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--red)' : '';
  });
});
