

  const userForm=document.getElementById("registration-form");
  const retrieveEntries = () => {
    let entries = localStorage.getItem("registrationData");
    return entries ? JSON.parse(entries) : [];
  };
  const displayEntries = () => {
    const entries = retrieveEntries();
      const tableEntries = entries
        .map((entry) => `
          <tr>
            <td class='border px-4 py-2' style="border: 1px solid grey; padding: 8px;">${entry.name}</td>
            <td class='border px-4 py-2' style="border: 1px solid grey; padding: 8px;">${entry.email}</td>
            <td class='border px-4 py-2' style="border: 1px solid grey; padding: 8px;">${entry.password}</td>
            <td class='border px-4 py-2' style="border: 1px solid grey; padding: 8px;">${entry.dob}</td>
            <td class='border px-4 py-2' style="border: 1px solid grey; padding: 8px;">${entry.checkbox}</td>
          </tr>
        `)
        .join("");
  
      const table = `
        <table class="table-auto w-full">
          <caption style="caption-side: top; text-align: center;font-size:25px; font-weight: bold; padding: 10px;">Entries</caption>
          <thead>
            <tr>
              <th class="px-4 py-2" style="padding: 12px;">Name</th>
              <th class="px-4 py-2" style="padding: 12px;">Email</th>
              <th class="px-4 py-2" style="padding: 12px;">Password</th>
              <th class="px-4 py-2" style="padding: 12px;">Dob</th>
              <th class="px-4 py-2" style="padding: 12px;">Accepted Terms?</th>
            </tr>
          </thead>
          <tbody>
            ${tableEntries}
          </tbody>
        </table>`;
  
      document.getElementById("registrationData").innerHTML = table;
    
  };
const saveUserForm = (event) => {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const dobInput = document.getElementById("dob");
  const checkboxInput = document.getElementById("checkbox");

  // Age validation
  const today = new Date();
  const birthDate = new Date(dobInput.value);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  let isValid = true;

  if (age < 18 || age > 55) {
    document.getElementById("ageError").style.display = 'block';
    isValid = false;
  } else {
    document.getElementById("ageError").style.display = 'none';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    emailInput.setCustomValidity('Please enter a valid email address');
    isValid = false;
  } else {
    emailInput.setCustomValidity('');
  }

  // Check all validations
  if (!isValid) {
    emailInput.reportValidity();
    return;
  }

  // If we've made it this far, the form is valid. Save the data.
  const formData = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    dob: dobInput.value,
    checkbox: checkboxInput.checked
  };

  const entries = retrieveEntries();
  entries.push(formData);
  localStorage.setItem('registrationData', JSON.stringify(entries));

  displayEntries();
  userForm.reset(); // Clear the form after successful submission
  console.log('Form submitted successfully');
};

// Add this function to validate email in real-time
const validateEmail = (event) => {
  const emailInput = event.target;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(emailInput.value.trim())) {
    emailInput.setCustomValidity('Please enter a valid email address');
  } else {
    emailInput.setCustomValidity('');
  }
  emailInput.reportValidity();
};

// Add these event listeners
userForm.addEventListener('submit', saveUserForm);
document.getElementById('email').addEventListener('input', validateEmail);
window.onload = displayEntries;
