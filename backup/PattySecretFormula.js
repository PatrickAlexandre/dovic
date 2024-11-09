// Calcul de l'âge
const ageDifMs = Date.now() - dateNaissance.getTime();
const ageDate = new Date(ageDifMs);
const age = Math.abs(ageDate.getUTCFullYear() - 1970);

// Calcul du métabolisme de base (MB)
let MB;
if (sexe === 'male') {
    MB = 10 * poids + 6.25 * taille - 5 * age + 5;
} else if (sexe === 'female') {
    MB = 10 * poids + 6.25 * taille - 5 * age - 161;
} else {
    MB = 10 * poids + 6.25 * taille - 5 * age;
}

// Calcul du DEJ en utilisant le NAP sélectionné
const DEJ = MB * nap;
