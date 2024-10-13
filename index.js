let userForm=document.getElementById("registration-form");

const retrieveEntries = () => {
  let entries = localStorage.getItem("registrationData");
  if (entries) {
    entries = JSON.parse(entries);
  }
  else {
    entries = [];
  }
  return entries;
};
const displayEntries = () => {
  const entries = retrieveEntries();
  if (entries.length > 0) {

    const tableEntries = entries
      .map((entry) => {
        const nameCell = `<td class='border px-4 py-2'style="border: 1px solid grey; padding: 8px;">${entry.name}</td>`;
        const emailCell = `<td class='border px-4 py-2'style="border: 1px solid grey; padding: 8px;">${entry.email}</td>`;
        const passwordCell = `<td class='border px-4 py-2'style="border: 1px solid grey; padding: 8px;">${entry.password}</td>`;
        const dobCell = `<td class='border px-4 py-2'style="border: 1px solid grey; padding: 8px;">${entry.dob}</td>`;
        const acceptCell = `<td class='border px-4 py-2'style="border: 1px solid grey; padding: 8px;">${entry.checkbox}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptCell}</tr>`;
        return row;
      })
      .join("\n");

  const table = ` <table class="table-auto w-full">
      <caption style="caption-side: top; text-align: center;font-size:25px; font-weight: bold; padding: 10px;">Entries</caption>
      <thead>
        <tr>
          <th class="px-4 py-2 ">Name</th>
          <th class="px-4 py-2 ">Email</th>
          <th class="px-4 py-2 ">Password</th>
          <th class="px-4 py-2 ">Dob</th>
          <th class="px-4 py-2 ">Accepted Terms?</th>
        </tr>
      </thead>
      <tbody>
        ${tableEntries}
      </tbody>
    </table>`;

let details = document.getElementById("registrationData");
details.innerHTML=table;
 }
 };
 let saveUserForm= (event) =>{
  event.preventDefault(); // Prevent form from submitting and reloading page

  const today = new Date();

  const dob = new Date(document.getElementById('dob').value);

  let age = today.getFullYear() - dob.getFullYear();
  let monthdiff = today.getMonth() - dob.getMonth();
  let daydiff = today.getDate() - dob.getDate();

  if (monthdiff < 0 || monthdiff == 0 && daydiff < 0) {
    age--;

  }
  if (age < 18 || age > 55) {
    document.getElementById("ageError").style.display = 'block';
  }
  else {
    document.getElementById("ageError").style.display = 'none';

let userEntries = retrieveEntries();

const formData = {
  name: document.getElementById("name").value,
  email: document.getElementById("email").value,
  password: document.getElementById("password").value,
  dob: document.getElementById("dob").value,
  checkbox: document.getElementById("checkbox").checked
};
userEntries.push(formData);
localStorage.setItem('registrationData', JSON.stringify(userEntries));

displayEntries(); 
  }
};
userForm.addEventListener('submit', saveUserForm);

// Display stored data when the page loads
window.onload = displayEntries;


  

