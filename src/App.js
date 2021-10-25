/*jslint esnext:true, browser:true*/
/**
 * @module App
 */
export default class App {
	/**
	 * Méthode principale. Sera typiquement appelée après le chargement de la page.
	 */
	static async main() {
		this.app = document.getElementById("app");
		this.loadJson("stats.json").then((stats) => {
			this.app.appendChild(this.dom_create(stats));
			return stats;
		});
	}

	/**
	 * Retourne un tableau avec les données contenues dans stats
	 * @param {object} stats L'ensemble des stats incluanr les colonnes et les equipes
	 * @returns {HTMLElement} Un élément table
	 */
	static dom_create(stats) {
		var resultat;
		return resultat;
	}
	/**
	 * Retourne un élément colgroup avec des col en fonction des données contenues dans colonnes
	 * @param {object} colonnes La description de chaque colonne à créer
	 * @returns {HTMLElement} Un élément colgroup
	 */
	static dom_colgroup(colonnes) {
		var resultat;
		resultat = document.createElement("colgroup");
		return resultat;
	}
	/**
	 * Retourne l'entête d'un tableau avec les données contenues dans colonnes
	 	* @param {object} colonnes La description de chaque colonne à créer
		* @returns {HTMLElement} Un élément thead
	 */
	static dom_thead(colonnes) {
		var resultat;
		resultat = document.createElement("thead");
		return resultat;
	}

	/**
	 * Retourne le corps du tableau avec les données contenues dans colonnes et equipes
	 * @returns {HTMLElement} Un élément tbody
	 */
	static dom_tbody(colonnes, equipes) {
		var resultat;
		resultat = document.createElement("tbody");
		return resultat;
	}
	/**
	 * Retourne une cellule du tableau.
	 * @param   {object}      colonne la description de la colonne
	 * @param   {mixed}       contenu Le texte à mettre dans la cellule
	 * @returns {HTMLElement} Un élément th ou td en fonction de la colonne
	 */
	static dom_cellule(colonne, contenu) {
		var resultat;
		resultat.appendChild(document.createTextNode(contenu));
		return resultat;
	}

	/**
	 * Charge un fichier JSON et retourne la promesse correspondante
	 * @returns {HTMLElement} Un élément table
	 */
	static loadJson(fic) {
	}
	/**
	 * Méthode qui permet d'attendre le chargement de la page avant d'éxécuter le script principal
	 * @returns {Promise} La promesse qui sera résolue après chargement
	 */
	static init() {
		return new Promise(resolve => {
			window.addEventListener("load", () => {
				resolve();
			});
		});
	}
}
App.init().then(() => {
	App.main();
});