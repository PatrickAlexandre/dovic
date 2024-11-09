

// ========================
// 1. Données et localStorage
// ========================

// Récupère les données du formulaire
function getFormData() {
    return {
        nom: document.getElementById("Nom").value,
        prenom: document.getElementById("Prenom").value,
        dateNaissance: document.getElementById("DateNaissance").value,
        poids: parseFloat(document.getElementById("Poids").value),
        taille: parseFloat(document.getElementById("Taille").value),
        sexe: document.getElementById("Sexe").value,
        nap: parseFloat(document.querySelector('input[name="Nap"]:checked').value),
    };
}

// Enregistre les données dans localStorage
function saveToLocalStorage(data) {
    localStorage.setItem("userData", JSON.stringify(data));
}

// Récupère les données depuis localStorage
function loadFromLocalStorage() {
    const data = localStorage.getItem("userData");
    return data ? JSON.parse(data) : null;
}

// Charge les données sauvegardées (si présentes) dans le formulaire
function populateForm() {
    const data = loadFromLocalStorage();
    if (data) {
        document.getElementById("Nom").value = data.nom;
        document.getElementById("Prenom").value = data.prenom;
        document.getElementById("DateNaissance").value = data.dateNaissance;
        document.getElementById("Poids").value = data.poids;
        document.getElementById("Taille").value = data.taille;
        document.getElementById("Sexe").value = data.sexe;
        document.querySelector(`input[name="Nap"][value="${data.nap}"]`).checked = true;
    }
}

// ========================
// 2. Calculs et formules
// ========================

// Calcul de l'âge
function calculateAge(dateNaissance) {
    const birthDate = new Date(dateNaissance);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// Calcul du Métabolisme de Base (MB)
function calculateMetabolismeBase(poids, taille, age, sexe) {
    return sexe === "male"
        ? 88.362 + (13.397 * poids) + (4.799 * taille) - (5.677 * age)
        : 447.593 + (9.247 * poids) + (3.098 * taille) - (4.330 * age);
}

// Calcul de la Dépense Énergétique Journalière (DEJ)
function calculateDEJ(metabolismeBase, nap) {
    return metabolismeBase * nap;
}

// ========================
// 3. Mise à jour et affichage des résultats
// ========================

function updateResults() {
    // Récupération des données du formulaire
    const data = getFormData();

    // Calcul de l'âge
    const age = calculateAge(data.dateNaissance);
    
    // Calculs du métabolisme de base (MB) et des dépenses énergétiques (DEJ)
    const metabolismeBase = calculateMetabolismeBase(data.poids, data.taille, age, data.sexe);
    const depenseEnergetiqueJournaliere = calculateDEJ(metabolismeBase, data.nap);

    // Mise à jour des éléments de la page avec les résultats
    document.getElementById("NomPrenom").textContent = `${data.nom} ${data.prenom}`;
    document.getElementById("NiveauAge").textContent = age;
    document.getElementById("MetabolismeBase").textContent = metabolismeBase.toFixed(2);
    document.getElementById("DepenseEnergetiqueJournaliere").textContent = depenseEnergetiqueJournaliere.toFixed(2);

    // Mise à jour du localStorage
    saveToLocalStorage(data);

    // Met à jour les indicateurs de progrès
    updateProgressBars(age, depenseEnergetiqueJournaliere);
}

// Mise à jour des progress bars pour la quête
function updateProgressBars(age, dej) {
    // Espérance de vie moyenne (valeur hypothétique ici)
    const esperanceVie = 80;
    const tempsRestantPourcentage = (age / esperanceVie) * 100;

    document.getElementById("TempsRestant_progress").style.width = `${tempsRestantPourcentage}%`;
    document.getElementById("TempsRestantDecimal").textContent = esperanceVie - age;
    document.getElementById("TempsRestantPourcentage").textContent = `${Math.round(tempsRestantPourcentage)}%`;

    // Exemples d'objectifs caloriques
    const caloriesConsommees = 2000; // Valeur de base à changer selon vos besoins
    const caloriesPourcentage = (caloriesConsommees / dej) * 100;

    document.getElementById("Calories_meter").style.width = `${caloriesPourcentage}%`;
    document.getElementById("CaloriesDecimal").textContent = caloriesConsommees;
    document.getElementById("CaloriesPercentage").textContent = `${Math.round(caloriesPourcentage)}%`;
}

// Initialisation de l'application et écoute de l'événement "submit" du formulaire
document.addEventListener("DOMContentLoaded", function () {
    populateForm(); // Remplit le formulaire si les données existent
    document.getElementById("calculation-form").addEventListener("submit", function (event) {
        event.preventDefault();
        updateResults();
    });
});
