document.getElementById("Formulaire-Calcul").addEventListener("submit", function(event) {
    event.preventDefault();

    const NomUtilisateur = document.getElementById("Nom-Utilisateur").value;
    const PrenomUtilisateur = document.getElementById("Prenom-Utilisateur").value;
    const DateNaissance = new Date(document.getElementById("Date-Naissance").value);
    const PoidsUtilisateur = parseFloat(document.getElementById("Poids-Utilisateur").value);
    const TailleUtilisateur = parseFloat(document.getElementById("Taille-Utilisateur").value);
    const SexeUtilisateur = document.getElementById("Sexe-Utilisateur").value;
    const NAPUtilisateur = parseFloat(document.querySelector("input[name='NAP-Utilisateur']:checked").value);

    localStorage.setItem("NomUtilisateur", NomUtilisateur);
    localStorage.setItem("PrenomUtilisateur", PrenomUtilisateur);
    localStorage.setItem("DateNaissance", DateNaissance.toISOString());
    localStorage.setItem("PoidsUtilisateur", PoidsUtilisateur);
    localStorage.setItem("TailleUtilisateur", TailleUtilisateur);
    localStorage.setItem("SexeUtilisateur", SexeUtilisateur);
    localStorage.setItem("NAPUtilisateur", NAPUtilisateur);

    CalculerResultats(NomUtilisateur, PrenomUtilisateur, DateNaissance, PoidsUtilisateur, TailleUtilisateur, SexeUtilisateur, NAPUtilisateur);
});

function CalculerResultats(NomUtilisateur, PrenomUtilisateur, DateNaissance, PoidsUtilisateur, TailleUtilisateur, SexeUtilisateur, NAPUtilisateur) {
    const AgeUtilisateur = CalculerAge(DateNaissance);
    const MetabolismeBase = CalculerMB(SexeUtilisateur, PoidsUtilisateur, TailleUtilisateur, AgeUtilisateur);
    const DepenseEnergJournaliere = MetabolismeBase * NAPUtilisateur;

    MettreAJourResultats(NomUtilisateur, PrenomUtilisateur, AgeUtilisateur, MetabolismeBase, DepenseEnergJournaliere, SexeUtilisateur);
}

function CalculerAge(DateNaissance) {
    const aujourdHui = new Date();
    let age = aujourdHui.getFullYear() - DateNaissance.getFullYear();
    const MoisDifference = aujourdHui.getMonth() - DateNaissance.getMonth();
    if (MoisDifference < 0 || (MoisDifference === 0 && aujourdHui.getDate() < DateNaissance.getDate())) {
        age--;
    }
    return age;
}

function CalculerMB(SexeUtilisateur, PoidsUtilisateur, TailleUtilisateur, AgeUtilisateur) {
    return SexeUtilisateur === "male"
        ? 88.362 + (13.397 * PoidsUtilisateur) + (4.799 * TailleUtilisateur) - (5.677 * AgeUtilisateur)
        : 447.593 + (9.247 * PoidsUtilisateur) + (3.098 * TailleUtilisateur) - (4.330 * AgeUtilisateur);
}

function MettreAJourResultats(NomUtilisateur, PrenomUtilisateur, AgeUtilisateur, MetabolismeBase, DepenseEnergJournaliere, SexeUtilisateur) {
    document.getElementById("NomPrenom").textContent = `${NomUtilisateur} ${PrenomUtilisateur}`;
    document.getElementById("Niveau-Age").textContent = AgeUtilisateur;
    document.getElementById("Metabolisme-Base").textContent = MetabolismeBase.toFixed(2);
    document.getElementById("Depense-Energetique-Journaliere").textContent = DepenseEnergJournaliere.toFixed(2);

    MettreAJourProgression(AgeUtilisateur, SexeUtilisateur);
    MettreAJourCalories(DepenseEnergJournaliere);
}

function MettreAJourProgression(AgeUtilisateur, SexeUtilisateur) {
    const EsperanceVie = SexeUtilisateur === "male" ? 79 : 84;
    const ProgressionAge = (AgeUtilisateur / EsperanceVie) * 100;
    document.getElementById("Progress-Temps-Restant").value = ProgressionAge;
    document.getElementById("Decimal-Temps-Restant").textContent = AgeUtilisateur.toFixed(2);
    document.getElementById("Pourcentage-Temps-Restant").textContent = `${ProgressionAge.toFixed(2)}%`;
}

function MettreAJourCalories(DepenseEnergJournaliere) {
    const CaloriesConsommees = DepenseEnergJournaliere * 0.8;
    const ProgressionCalories = (CaloriesConsommees / DepenseEnergJournaliere) * 100;
    document.getElementById("Meter-Calories").value = ProgressionCalories;
    document.getElementById("Pourcentage-Calories").textContent = `${ProgressionCalories.toFixed(2)}%`;
    document.getElementById("Decimal-Calories").textContent = CaloriesConsommees.toFixed(2);
}
